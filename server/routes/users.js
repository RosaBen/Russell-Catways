import { Router } from "express";
import { createNewUser, getAllUsers, getUserByEmail, editUser } from "../services/users.js";

const router = Router();

router.post("/", createNewUser);
router.get("/", getAllUsers);
router.get("/:email", getUserByEmail);
router.put("/:email", editUser);


export default router;
