import User from '../models/user.model.js';
import FriendRequest from '../models/friendRequest.model.js';
import {createError} from "../utils/createError.js";

export const sendFriendRequest = async (req, res, next) => {
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

export const getSentFriendRequests = async (req, res, next) => {
    try {
        const id = req.userId;
        const friendRequests = await FriendRequest.find({ sender: id, status: 'pending' });
        return res.status(200).json(friendRequests);
    } catch (error) {
        next(error);
    }
}

export const acceptFriendRequest = async (req, res, next) => {
    try {
        const id = req.userId;
        const { friendRequestId } = req.body;

        const user = await User.findById(id);
        if (!user) return next(createError(404, "User not found"));

        const friendRequest = await FriendRequest.findById(friendRequestId);
        if (!friendRequest) return next(createError(404, "This friend request does not exist"));

        if (friendRequest.status !== 'pending') return next(createError(400, "This friend request expired"));

        await FriendRequest.findByIdAndUpdate(friendRequestId, { $set: { status: 'accepted' } });
        await User.findByIdAndUpdate(id, { $addToSet: { friends: friendRequest.sender } });
        await User.findByIdAndUpdate(friendRequest.sender, { $addToSet: { friends: id } });

        res.status(200).json("Friend request has been accepted");
    } catch (error) {
        next(error);
    }
}

export const getFriendList = async (req, res, next) => {
    try {
        const {id} = req.params;

        const user = await User.findById(id);
        if (!user) return next(createError(404, "User not found"));

        const friendList = await User.find({ _id: { $in: user.friends } }).sort({createdAt: -1});
        res.status(200).json(friendList);
    } catch (error) {
        console.log(error);
    }
}
