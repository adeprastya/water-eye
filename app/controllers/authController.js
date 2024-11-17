const userModel = require("../models/userModel.js");

const signup = async (req, res) => {
	const { email, password, name, picture } = req.body;

	if (!email || !password || !name) {
		return res
			.status(400)
			.send(JSON.stringify({ status: "error", message: "Invalid request data or missing required fields" }));
	}

	const checkEmail = await userModel.findOne(email);

	if (checkEmail) {
		return res.status(409).send(JSON.stringify({ status: "error", message: "Email already exists" }));
	}

	const result = await userModel.create({ email, password, name, picture });

	if (!result) {
		return res.status(500).send(JSON.stringify({ status: "error", message: "Error creating user" }));
	}

	return res.status(200).send(JSON.stringify({ status: "success", message: "User created successfully" }));
};

const signin = (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res
			.status(400)
			.send(JSON.stringify({ status: "error", message: "Invalid request data or missing required fields" }));
	}

	const result = userModel.signin(email, password);

	if (!result) {
		return res.status(401).send(JSON.stringify({ status: "error", message: "Invalid email or password" }));
	}

	return res.status(200).send(
		JSON.stringify({
			status: "success",
			message: "User signed in successfully",
			data: {
				token: result
			}
		})
	);
};

const signout = (req, res) => {
	return res.status(200).send(JSON.stringify({ status: "success", message: "User signed out successfully" }));
};

module.exports = { signup, signin, signout };
