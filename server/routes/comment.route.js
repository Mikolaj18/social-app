import express from "express";
import {addComment, deleteComment, getPostComments} from "../controllers/comment.controller.js";
import {checkToken} from "../utils/checkToken.js";

const router = express.Router();

router.post("/", checkToken, addComment);
router.get("/:postId", checkToken, getPostComments);
router.delete("/:commentId", checkToken, deleteComment);

export default router;
