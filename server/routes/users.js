import { Router } from "express";
import { createNewUser, getAllUsers, getUserByEmail, editUser, deleteUser } from "../services/users.js";

const router = Router();

router.post("/", createNewUser);
router.get("/", getAllUsers);
router.get("/:email", getUserByEmail);
router.put("/:email", editUser);
router.delete("/:email", deleteUser);


export default router;
