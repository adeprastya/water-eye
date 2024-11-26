const scanModel = require("../models/scanModel");
const { validateScanImage } = require("../utils/validator");
const { errorResponse, successResponse } = require("../utils/response");

const getScans = async (req, res) => {
	try {
		const userId = req.params.userId;
		const data = await scanModel.getHistories(userId);

		return successResponse(res, 200, "Scans retrieved successfully", data);
	} catch (error) {
		return errorResponse(res, 500, "Error getting scans");
	}
};

const postScan = async (req, res) => {
	try {
		const userId = req.params.userId;
		const image = req.file;
		const base64Image = `data:${image.mimetype};base64,${image.buffer.toString("base64")}`;

		const isImageValid = validateScanImage(base64Image);
		if (!isImageValid) {
			return errorResponse(res, 400, "Image format is invalid or missing");
		}

		const result = await scanModel.postScan(userId, base64Image);
		if (!result) {
			return errorResponse(res, 500, "Error processing scan result");
		}

		return successResponse(res, 200, "Scan processed successfully", result);
	} catch (error) {
		return errorResponse(res, 500, "An unexpected error occurred while processing scan");
	}
};

module.exports = { getScans, postScan };
