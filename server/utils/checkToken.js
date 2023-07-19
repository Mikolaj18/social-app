import jwt from "jsonwebtoken";
import {createError} from "./createError.js";

export const checkToken = (req, res, next) => {
    const token = req.cookies._auth;
    if (!token) return next(createError(401, "You are not authenticated."));
    jwt.verify(token, process.env.TOKEN_KEY, async (error, payload) => {
        if (error) return next(createError(403, "Token is not valid"));
        req.userId = payload.id;
        next();
    });
}