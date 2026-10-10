import { Router } from "express";
import { createNewUser } from "../services/users.js";

const router = Router();

router.post("/", createNewUser);


export default router;
