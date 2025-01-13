const userModel = require("../models/userModel.js");
const { validateRegisterData, validateSigninData } = require("../utils/validator");
const { generateToken } = require("../utils/token");
const { errorResponse, successResponse } = require("../utils/response.js");

const signup = async (req, res) => {
	const isValid = validateRegisterData(req.body);
	if (!isValid) {
		return errorResponse(res, 400, "Invalid request data or missing required fields");
	}

	const { email, password, name } = req.body;

	try {
		const emailExist = await userModel.findEmail(email);
		if (emailExist) {
			return errorResponse(res, 409, "Email already exists");
		}

		const userCreated = await userModel.create({ email, password, name });
		if (!userCreated) {
			return errorResponse(res, 500, "Error creating user");
		}

		return successResponse(res, 200, "User created successfully");
	} catch (error) {
		return errorResponse(res, 500, "An unexpected error occurred");
	}
};

const signin = async (req, res) => {
	const isValid = validateSigninData(req.body);
	if (!isValid) {
		return errorResponse(res, 400, "Invalid request data or missing required fields");
	}

	const { email, password } = req.body;

	try {
		const isVerified = await userModel.signin(email, password);
		if (!isVerified) {
			return errorResponse(res, 401, "Invalid email or password");
		}

		const { id } = await userModel.findByEmail(email);
		if (!id) {
			return errorResponse(res, 404, "User not found");
		}

		const token = generateToken(id);
		if (!token) {
			return errorResponse(res, 500, "Error generating token");
		}

		return successResponse(res, 200, "User signed in successfully", { id, token: `Bearer ${token}` });
	} catch (error) {
		return errorResponse(res, 500, "An unexpected error occurred");
	}
};

const signout = (req, res) => {
	return successResponse(res, 200, "User signed out successfully");
};

module.exports = { signup, signin, signout };
