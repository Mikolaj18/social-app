import express from "express";
import {checkToken} from "../utils/checkToken.js";
import {getConversations} from "../controllers/conversation.controller.js";


const router = express.Router();

router.get("/", checkToken, getConversations);

export default router;
