const express = require("express");
const bcrypt = require("bcryptjs");
const { User } = require("../models");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, username, password, confirmPassword } =
    req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !username ||
    !password ||
    password !== confirmPassword
  ) {
    return res
      .status(400)
      .json({ message: "Invalid inputs or passwords do not match" });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      username,
      password,
    });

    return res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
