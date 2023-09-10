import express from "express";
import { registerUserCtrl, loginUserCtrl, getUserProfile, updateShippingAddresctrl } from "../controllers/usersCtrl.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";

const userRoutes = express.Router();


userRoutes.post('/register', registerUserCtrl);
userRoutes.post('/login', loginUserCtrl);
userRoutes.get('/profile', isLoggedIn, getUserProfile);
userRoutes.put('/update/shipping', isLoggedIn, updateShippingAddresctrl);

export default userRoutes;