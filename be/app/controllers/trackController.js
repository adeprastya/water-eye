const trackModel = require("../models/trackModel");
const { errorResponse, successResponse } = require("../utils/response");
const { validateTrackData, validateScanImage } = require("../utils/validator");

const getTrack = async (req, res) => {
	try {
		const userId = req.params.userId;
		const data = await trackModel.findMany(userId);
		if (!data) {
			return errorResponse(res, 404, "Error getting tracks");
		}

		return successResponse(res, 200, "Tracks retrieved successfully", data);
	} catch (error) {
		return errorResponse(res, 500, "Error getting tracks");
	}
};

const postTrack = async (req, res) => {
	try {
		const userId = req.params.userId;
		const data = req.body;

		const isValid = validateTrackData(data);
		if (!isValid) {
			return errorResponse(res, 400, "Invalid or empty track data");
		}

		const result = await trackModel.create(userId, data);
		if (!result) {
			return errorResponse(res, 404, "Error creating track");
		}

		return successResponse(res, 200, "Track created successfully", result);
	} catch (error) {
		return errorResponse(res, 500, "Error creating track");
	}
};

const deleteTrack = async (req, res) => {
	try {
		const userId = req.params.userId;
		const trackId = req.params.trackId;

		const result = await trackModel.deleteOne(userId, trackId);
		if (!result) {
			return errorResponse(res, 404, "Error deleting track or track not found");
		}

		return successResponse(res, 200, "Track deleted successfully");
	} catch (error) {
		return errorResponse(res, 500, "Something went wrong while deleting track");
	}
};

const getScanTrack = async (req, res) => {
	try {
		const userId = req.params.userId;
		const trackId = req.params.trackId;

		const data = await trackModel.getScans(userId, trackId);
		if (!data) {
			return errorResponse(res, 404, "Error getting scans in track");
		}

		return successResponse(res, 200, "Track retrieved successfully", data);
	} catch (error) {
		return errorResponse(res, 500, "Error getting scans in track");
	}
};

const postScanTrack = async (req, res) => {
	try {
		const userId = req.params.userId;
		const trackId = req.params.trackId;
		const image = req.file;
		const base64Image = `data:${image.mimetype};base64,${image.buffer.toString("base64")}`;

		const isImageValid = validateScanImage(base64Image);
		if (!isImageValid) {
			return errorResponse(res, 400, "Image format is invalid or missing");
		}

		const result = await trackModel.postScan(userId, trackId, base64Image);
		if (!result) {
			return errorResponse(res, 404, "Error adding scan in track");
		}

		return successResponse(res, 200, "Track updated successfully", result);
	} catch (error) {
		return errorResponse(res, 500, "Error adding scan in track");
	}
};

module.exports = { getTrack, postTrack, deleteTrack, getScanTrack, postScanTrack };
