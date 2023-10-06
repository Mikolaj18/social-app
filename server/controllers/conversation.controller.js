import Conversation from "../models/conversation.model.js";

export const getConversations = async (req, res, next) => {
    const userId = req.userId;
    try {
        const conversations = await Conversation.find({participants: userId}).populate({
            path: "participants",
            select: "name surname profilePicture",
        });

        //remove current user from conversations
        conversations.forEach(conversation => {
            conversation.participants = conversation.participants.filter(p => p._id.toString() !== userId.toString());
        });
        res.status(200).json(conversations);
    } catch (error) {
        next(error);
    }
}

export const createConversation = async (req, res, next) => {
    const senderId = req.userId;
    const {recipientId} = req.body;

    try {
        let conversation = await Conversation.findOne({
            participants: {$all: [senderId, recipientId]},
        });
        if (!conversation) {
            conversation = new Conversation({
                participants: [senderId, recipientId],
                lastMessage: {
                    text: "",
                    sender: senderId,
                },
            });
        }
        await conversation.save();
        res.status(200).json(conversation);
    } catch (error) {
        next(error);
    }
}