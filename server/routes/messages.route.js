import express from "express";
import {sendMessage} from "../controllers/message.controller.js";
import {checkToken} from "../utils/checkToken.js";


const router = express.Router();

router.post("/", checkToken, sendMessage);
export default router;
