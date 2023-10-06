import Like from "../models/like.model.js";
import {createError} from "../utils/createError.js";

export const like = async (req, res, next) => {
    const userId = req.userId;
    try {
        const existingLike = await Like.findOne({ user: userId, ...req.body});
        if(existingLike) return next(createError(400, "You already liked this"))
        const newLike = new Like({
            user: userId,
            ...req.body,
        });
        await newLike.save();
        res.status(201).json(newLike);
    } catch (error) {
        next(error);
    }
}

export const unlike = async (req, res, next) => {
    const userId = req.userId;
    const objectId = req.params.objectId;
    try {
        const existingLike = await Like.findOneAndDelete({user: userId, objectId});
        if (!existingLike) return next(createError(404, "Like not found"));
        res.status(200).json(existingLike);
    } catch (error) {
        next(error);
    }
}

export const getLikes = async (req, res, next) => {
    const objectId = req.params.objectId;
    try {
        const likes = await Like.find({ objectId }).populate('user', 'name surname profilePicture').sort({createdAt: -1});
        res.status(200).json(likes);
    } catch (error) {
        next(error);
    }
}
