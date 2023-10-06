import Conversation from "../models/conversation.model.js";

export const getConversations = async (req, res, next) => {
    const userId = req.userId;
    try {
        const conversations = await Conversation.find({participants: userId}).populate({
            path: "participants",
            select: "name surname profilePicture",
        });
        res.status(200).json(conversations);
    } catch (error) {
        next(error);
    }
}
