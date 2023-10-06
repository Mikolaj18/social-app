import express from "express";
import {getMessages, sendMessage} from "../controllers/message.controller.js";
import {checkToken} from "../utils/checkToken.js";


const router = express.Router();

router.get("/:otherUserId", checkToken, getMessages);
router.post("/", checkToken, sendMessage);
export default router;
