const userModel = require("../models/userModel");
const { validatePatchUserData } = require("../utils/validator");
const { errorResponse, successResponse } = require("../utils/response");

const getUser = async (req, res) => {
	try {
		const data = await userModel.findOne(req.params.userId);
		if (!data) {
			return errorResponse(res, 404, "User not found");
		}

		return successResponse(res, 200, "User retrieved successfully", data);
	} catch (error) {
		return errorResponse(res, 500, "Error getting user");
	}
};

const patchUser = async (req, res) => {
	try {
		const userId = req.params.userId;
		const updateData = req.body;

		const isValid = validatePatchUserData(updateData);
		if (!isValid) {
			return errorResponse(res, 400, "Invalid or empty update data");
		}

		const data = await userModel.patchOne(userId, updateData);
		if (!data) {
			return errorResponse(res, 404, "User not found or update failed");
		}

		return successResponse(res, 200, "User updated successfully", data);
	} catch (err) {
		return errorResponse(res, 500, "Internal server error");
	}
};

const deleteUser = async (req, res) => {
	try {
		const result = await userModel.deleteOne(req.params.userId);
		if (!result) {
			return errorResponse(res, 404, "User not found or deletion failed");
		}

		return successResponse(res, 200, "User deleted successfully");
	} catch (error) {
		return errorResponse(res, 500, "Error deleting user");
	}
};

const upgradeUser = async (req, res) => {
	try {
		const result = await userModel.patchOne(req.params.userId, { isPremium: true });
		if (!result) {
			return errorResponse(res, 404, "User not found or upgrade failed");
		}

		return successResponse(res, 200, "User account upgraded to premium successfully");
	} catch (error) {
		return errorResponse(res, 500, "Error upgrading user");
	}
};

module.exports = { getUser, patchUser, deleteUser, upgradeUser };
