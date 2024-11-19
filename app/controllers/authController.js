const userModel = require("../models/userModel.js");
const { validateRegisterData, validateSigninData } = require("../utils/validator");
const { generateToken } = require("../utils/token");

const signup = async (req, res) => {
	const isValid = validateRegisterData(req.body);
	if (!isValid) {
		return res.status(400).json({
			status: "error",
			message: "Invalid request data or missing required fields"
		});
	}

	const { email, password, name, picture } = req.body;

	const emailExist = await userModel.findEmail(email);
	if (emailExist) {
		return res.status(409).json({
			status: "error",
			message: "Email already exists"
		});
	}

	const userCreated = await userModel.create({ email, password, name, picture });
	if (!userCreated) {
		return res.status(500).json({
			status: "error",
			message: "Error creating user"
		});
	}

	return res.status(200).json({
		status: "success",
		message: "User created successfully"
	});
};

const signin = async (req, res) => {
	const isValid = validateSigninData(req.body);
	if (!isValid) {
		return res
			.status(400)
			.send(JSON.stringify({ status: "error", message: "Invalid request data or missing required fields" }));
	}

	const { email, password } = req.body;

	const isVerified = await userModel.signin(email, password);
	if (!isVerified) {
		return res.status(401).send(JSON.stringify({ status: "error", message: "Invalid email or password" }));
	}

	const { id } = await userModel.findByEmail(email);
	if (!id) {
		return res.status(404).send(JSON.stringify({ status: "error", message: "User not found" }));
	}

	const token = generateToken(id);
	if (!token) {
		return res.status(500).send(JSON.stringify({ status: "error", message: "Error generating token" }));
	}

	return res.status(200).send(
		JSON.stringify({
			status: "success",
			message: "User signed in successfully",
			data: {
				token: token
			}
		})
	);
};

const signout = (req, res) => {
	return res.status(200).send(JSON.stringify({ status: "success", message: "User signed out successfully" }));
};

module.exports = { signup, signin, signout };
