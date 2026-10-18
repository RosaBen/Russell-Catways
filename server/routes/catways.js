import { Router } from "express";
import { protect } from "../middlewares/protect.js";
import { createNewCatway, getAllCatways, getCatwayByCatwayNumber, editCatway, deleteCatway } from "../services/catways.js";

const router = Router();

router.post("/", createNewCatway); //add middleware
router.get("/", getAllCatways); //add middleware
router.get("/:id", getCatwayByCatwayNumber); //add middleware
router.put("/:id", editCatway); //add middleware
router.delete("/:id", deleteCatway); //add middleware

export default router;