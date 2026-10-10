import Catway from "../models/Catway.js";

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