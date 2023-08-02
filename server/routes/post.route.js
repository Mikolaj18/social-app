import express from "express";
import {checkToken} from "../utils/checkToken.js";
import {addPost, deletePost, getPostsAndFriendsPosts, getUserPosts} from "../controllers/post.controller.js";
const router = express.Router();

router.post("/", checkToken, addPost);
router.get("/", checkToken, getPostsAndFriendsPosts);
router.get("/:id", checkToken, getUserPosts);
router.delete("/:id", checkToken, deletePost);

export default router;