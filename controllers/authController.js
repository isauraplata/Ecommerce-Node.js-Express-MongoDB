import jwt from "jsonwebtoken";
import {
  signUpBodyValidation,
  loginBodyValidation,
} from "../utils/validationSchema.js";
import { config } from "dotenv";
import User from "../models/User.js"
import Role from "../models/Role.js"

config();

export const signUp = async (req, res) => {
  try {
    const { error } = signUpBodyValidation(req.body);
    if (error) {
      return res
        .status(400)
        .json({ error: error, message: error.details[0].message });
    }
    
    const { username, email, password, rol } = req.body;
    const role = await Role.findOne({ name: rol });

    const newUser = new User({
      username,
      email,
      password: await User.encryptPassword(password),
      role: role._id // Asignar el ID del rol al usuario
    });

    const savedUser = await newUser.save();
    res.status(201).json({ message: "Account created successfully!" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An internal server error occurred." });
  }
};

export const signIn = async (req, res) => {
  try {
    const { error } = loginBodyValidation(req.body);
    if (error) {
      return res
        .status(400)
        .json({ error: error, message: error.details[0].message });
    }

    const userFound = await User.findOne({ email: req.body.email });

    if (!userFound) {
      return res.status(400).json({ message: "User not found" });
    }

    const matchpassword = await User.comparePassword(
      req.body.password,
      userFound.password
    );

    if (!matchpassword) {
      return res.status(401).json({ toke: null, message: "ERROR" });
    }

    const token = jwt.sign(
      { id: userFound.id },
      process.env.ACCESS_TOKEN_PRIVATE_KEY,
      { expiresIn: 86400 }
    );

    return res
      .cookie("access_token", token, {
        httpOnly: false,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000, //24 hrs
        secure: false, //esto se cambia cuando se ponga el ssl
      })
      .status(200)
      .json({ message: "Logged in successfully!" });
  } catch (error) {
    res.status(401).json({ message: "Invalid email or password." });
  }
};

export const logout = (req, res) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out" });
};
