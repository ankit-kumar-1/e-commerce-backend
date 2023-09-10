import express from "express";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import { createReviewCtrl } from "../controllers/reviewsCtrl.js";

const reviewRouter = express.Router();

reviewRouter.post("/:productID/", isLoggedIn, createReviewCtrl);


export default reviewRouter;