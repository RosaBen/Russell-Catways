import { Router } from "express";
import { login } from "../services/auth.js";

const router = Router();

router.post("/login", login);



export default router;