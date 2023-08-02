import express from "express";
import {checkToken} from "../utils/checkToken.js";
import {addPost, deletePost, getPosts} from "../controllers/post.controller.js";
const router = express.Router();

router.post("/", checkToken, addPost);
router.get("/", checkToken, getPosts);
router.delete("/:id", checkToken, deletePost);

export default router;