import Catway from "../models/Catway.js";
import jwt from "jsonwebtoken";

/**
 * find the catwayNumber
 *
 * @export
 * @async
 * @param {catwayNumber} catwayNumber 
 * @returns {number}
 */
export async function findCatwayNumber (catwayNumber) {
  const catway = await Catway.findOne({ catwayNumber });
  if (!catway) {
    const error = new Error("catway not found");
    error.statusCode = 404;
    throw error;
  }
  return catway;
}

/**
 * generate a token when logging in
 *
 * @export
 * @param {user} user 
 * @returns {string} 
 */
export async function generateToken (user) {
  const expirIn = 24 * 60 * 60;
  return jwt.sign({ id: user._id, email: user.email }, process.env.SECRET_KEY, {
    expiresIn: expirIn
  });
}