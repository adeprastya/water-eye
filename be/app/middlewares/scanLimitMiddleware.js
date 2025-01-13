const { findOne, patchOne } = require("../models/userModel");
const { errorResponse } = require("../utils/response");

const MAX_SCAN = 10;

const scanLimitMiddleware = async (req, res, next) => {
	try {
		const userId = req.params.userId;
		const userData = await findOne(userId);
		let currentScanHits = userData.dailyScanHits;

		const currentDate = new Date();
		const lastScanDate = userData.lastScan.toDate();

		const currentYear = currentDate.getFullYear();
		const currentMonth = currentDate.getMonth();
		const currentDay = currentDate.getDate();

		const lastScanYear = lastScanDate.getFullYear();
		const lastScanMonth = lastScanDate.getMonth();
		const lastScanDay = lastScanDate.getDate();

		if (currentYear !== lastScanYear || currentMonth !== lastScanMonth || currentDay !== lastScanDay) {
			await patchOne(userId, {
				dailyScanHits: 0
			});

			currentScanHits = 0;
		}

		if (currentScanHits >= MAX_SCAN && userData.isPremium === false) {
			return errorResponse(res, 500, "Daily scans limit exceeded");
		}

		next();
	} catch (err) {
		console.error("Error checking/resetting daily points:", err);
		return errorResponse(res, 500, "Error checking/resetting daily scans limit");
	}
};

module.exports = scanLimitMiddleware;
