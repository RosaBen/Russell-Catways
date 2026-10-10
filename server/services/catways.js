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

/**
 * Get all catways
 *
 * @async
 * @route GET/catways
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 * @returns {Promise} 
 * @access Protected
 */
export async function getAllCatways (req, res) {
  try {
    const catways = await Catway.find().sort({ createdAt: -1 });
    if (!catways) {
      return res.status(404).json({ message: "there are no catways created yet" });
    }
    return res.status(200).json(catways);
  } catch (error) {
    return res.status(501).json({
      message: "server error"
    });
  }
}

/**
 * Get a catway using its number as param
 *
 * @async
 * @route GET/catways/:id
 * @param {id} catwayNumber
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {Promise} 
 * @access Protected
 */
export async function getCatwayByCatwayNumber (req, res) {
  try {
    const catway = await Catway.findOne({ catwayNumber: req.params.id });
    if (!catway) {
      res.status(404).json({ message: "catway not found" });
    }
    return res.status(200).json(catway);
  } catch (error) {
    return res.status(501).json({
      message: "server error"
    });
  }
}

/**
 * edit a catway found by catwaynumber
 *
 * @async
 * @route PUT/catways/:id
 * @param {id} catwayNumber
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 * @returns {Promise} 
 * @access Protected
 */
export async function editCatway (req, res) {
  const temp = ({
    catwayNumber: req.body.catwayNumber,
    catwayType: req.body.catwayType,
    catwayState: req.body.catwayState
  });
  try {
    const catway = await Catway.findOne({ catwayNumber: req.params.id });
    if (!catway) {
      return res.status(404).json({ message: "catway not found" });
    }

    Object.keys(temp).forEach(key => {
      if (temp[key] !== undefined) {
        catway[key] = temp[key];
      }
    });

    await catway.save();
    return res.status(201).json({
      message: "catway edited",
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

/**
 * delete a catway
 *
 * @async
 * @route DELETE/catways/:id
 * @param {id} catwayNumber
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 * @returns {Promise} 
 * @access Protected
 */
export async function deleteCatway (req, res) {
  try {
    const catway = await Catway.findOne({ catwayNumber: req.params.id });
    if (!catway) {
      res.status(404).json({ message: "catway not found" });
    }
    await Catway.deleteOne(catway);
    return res.status(200).json({ message: "catway deleted" });
  } catch (error) {
    return res.status(501).json({
      message: "server error"
    });
  }
}