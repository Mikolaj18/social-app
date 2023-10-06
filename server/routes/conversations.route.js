import express from "express";
import {checkToken} from "../utils/checkToken.js";
import {createConversation, getConversations} from "../controllers/conversation.controller.js";


const router = express.Router();

router.get("/", checkToken, getConversations);
router.post("/", checkToken, createConversation);

export default router;
