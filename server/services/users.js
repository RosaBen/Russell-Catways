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