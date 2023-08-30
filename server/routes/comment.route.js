import express from "express";
import {addComment, deleteComment, editComment, getPostComments} from "../controllers/comment.controller.js";
import {checkToken} from "../utils/checkToken.js";

const router = express.Router();

router.post("/", checkToken, addComment);
router.get("/:postId", checkToken, getPostComments);
router.delete("/:commentId", checkToken, deleteComment);
router.put("/:commentId", checkToken, editComment);

export default router;
