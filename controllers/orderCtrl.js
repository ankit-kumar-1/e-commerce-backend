import asyncHandler from "express-async-handler";
import Order from "../model/Order.js";
import User from "../model/User.js";
import Product from "../model/Product.js";
import Stripe from "stripe";
import dotenv from "dotenv";
import Coupon from "../model/Coupon.js";
dotenv.config();

// STRIPE INSTANCE
const stripe = new Stripe(process.env.STRIPE_KEY);


// @desc    Create orders 
// @route   POST /api/v1/orders
// @access  Private

export const createOrderCtrl = asyncHandler(async (req, res) => {
    //get the coupon
    const { coupon } = req?.query;

    const couponFound = await Coupon.findOne({
        code: coupon?.toUpperCase(),
    });
    if (couponFound?.isExpired) {
        throw new Error("Coupon has expired");
    }
    if (!couponFound) {
        throw new Error("Coupon does exists");
    }

    //get discount
    const discount = couponFound?.discount / 100;


    //get the payload(customer,orderItems, shippingAddress, totalPrice)
    const { orderItems, shippingAddress, totalPrice } = req.body;

    //find the user
    const user = await User.findById(req.userAuthId);
    //check if user has shipping address
    if (!user?.hasShippingAddress) {
        throw new Error("Please provide shipping address")
    }
    //check if order is not empty
    if (orderItems?.length <= 0) {
        throw new Error("No order Items");
    }
    //place/create order - save into DB
    const order = await Order.create({
        user: user?._id,
        orderItems,
        shippingAddress,
        totalPrice: couponFound ? totalPrice - totalPrice * discount : totalPrice,
    });
    console.log(order);

    // Update the product qty
    const products = await Product.find({ _id: { $in: orderItems } });

    orderItems?.map(async (order) => {
        const product = products?.find((product) => {
            return product?._id?.toString() === order?._id?.toString();
        });
        if (product) {
            product.totalSold += order.qty;
        }
        await product.save();
    });


    //push order into user
    user.orders.push(order._id);
    await user.save();

    //make payment(stripe)
    //convert order items to have same structure that stripe need
    const convertedOrders = orderItems.map((item) => {
        return {
            price_data: {
                currency: "INR",
                product_data: {
                    name: item?.name,
                    description: item?.description,
                },
                unit_amount: item?.price * 100,
            },
            quantity: item.qty,
        };
    });
    const session = await stripe.checkout.sessions.create({
        line_items: convertedOrders,
        metadata: {
            orderId: JSON.stringify(order?._id),
        },
        mode: 'payment',
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel"
    });

    res.send({ url: session.url });

});

// @desc    get all orders 
// @route   GET /api/v1/orders
// @access  Private
export const getAllOrdersCtrl = asyncHandler(async (req, res) => {
    //find all orders 
    const orders = await Order.find();
    res.json({
        success: true,
        message: "All orders",
        orders,
    });
});

// @desc    get single order
// @route   GET /api/v1/orders/:id
// @access  Private/admin
export const getSingleOrderCtrl = asyncHandler(async (req, res) => {
    //get the id from params
    const id = req.params.id;
    const order = await Order.findById(id);
    res.status(200).json({
        success: true,
        message: "Single order",
        order,
    });
});

// @desc    update order to delevered
// @route   GET /api/v1/orders/update/:id
// @access  Private/admin

export const updateOrderCtrl = asyncHandler(async (req, res) => {
    //get the id from params
    const id = req.params.id;
    const updatedOrder = await Order.findByIdAndUpdate(
        id,
        {
            status: req.body.status,
        },
        {
            new: true,
        }
    );
    res.status(200).json({
        success: true,
        message: "Order updated",
        updatedOrder,
    });
});

// @desc    get sales sum of orders
// @route   GET /api/v1/orders/sales/sum
// @access  Private/admin

export const getOrderStatsCtrl = asyncHandler(async (req, res) => {
    //get order stats
    const orders = await Order.aggregate([
        {
            $group: {
                _id: null,
                minimumSale: {
                    $min: "$totalPrice",
                },
                maximumSale: {
                    $max: "$totalPrice",
                },
                totalSales: {
                    $sum: '$totalPrice',
                },
                avgSale: {
                    $avg: '$totalPrice',
                },
            },
        },
    ]);

    //get the date
    const date = new Date();
    const saleToday = await Order.aggregate([
        {
            $match: {
                createAt: {
                    $gte: date,
                },
            },
        },
        {
            $group: {
                _id: null,
                totalSales: {
                    $sum: "$totalPrice",
                },
            },
        },
    ]);

    res.status(200).json({
        success: true,
        message: "sum of orders",
        orders,
        saleToday,
    });
});
