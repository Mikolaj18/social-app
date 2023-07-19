import User from "../models/user.model.js";
import {createError} from "../utils/createError.js";

export const getSingleUser = async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if(!user) return next(createError(404, "User not found."));
    res.status(200).json(user);
}

export const deleteUser = async (req, res, next) => {
    try {

    } catch (error) {
        next(error);
    }
}
