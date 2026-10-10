import Reservation from "../models/Reservation.js";

/**
 * create a new reservation for a selected catway
 *
 * @async
 * @route POST/catways/:id/reservations
 * @param {id} catwayNumber
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {Promise} 
 * @access Protected
 */
export async function createCatwayReservation (req, res) {
  const { clientName, boatName, startDate, endDate } = req.body;
  try {
    const { id } = req.params;
    const catway = await findCatwayNumber(id);
    const existingReservation = await Reservation.findOne({ catwayNumber: catway.catwayNumber, startDate: { $lt: endDate }, endDate: { $gt: startDate } });
    if (existingReservation) {
      return res.status(400).json({
        message: `this catway ${catway.catwayNumber} is already booked for this timeperiod`
      });
    }

    const reservation = await Reservation.create({ catwayNumber: catway.catwayNumber, clientName, boatName, startDate, endDate });

    return res.status(201).json({
      message: "catway created",
      reservation: {
        id: reservation._id,
        catwayNumber: reservation.catwayNumber,
        clientName: reservation.clientName,
        boatName: reservation.boatName,
        startDate: reservation.startDate,
        endDate: reservation.endDate
      }
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ errors: messages });
    }
    return res.status(501).json({ message: "server error" });
  }
}