import express from "express";
import {getFriendRequests, sendFriendRequest} from "../controllers/friendRequests.controller.js";
import {checkToken} from "../utils/checkToken.js";
const router = express.Router();

router.post("/", checkToken, sendFriendRequest);
router.get("/", checkToken, getFriendRequests);

export default router;