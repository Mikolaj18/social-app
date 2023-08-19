import Comment from "../models/comment.model.js";

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