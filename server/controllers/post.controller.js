import Post from "../models/post.model.js";
import {createError} from "../utils/createError.js";

export const addPost = async (req, res, next) => {
    const id = req.userId
    try {
        const newPost = new Post({
            author: id,
            ...req.body,
        });

        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        next(error);
    }
}

export const getPosts = async (req, res, next) => {
    try {
        const id = req.userId;
        const posts = await Post.find({ author: id }).populate('author', 'name surname profilePicture');
        return res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
}

export const deletePost = async (req, res, next) => {
    try {
        const id = req.userId;
        const post = await Post.findById(req.params.id);

        if(post.author !== id) return next(createError(403, "You can delete only your posts"));

        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json("Post has been deleted");
    } catch(error) {
        next(error);
    }
}
