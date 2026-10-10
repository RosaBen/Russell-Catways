import Catway from "../models/Catway.js";

/**
 * Register a new catway
 *
 * @async
 * @route POST/catways
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {Promise} 
 * @access Protected
 */
export async function createNewCatway (req, res) {
  const { catwayNumber, catwayType, catwayState } = req.body;
  try {
    const existingNumber = await Catway.findOne({ catwayNumber: req.params.id });
    if (existingNumber) {
      return res.status(409).json({ message: "this catway number exist already" });
    }
    const catway = await Catway.create({ catwayNumber, catwayType, catwayState });
    return res.status(201).json({
      message: "catway created",
      catway: {
        id: catway._id,
        catwayNumber: catway.catwayNumber,
        catwayType: catway.catwayType,
        catwayState: catway.catwayState
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