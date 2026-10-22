import { Router } from "express";
import { protect } from "../middlewares/protect.js";
import { createNewUser, getAllUsers, getUserByEmail, editUser, deleteUser } from "../services/users.js";

const router = Router();

router.post("/", createNewUser);
router.get("/", protect, getAllUsers); //add middleware
router.get("/:email", protect, getUserByEmail);//add middleware
router.put("/:email", protect, editUser); //add middleware
router.delete("/:email", protect, protect, deleteUser); //add middleware


export default router;
