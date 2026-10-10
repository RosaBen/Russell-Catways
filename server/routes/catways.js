import { Router } from "express";
import { createNewCatway, getAllCatways, getCatwayByCatwayNumber, editCatway, deleteCatway } from "../services/catways.js";

const router = Router();

router.post("/", createNewCatway);
router.get("/", getAllCatways);
router.get("/:id", getCatwayByCatwayNumber);
router.put("/:id", editCatway);
router.delete("/:id", deleteCatway);

export default router;