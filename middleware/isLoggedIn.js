import { getTokenFromHeader } from "../utils/getTokenFromHeader.js"
import { verifyToken } from "../utils/verifyToken.js";

export const isLoggedIn = (req, res, next) => {
    //getToken from header

    const token = getTokenFromHeader(req);
    //verify the token
    const decodedUser = verifyToken(token);

    if (!decodedUser) {
        throw new Error('Invalid/Expired Token, please login again')
    } else {
        //save the user into req obj
        req.userAuthId = decodedUser?.id;
        next();
    }


}