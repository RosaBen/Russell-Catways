import { Router } from "express";
import { createNewCatway, getAllCatways } from "../services/catways.js";

const router = Router();

router.post("/", createNewCatway);
router.get("/", getAllCatways);

export default router;