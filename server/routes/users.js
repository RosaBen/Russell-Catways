import { Router } from "express";
import { createNewUser, getAllUsers, getUserByEmail } from "../services/users.js";

const router = Router();

router.post("/", createNewUser);
router.get("/", getAllUsers);
router.get("/:email", getUserByEmail);


export default router;
