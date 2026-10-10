import { Router } from "express";
import { createCatwayReservation, getAllCatwayBookings, getReservationById } from "../services/catwayReservations.js";

const router = Router({ mergeParams: true });

router.post("/", createCatwayReservation);
router.get("/", getAllCatwayBookings);
router.get("/:idReservation", getReservationById);


export default router;