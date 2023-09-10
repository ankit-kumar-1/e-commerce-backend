import express from 'express';

import { isLoggedIn } from '../middleware/isLoggedIn.js';
import { createCategoryCtrl, deleteCategoryCtrl, getAllCategoriesCtrl, getSingleCategoryCtrl, updateCategoryCtrl } from '../controllers/categoriesCtrl.js';
import categoryFileUploader from '../config/categoryUpload.js';

const categoriesRouter = express.Router();

categoriesRouter.post("/", isLoggedIn, categoryFileUploader.single("file"), createCategoryCtrl);
categoriesRouter.get("/", getAllCategoriesCtrl);
categoriesRouter.get("/:id", getSingleCategoryCtrl);
categoriesRouter.delete("/:id", deleteCategoryCtrl);
categoriesRouter.put("/:id", updateCategoryCtrl);

export default categoriesRouter;