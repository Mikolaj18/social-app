import Comment from "../models/comment.model.js";
import {createError} from "../utils/createError.js";

export const addComment = async (req, res, next) => {
    const id = req.userId;
    try {
        const newComment = new Comment({
            author: id,
            ...req.body,
        });

        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        next(error);
    }
}

export const getPostComments = async (req, res, next) => {
    const postId = req.params.postId;
    try {
        const comments = await Comment.find({ postId: postId }).populate('author', 'name surname profilePicture').sort({createdAt: -1});
        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
}

export const deleteComment = async (req, res, next) => {
    try {
        const id = req.userId;
        const comment = await Comment.findById(req.params.commentId);
        if (comment.author !== id) return next(createError(403, "You can delete only your comments"));

        await Comment.findByIdAndDelete(req.params.commentId);
        res.status(200).json("Comment has been deleted");
    } catch (error) {
        next(error);
    }
}