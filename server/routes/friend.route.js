import express from "express";
import {
    acceptFriendRequest, getFriendList,
    getFriendRequests,
    getSentFriendRequests, rejectFriendRequest, removeFriend,
    sendFriendRequest
} from "../controllers/friend.controller.js";
import {checkToken} from "../utils/checkToken.js";
const router = express.Router();

router.post("/", checkToken, sendFriendRequest);
router.get("/", checkToken, getFriendRequests);
router.get("/sent", checkToken, getSentFriendRequests);
router.put("/accept", checkToken, acceptFriendRequest);
router.put("/reject", checkToken, rejectFriendRequest);
router.put("/remove/:friendId", checkToken, removeFriend);
router.get("/list/:id", checkToken, getFriendList);

export default router;