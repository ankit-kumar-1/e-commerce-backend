import express from 'express';

import { isLoggedIn } from '../middleware/isLoggedIn.js';
import { createColorCtrl, deleteColorCtrl, getAllColorsCtrl, getSingleColorCtrl, updateColorCtrl } from '../controllers/colorsCtrl.js';
import isAdmin from '../middleware/isAdmin.js';

const colorRouter = express.Router();

colorRouter.post("/", isLoggedIn, isAdmin, createColorCtrl);
colorRouter.get("/", getAllColorsCtrl);
colorRouter.get("/:id", getSingleColorCtrl);
colorRouter.delete("/:id", isLoggedIn, isAdmin, deleteColorCtrl);
colorRouter.put("/:id", isLoggedIn, isAdmin, updateColorCtrl);

export default colorRouter;