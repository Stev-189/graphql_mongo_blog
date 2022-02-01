import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../config";

export const authenticate = async (req, res, next) => {

    //Authorization: "Bearer <token>"
    const token = req.headers.authorization?.split(" ")[1];
    //if(!token) return res.status(401).send({status: false, msg: "No token provided"});
    //console.log("token: ", token);
    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.verifiedUser = verified.user;
        next();
    } catch (error) {
        res.status(401).send({status: false, msg: "Invalid token"});
    }
}