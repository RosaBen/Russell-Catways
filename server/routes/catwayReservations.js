import { Router } from "express";
import { createCatwayReservation } from "../services/catwayReservations.js";

const router = Router({ mergeParams: true });

router.post("/", createCatwayReservation);


export default router;