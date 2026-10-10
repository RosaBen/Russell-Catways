import { Router } from "express";
import { createNewUser, getAllUsers } from "../services/users.js";

const router = Router();

router.post("/", createNewUser);
router.get("/", getAllUsers);


export default router;
