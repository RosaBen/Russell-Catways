import { Router } from "express";
import { createCatwayReservation, getAllCatwayBookings, getReservationById, editReservation } from "../services/catwayReservations.js";

const router = Router({ mergeParams: true });

router.post("/", createCatwayReservation);
router.get("/", getAllCatwayBookings);
router.get("/:idReservation", getReservationById);
router.put("/:idReservation", editReservation);


export default router;