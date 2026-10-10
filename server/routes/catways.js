import { Router } from "express";
import { createNewCatway } from "../services/catways.js";

const router = Router();

router.post("/", createNewCatway);

export default router;