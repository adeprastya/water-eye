const { usersRef, scansRef } = require("../services/firestore");
const { storeScanImage } = require("../services/cloudStorage");
const { predict } = require("../services/inference");
const { generateId } = require("../utils/commonHelper");
const { findOne, patchOne } = require("../models/userModel");

const getHistories = async (userId) => {
	try {
		const querySnapshot = await scansRef(userId).orderBy("createdAt", "desc").get();
		if (querySnapshot.empty) {
			return [];
		}

		const histories = querySnapshot.docs.map((doc) => {
			const data = doc.data();

			if (data.createdAt && data.createdAt.toDate) {
				data.createdAt = data.createdAt.toDate();
			}

			return data;
		});

		return histories;
	} catch (err) {
		console.error("Error fetching scan histories:", err);
		return false;
	}
};

const postScan = async (userId, image) => {
	try {
		const result = await predict(image);
		if (!result) {
			return false;
		}

		const scanId = generateId();

		const imageUploadResult = await storeScanImage(scanId, image);
		if (!imageUploadResult) {
			return false;
		}

		const scanData = {
			id: scanId,
			image: imageUploadResult,
			result,
			createdAt: new Date()
		};

		const scanRef = scansRef(userId).doc(scanData.id);
		await scanRef.set(scanData);

		const userData = await findOne(userId);
		await patchOne(userId, {
			dailyScanHits: userData.dailyScanHits + 1,
			lastScan: new Date()
		});

		return result;
	} catch (err) {
		console.error("Error posting scan:", err);
		return false;
	}
};

module.exports = { getHistories, postScan };
