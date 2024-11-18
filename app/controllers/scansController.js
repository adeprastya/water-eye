const scanModel = require("../models/scanModel");
const { validateScanImage } = require("../utils/validator");

const getScans = async (req, res) => {
	const userId = req.params.userId;

	const result = await scanModel.getHistories(userId);

	if (!result) {
		return res.status(500).send(JSON.stringify({ status: "error", message: "Error getting scans" }));
	}

	return res.status(200).send(
		JSON.stringify({
			status: "success",
			message: "Scans retrieved successfully",
			data: result
		})
	);
};

const postScans = async (req, res) => {
	const userId = req.params.userId;
	const image = req.body;

	const scanImageValidation = validateScanImage(image);

	if (!scanImageValidation) {
		return res.status(400).send(JSON.stringify({ status: "error", message: "Image data is required" }));
	}

	const result = await scanModel.postScan(userId, image);

	if (!result) {
		return res.status(500).send(JSON.stringify({ status: "error", message: "Error getting scans result" }));
	}

	return res.status(200).send(
		JSON.stringify({
			status: "success",
			message: "Scans retrieved successfully",
			data: result
		})
	);
};

module.exports = { getScans, postScans };
