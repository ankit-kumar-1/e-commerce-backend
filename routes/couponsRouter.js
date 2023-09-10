import express from 'express';
import { createCouponCtrl, deleteCouponCtrl, getAllCouponsCtrl, getCouponCtrl, updateCouponCtrl } from '../controllers/couponCtrl.js';
import { isLoggedIn } from '../middleware/isLoggedIn.js';
import isAdmin from '../middleware/isAdmin.js';

const couponsRouter = express.Router();

couponsRouter.post("/", isLoggedIn, isAdmin, createCouponCtrl);
couponsRouter.get("/", getAllCouponsCtrl);
couponsRouter.put("/update/:id", isLoggedIn, isAdmin, updateCouponCtrl);
couponsRouter.delete("/delete/:id", isLoggedIn, isAdmin, deleteCouponCtrl);
couponsRouter.get("/:id", getCouponCtrl);

export default couponsRouter;