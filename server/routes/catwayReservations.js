import { Router } from "express";
import { createCatwayReservation, getAllCatwayBookings } from "../services/catwayReservations.js";

const router = Router({ mergeParams: true });

router.post("/", createCatwayReservation);
router.get("/", getAllCatwayBookings);


export default router;