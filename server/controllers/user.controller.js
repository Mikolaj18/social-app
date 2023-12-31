import User from "../models/user.model.js";
import {createError} from "../utils/createError.js";

export const getSingleUser = async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if(!user) return next(createError(404, "User not found."));
    res.status(200).json(user);
}

export const random = async (req, res, next) => {
    try {
        const id = req.userId;
        const user = await User.findById(id);
        const friends = user.friends;

        const randomUsers = await User.find({
            _id: { $ne: id },
            friends: { $nin: [...friends, id] },
        }).limit(20);

        res.status(200).json(randomUsers);
    } catch (error) {
        next(error);
    }
};

export const editUser = async (req, res, next) => {
    try {
        const id = req.userId;
        const user = await User.findById(req.params.id);
        if (user._id.toString() !== id) return next(createError(403, "You can edit only your profile."))
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {...req.body},
            { new: true },
        );
        if(!updatedUser) return next(createError(404, "User not found"));
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error)
    }

}

export const deleteUser = async (req, res, next) => {
    try {

    } catch (error) {
        next(error);
    }
}

export const searchUser = async (req, res, next) => {
    const query = decodeURIComponent(req.query.q);
    try {
        let users;
        if (query.includes(" ")) {
            const [firstName, lastName] = query.split(" ");
            users = await User.find({
                $and: [
                    { name: { $regex: firstName, $options: "i" } },
                    { surname: { $regex: lastName, $options: "i" }}
                ]
            });
        } else {
            users = await User.find({
                $or: [
                    { name: { $regex: query, $options: "i" } },
                    { surname: { $regex: query, $options: "i" }}
                ]
            });
        }
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

