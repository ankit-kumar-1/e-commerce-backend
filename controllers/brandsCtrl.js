import asyncHandler from "express-async-handler";
import Brand from "../model/Brand.js";


// @desc       create new Brand
// @route      POST /api/v1/brands
// @access     Private/Admin

export const createBrandCtrl = asyncHandler(async (req, res) => {
    const { name } = req.body;

    //brand exists

    const brandFound = await Brand.findOne({ name });
    if (brandFound) {
        throw new Error('brand already exists');
    }

    //create
    const brand = await Brand.create({
        name: name.toLowerCase(),
        user: req.userAuthId,
    });

    res.json({
        status: 'success',
        message: 'Brand created successfully',
        brand,
    })
});

// @desc       get All Brands
// @route      get /api/v1/brands
// @access     Public

export const getAllBrandsCtrl = asyncHandler(async (req, res) => {
    const brands = await Brand.find();

    res.json({
        status: 'success',
        message: 'Brands fetched successfully',
        brands,
    });
});

// @desc       Get single Brand
// @route      get /api/v1/brands
// @access     Public

export const getSingleBrandCtrl = asyncHandler(async (req, res) => {
    const brand = await Brand.findById(req.params.id);

    res.json({
        status: 'success',
        message: 'Brand fetched successfully',
        brand,
    })
});

// @desc       update brand
// @route      PUT /api/v1/brands/:id
// @access     Private/Admin

export const updateBrandCtrl = asyncHandler(async (req, res) => {

    const { name } = req.body;

    const brand = await Brand.findByIdAndUpdate(req.params.id,
        {
            name
        },
        {
            new: true,
        });
    res.json({
        status: 'success',
        message: 'Brand updated successfully',
        brand,
    })
});

// @desc       delete brand
// @route      DELETE /api/v1/brands/:id
// @access     Private/Admin

export const deleteBrandCtrl = asyncHandler(async (req, res) => {
    await Brand.findByIdAndDelete(req.params.id, {

    });
    res.json({
        status: 'success',
        message: 'Brand deleted successfully',

    });

});