import User from "../models/User.js";

/**
 * Register a new user
 *
 * @async
 * @route POST/users
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {Promise} 
 * @access Public
 */
export async function createNewUser (req, res) {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "this email/user exist already" });
    }

    const user = await User.create({ username, email, password });
    return res.status(201).json({
      message: "user created",
      user: {
        id: user._id,
        username: user.username,
        email: user.email
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
 * Get all users
 *
 * @async
 * @route GET/users
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 * @returns {Promise} 
 * @access Protected
 */
export async function getAllUsers (req, res) {
  try {
    const users = await User.find().select("-password");
    if (!users) {
      return res.status(404).json({ message: "there are no users yet" });
    }

    return res.status(200).json(users);
  } catch (error) {
    return res.status(501).json({
      message: "server error"
    });
  }
}