import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const ADMIN_EMAIL = "admin@example.com";
const ADMIN_PASSWORD = "admin123"; // You can move this to .env for better security

// REGISTER
export const register = async (req, res) => {
  const { fullName, email, password, role, phone } = req.body;

  // Prevent admin registration
  if (role === "admin") {
    return res.status(403).json({ message: "Admin registration is not allowed." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      role,
      phone,
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({ user: newUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Admin Login
    if (email === ADMIN_EMAIL) {
      if (password === ADMIN_PASSWORD) {
        const token = jwt.sign(
          { id: "admin-id", email, role: "admin" },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        return res.status(200).json({
          user: {
            id: "admin-id",
            fullName: "Admin User",
            email,
            role: "admin",
          },
          token,
        });
      } else {
        return res.status(401).json({ message: "Invalid admin credentials" });
      }
    }

    // Vendor/Supplier Login
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};
