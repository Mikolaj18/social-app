import express from "express";
import {checkToken} from "../utils/checkToken.js";
import {addPost, deletePost, editPost, getPostsAndFriendsPosts, getUserPosts} from "../controllers/post.controller.js";
const router = express.Router();

router.post("/", checkToken, addPost);
router.get("/", checkToken, getPostsAndFriendsPosts);
router.get("/:id", checkToken, getUserPosts);
router.delete("/:postId", checkToken, deletePost);
router.put("/:postId", checkToken, editPost);


export default router;