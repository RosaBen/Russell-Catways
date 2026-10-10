import Reservation from "../models/Reservation.js";

/**
 * Get all reservations
 *
 * @async
 * @route GET/reservations/reservations
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 * @returns {Promise} 
 * @access Protected
 */
export async function GetAllBookings (req, res) {
  try {
    const reservations = await Reservation.find();
    if (!reservations) {
      return res.status(404).json({ message: "there are no reservations created yet" });
    }
    return res.status(200).json(reservations);
  } catch (error) {
    return res.status(501).json({
      message: "server error"
    });
  }
}