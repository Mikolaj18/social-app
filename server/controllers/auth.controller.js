import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import {createError} from "../utils/createError.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(user) return next(createError(400, "This email is already associated with the account"));

        const hash = bcrypt.hashSync(req.body.password, 10);
        const newUser = new User({
            ...req.body,
            password: hash,
        });

        await newUser.save();
        res.status(201).json("User has been created.");
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user) return next(createError(404, "This account is not associated with any email address"));

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
        if(!isPasswordCorrect) return next(createError(400, "Wrong password or email"));

        const token = jwt.sign({
            id: user._id,
        }, process.env.TOKEN_KEY);

        const {password, ...userData} = user._doc;
        res.cookie("_auth", token, {
           httpOnly: true,
        }).status(200).json(userData);

    } catch (error) {
        next(createError(500, "Something went wrong!"));
    }
}

export const logout = (req, res) => {
    res.clearCookie("_auth", {
        sameSite: "none",
        secure: true,
    }).status(200).json("User has been logged out.");
}