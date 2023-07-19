import express from "express";
import {deleteUser, getSingleUser} from "../controllers/user.controller.js";
import {checkToken} from "../utils/checkToken.js";
const router = express.Router();

router.delete("/:id", checkToken, deleteUser);
router.get("/:id", checkToken, getSingleUser);

export default router;