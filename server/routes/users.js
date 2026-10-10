import { Router } from "express";
import { protect } from "../middlewares/protect.js";
import { createNewUser, getAllUsers, getUserByEmail, editUser, deleteUser } from "../services/users.js";

const router = Router();

router.post("/", createNewUser);
router.get("/", getAllUsers); //add middleware
router.get("/:email", getUserByEmail);//add middleware
router.put("/:email", editUser); //add middleware
router.delete("/:email", deleteUser); //add middleware


export default router;
