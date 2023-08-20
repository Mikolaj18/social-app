import express from "express";
import {getLikes, like, unlike} from "../controllers/like.controller.js";
import {checkToken} from "../utils/checkToken.js";

const router = express.Router();

router.post("/", checkToken, like);
router.get("/:objectId", checkToken, getLikes);
router.delete("/", checkToken, unlike);

export default router;
