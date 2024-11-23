const { usersRef } = require("../services/firestore");
const { storeScanImage } = require("../services/cloudStorage");
const { predict } = require("../services/inference");
const { generateId } = require("../utils/commonHelper");

const getHistories = async (userId) => {
	try {
		const querySnapshot = await usersRef.doc(userId).collection("scans").orderBy("createdAt", "desc").get();
		if (querySnapshot.empty) {
			return [];
		}

		const histories = querySnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data()
		}));

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
			console.error("AI processing failed.");
			return false;
		}

		const scanId = generateId();

		const imageUploadResult = await storeScanImage(scanId, image);
		if (!imageUploadResult) {
			console.error("Failed to upload image to storage.");
			return false;
		}

		const scanData = {
			id: scanId,
			image: imageUploadResult,
			result,
			createdAt: new Date()
		};

		const scanRef = usersRef.doc(userId).collection("scans").doc(scanData.id);
		await scanRef.set(scanData);

		return result;
	} catch (err) {
		console.error("Error posting scan:", err);
		return false;
	}
};

module.exports = { getHistories, postScan };
