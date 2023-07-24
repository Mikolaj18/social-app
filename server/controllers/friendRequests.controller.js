import User from '../models/user.model.js';
import FriendRequest from '../models/friendRequest.model.js';
import {createError} from "../utils/createError.js";

export const sendFriendRequest = async (req, res,next) => {
    try {
        const senderId = req.userId;

        const senderUser = await User.findById(senderId);
        if (!senderUser) return next(createError(404, "User not found"))

        const receiverUser = await User.findById(req.body.receiverId);
        if (!receiverUser) return next(createError(404, "Receiver not found"))

        const isRequestAlreadySent = await FriendRequest.findOne({
            sender: senderId,
            receiver: req.body.receiverId,
            status: { $in: ['pending', 'accepted'] },
        });
        if (isRequestAlreadySent) return next(createError(409, "Friend request has been already sent"))

        const newFriendRequest = new FriendRequest({
            sender: senderId,
            receiver: req.body.receiverId,
        });

        await newFriendRequest.save();
        res.status(200).json("Request has been sent");
    } catch (error) {
        next(error)
    }
}

export const getFriendRequests = async (req, res, next) => {
    try {
        const id = req.userId;
        const friendRequests = await FriendRequest.find({ receiver: id, status: 'pending' }).populate('sender');
        return res.status(200).json(friendRequests);
    } catch (error) {
        next(error);
    }
}

