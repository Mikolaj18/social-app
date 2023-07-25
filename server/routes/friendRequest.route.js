import express from "express";
import {getFriendRequests, getSentFriendRequests, sendFriendRequest} from "../controllers/friendRequests.controller.js";
import {checkToken} from "../utils/checkToken.js";
const router = express.Router();

router.post("/", checkToken, sendFriendRequest);
router.get("/", checkToken, getFriendRequests);
router.get("/sent", checkToken, getSentFriendRequests);

export default router;