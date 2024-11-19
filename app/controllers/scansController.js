const scanModel = require("../models/scanModel");
const { validateScanImage } = require("../utils/validator");

const getScans = async (req, res) => {
	const userId = req.params.userId;

	const data = await scanModel.getHistories(userId);
	if (!data) {
		return res.status(500).send(JSON.stringify({ status: "error", message: "Error getting scans" }));
	}

	return res.status(200).send(
		JSON.stringify({
			status: "success",
			message: "Scans retrieved successfully",
			data
		})
	);
};

const postScans = async (req, res) => {
	const userId = req.params.userId;
	const image = req.body;

	const isImageValid = validateScanImage(image);
	if (!isImageValid) {
		return res.status(400).send(JSON.stringify({ status: "error", message: "Image format is invalid or missing" }));
	}

	const data = await scanModel.postScan(userId, image);
	if (!data) {
		return res.status(500).send(JSON.stringify({ status: "error", message: "Error getting scans result" }));
	}

	return res.status(200).send(
		JSON.stringify({
			status: "success",
			message: "Scans retrieved successfully",
			data
		})
	);
};

module.exports = { getScans, postScans };
