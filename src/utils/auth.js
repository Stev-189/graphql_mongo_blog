import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config";

export const createToken = (user) => jwt.sign({user}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});