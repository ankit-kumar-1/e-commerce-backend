import exppress from "express";
import {
    createBrandCtrl,
    deleteBrandCtrl,
    getAllBrandsCtrl,
    getSingleBrandCtrl,
    updateBrandCtrl,
} from "../controllers/brandsCtrl.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import isAdmin from "../middleware/isAdmin.js";


const brandsRouter = exppress.Router();

brandsRouter.post("/", isLoggedIn, isAdmin, createBrandCtrl);
brandsRouter.get("/", getAllBrandsCtrl);
brandsRouter.get("/:id", getSingleBrandCtrl);
brandsRouter.delete("/:id", isLoggedIn, isAdmin, deleteBrandCtrl);
brandsRouter.put("/:id", isLoggedIn, isAdmin, updateBrandCtrl);

export default brandsRouter;