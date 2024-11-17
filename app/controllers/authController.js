const userModel = require("../models/userModel.js");
const { validateRegisterData } = require("../utils/validator");
const { generateToken } = require("../utils/token");

const signup = async (req, res) => {
	const registerDataValidation = validateRegisterData(req.body);

	if (!registerDataValidation) {
		return res
			.status(400)
			.send(JSON.stringify({ status: "error", message: "Invalid request data or missing required fields" }));
	}

	const { email, password, name, picture } = req.body;

	const checkEmail = await userModel.findEmail(email);

	if (checkEmail) {
		return res.status(409).send(JSON.stringify({ status: "error", message: "Email already exists" }));
	}

	const result = await userModel.create({ email, password, name, picture });

	if (!result) {
		return res.status(500).send(JSON.stringify({ status: "error", message: "Error creating user" }));
	}

	return res.status(200).send(JSON.stringify({ status: "success", message: "User created successfully" }));
};

const signin = async (req, res) => {
	const signinDataValidation = validateSigninData(req.body);

	if (!signinDataValidation) {
		return res
			.status(400)
			.send(JSON.stringify({ status: "error", message: "Invalid request data or missing required fields" }));
	}

	const { email, password } = req.body;

	const signinValidation = await userModel.signin(email, password);

	if (!signinValidation) {
		return res.status(401).send(JSON.stringify({ status: "error", message: "Invalid email or password" }));
	}

	const data = await userModel.findByEmail(email);

	const token = generateToken(data.id);

	return res.status(200).send(
		JSON.stringify({
			status: "success",
			message: "User signed in successfully",
			data: {
				token
			}
		})
	);
};

const signout = (req, res) => {
	return res.status(200).send(JSON.stringify({ status: "success", message: "User signed out successfully" }));
};

module.exports = { signup, signin, signout };
