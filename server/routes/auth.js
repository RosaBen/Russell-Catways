import { Router } from "express";
import { protect } from "../middlewares/protect.js";
import { login, logout } from "../services/auth.js";

const router = Router();

router.post("/login", login);
router.get("/logout", logout); //add middleware



export default router;