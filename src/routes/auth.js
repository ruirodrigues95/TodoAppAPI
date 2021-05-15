const express = require("express");
const router = express.Router();
const db = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    await db.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
      username,
      bcrypt.hashSync(password, saltRounds),
    ]);

    console.log('cenas')

    res.status(200).json({ message: "registered successfully" });
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await db.query(
      "SELECT * FROM users WHERE username=$1",
      [username]
    );

    if (!existingUser.rows.length == 1) {
      throw "There is no account with that username.";
    }

    const doesPasswordMatch = bcrypt.compareSync(
      password,
      existingUser.rows[0].password
    );

    if (!doesPasswordMatch) {
      throw "Wrong password.";
    }

    const userId = existingUser.rows[0].id;
    const token = jwt.sign({ userId }, process.env.SECRET, {
      expiresIn: parseInt(process.env.EXPIRES_IN),
    });

    res.status(200).json({ token: token });
  } catch (e) {
    res.status(401).json({ message: e });
  }
});

module.exports = router;
