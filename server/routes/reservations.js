import { Router } from "express";
import { protect } from "../middlewares/protect.js";
import { GetAllBookings } from "../services/reservations.js";


const router = Router();

router.get("/", protect, GetAllBookings); //add middleware


export default router;