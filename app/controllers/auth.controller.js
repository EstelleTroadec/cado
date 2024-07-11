import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../models/User.js";
import { sendEmail } from "../utils/sendEmail.js";
// Import necessary modules

// Register a new user
export default {
  async register(req, res) {
    try {
      // Extract user data from request body
      const { name, email, password } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({
        where: { email },
      });
      if (existingUser) {
        return res.status(400).json({ message: "email already exists" });
      }

      // Hash the password
      const hashedPassword = await hash(password, 10);

      // Generate a JWT token linked to the email
      const token = jwt.sign({ email: email }, `${process.env.JWT_SECRET_KEY}`);

      // Create a new user
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        is_registered: true,
        token: token,
      });

      // Send an email to the new user
      const subject = "Welcome to Cad'O";
      const html = `Hello ${user.name}, welcome to Cad'O!`;
      sendEmail(user.email, subject, html);

      return res.status(201).json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Login an existing user
  async login(req, res) {
    try {
      // Extract user data from request body
      const { email, password } = req.body;

      // Check if user exists
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: "Invalid credentials" });
      }

      // Compare passwords
      const isPasswordValid = await compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Vérifier le token
      jwt.verify(
        user.token,
        `${process.env.JWT_SECRET_KEY}`,
        (err, decoded) => {
          if (err) {
            return res.status(401).json({ message: "Invalid token" });
          }

          // Le token est valide, procéder à l'authentification
          return res.status(200).json(user);
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
