import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import { ENV } from "../lib/env.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";


export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be atleast 6 characters " })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "Email already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })

        if (newUser) {
            const savedUser = await newUser.save();
            generateToken(savedUser._id, res);

            res.status(201).json({
                _id: savedUser._id,
                fullName: savedUser.fullName,
                email: savedUser.email,
                profilePic: savedUser.profilePic,
            })

            // ← MOVE EMAIL SENDING HERE (inside the if block)
            try {
                await sendWelcomeEmail(
                    savedUser.email, 
                    savedUser.fullName, 
                    ENV.CLIENT_URL
                );
            } catch (error) {
                console.log("Failed to send welcome email:", error);
                // Don't throw - user signup already succeeded
            }

        } else {
            res.status(400).json({ message: "Invalid user data" })
        }

    } catch (error) {
        console.error("Error in signup controller:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}