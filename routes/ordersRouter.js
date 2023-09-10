import express from 'express';
import { createOrderCtrl, getAllOrdersCtrl, getOrderStatsCtrl, getSingleOrderCtrl, updateOrderCtrl } from '../controllers/orderCtrl.js';
import { isLoggedIn } from '../middleware/isLoggedIn.js';


const orderRouter = express.Router();

orderRouter.post("/", isLoggedIn, createOrderCtrl);
orderRouter.get("/", isLoggedIn, getAllOrdersCtrl);
orderRouter.get("/sales/stats", isLoggedIn, getOrderStatsCtrl);
orderRouter.get("/:id", isLoggedIn, getSingleOrderCtrl);
orderRouter.put("/update/:id", isLoggedIn, updateOrderCtrl);

export default orderRouter;