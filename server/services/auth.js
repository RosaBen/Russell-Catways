import User from "../models/User.js";
import bcrypt from "bcrypt";
import { generateToken, getAuthCookieOptions } from "../utils/utils.js";

/**
 * login 
 *
 * @async
 * @route POST/login
 * @param {Request} req 
 * @param {Response} res 
 * @returns {Promise} 
 * @access Public
 */
export async function login (req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "wrong credentials"
      });
    }

    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (!passwordCorrect) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = generateToken(user);

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      message: "login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ errors: messages });
    }
    return res.status(500).json({ message: "server error", details: error.message });
  }
}


/**
 * logout
 *
 * @async
 * @route GET/logout
 * @param {Request} req 
 * @param {Response} res 
 * @returns {Promise} 
 * @access Protected
 */
export async function logout (req, res) {
  try {
    res.clearCookie("token", getAuthCookieOptions());

    return res.status(200).json({ message: "session terminated" });
  } catch (error) {
    return res.status(501).json({
      message: "server error"
    });
  }
}