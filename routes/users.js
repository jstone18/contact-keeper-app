const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator/check");

const User = require("../models/User");

// @route     POST api/users
// @desc      Regiter a user
// @access    Public
router.post(
	"/",
	[
		check("name", "Please add name")
			.not()
			.isEmpty(),
		check("email", "Please include a valid email").isEmail(),
		check(
			"password",
			"Please enter a password with 6 or more characters"
		).isLength({ min: 6 })
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body;

		try {
			// Check for user
			let user = await User.findOne({ email });

			if (user) {
				return res.status(400).json({ msg: "User already exists" });
			}

			// Create new user object
			user = new User({
				name,
				email,
				password
			});

			// Hash password
			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);

			// Save user to db
			await user.save();

			// Create payload
			const payload = {
				user: {
					id: user.id
				}
			};

			// Sign token
			jwt.sign(
				payload,
				config.get("jwtSecret"),
				{
					expiresIn: 360000
				},
				(err, token) => {
					if (err) throw err;
					// respond with token
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	}
);

module.exports = router;
