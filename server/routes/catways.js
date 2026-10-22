import { Router } from "express";
import { protect } from "../middlewares/protect.js";
import { createNewCatway, getAllCatways, getCatwayByCatwayNumber, editCatway, deleteCatway } from "../services/catways.js";

const router = Router();

router.post("/", protect, createNewCatway); //add middleware
router.get("/", protect, getAllCatways); //add middleware
router.get("/:id", protect, getCatwayByCatwayNumber); //add middleware
router.put("/:id", protect, editCatway); //add middleware
router.delete("/:id", protect, deleteCatway); //add middleware

export default router;