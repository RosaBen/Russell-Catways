import { Router } from "express";
import { GetAllBookings } from "../services/reservations.js";


const router = Router();

router.get("/", GetAllBookings);


export default router;