import express from "express";
import { createProductCtrl, deleteProductCtrl, getProductCtrl, getProductsCtrl, updateProductCtrl } from "../controllers/productCtrl.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import upload from "../config/fileUpload.js";
import isAdmin from "../middleware/isAdmin.js";
const productRouter = express.Router();


productRouter.post('/', isLoggedIn, isAdmin, upload.array("files"), createProductCtrl);
productRouter.get('/', isLoggedIn, getProductsCtrl);
productRouter.get('/:id', getProductCtrl);
productRouter.put('/:id', isLoggedIn, isAdmin, updateProductCtrl);
productRouter.delete('/:id/delete', isLoggedIn, isAdmin, deleteProductCtrl);


export default productRouter;