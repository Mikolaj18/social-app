import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import {createError} from "../utils/createError.js";

export const sendMessage = async (req, res, next) => {
    try {
        const { recipientId, message } = req.body;
        const senderId = req.userId;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, recipientId] },
        });

        const newMessage = new Message({
            conversationId: conversation._id,
            sender: senderId,
            text: message,
        });

        await Promise.all([
            newMessage.save(),
            conversation.updateOne({
                lastMessage: {
                    text: message,
                    sender: senderId,
                },
            }),
        ]);
        res.status(201).json(newMessage);
    } catch (error) {
        next(error)
    }
}

export const getMessages = async (req, res, next) => {
    const {otherUserId} = req.params;
    const userId = req.userId;
    try {
        const conversation = await Conversation.findOne({
           participants: {$all: [userId, otherUserId]},
        });

        if(!conversation) return createError(404, "Conversation not found");

        const messages = await Message.find({
           conversationId: conversation._id,
        }).sort({createdAt: 1});

        res.status(200).json(messages);
    } catch (error) {
        next(error)
    }
}