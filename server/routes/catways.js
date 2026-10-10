import { Router } from "express";
import { createNewCatway, getAllCatways, getCatwayByCatwayNumber } from "../services/catways.js";

const router = Router();

router.post("/", createNewCatway);
router.get("/", getAllCatways);
router.get("/:id", getCatwayByCatwayNumber);

export default router;