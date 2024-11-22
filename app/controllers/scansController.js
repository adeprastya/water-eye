const scanModel = require("../models/scanModel");
const { validateScanImage } = require("../utils/validator");
const { errorResponse, successResponse } = require("../utils/response");

const getScans = async (req, res) => {
	try {
		const userId = req.params.userId;
		const data = await scanModel.getHistories(userId);

		if (!data) {
			return errorResponse(res, 404, "No scans found for this user");
		}

		return successResponse(res, 200, "Scans retrieved successfully", data);
	} catch (error) {
		return errorResponse(res, 500, "Error getting scans");
	}
};

const postScans = async (req, res) => {
	try {
		const userId = req.params.userId;
		const image = req.body;

		const isImageValid = validateScanImage(image);
		if (!isImageValid) {
			return errorResponse(res, 400, "Image format is invalid or missing");
		}

		const data = await scanModel.postScan(userId, image);
		if (!data) {
			return errorResponse(res, 500, "Error processing scan result");
		}

		return successResponse(res, 200, "Scan processed successfully", data);
	} catch (error) {
		return errorResponse(res, 500, "An unexpected error occurred while processing scan");
	}
};

module.exports = { getScans, postScans };
