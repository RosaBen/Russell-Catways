import { Router } from "express";
import { protect } from "../middlewares/protect.js";
import { createCatwayReservation, getAllCatwayBookings, getReservationById, editReservation, deleteReservation } from "../services/catwayReservations.js";

const router = Router({ mergeParams: true });

router.post("/", createCatwayReservation); //add middleware
router.get("/", getAllCatwayBookings); //add middleware
router.get("/:idReservation", getReservationById); //add middleware
router.put("/:idReservation", editReservation); //add middleware
router.delete("/:idReservation", deleteReservation); //add middleware


export default router;