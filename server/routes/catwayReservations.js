import { Router } from "express";
import { protect } from "../middlewares/protect.js";
import { createCatwayReservation, getAllCatwayBookings, getReservationById, editReservation, deleteReservation } from "../services/catwayReservations.js";

const router = Router({ mergeParams: true });

router.post("/", protect, createCatwayReservation); //add middleware
router.get("/", protect, getAllCatwayBookings); //add middleware
router.get("/:idReservation", protect, getReservationById); //add middleware
router.put("/:idReservation", protect, editReservation); //add middleware
router.delete("/:idReservation", protect, deleteReservation); //add middleware


export default router;