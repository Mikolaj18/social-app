import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res, next) => {
    try {
        const { recipientId, message } = req.body;
        const senderId = req.userId;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, recipientId] },
        });

        if (!conversation) {
            conversation = new Conversation({
                participants: [senderId, recipientId],
                lastMessage: {
                    text: message,
                    sender: senderId,
                },
            });
            await conversation.save();
        }

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