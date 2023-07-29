import express from "express";
import {deleteUser, editUser, getSingleUser, random} from "../controllers/user.controller.js";
import {checkToken} from "../utils/checkToken.js";
const router = express.Router();

router.delete("/:id", checkToken, deleteUser);
router.get("/random", checkToken, random);
router.get("/:id", checkToken, getSingleUser);
router.put("/edit/:id", checkToken, editUser);

export default router;