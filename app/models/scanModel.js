const { usersRef } = require("../services/firestore");
const { storeScanImage } = require("../services/cloudStorage");
const { predict } = require("../services/inference");
const { generateId } = require("../utils/commonHelper");

const getHistories = async (userId) => {
	try {
		const querySnapshot = await usersRef.doc(userId).collection("scans").orderBy("createdAt", "desc").get();

		if (querySnapshot.empty) {
			console.log(`No scan histories found for user: ${userId}`);
			return [];
		}

		const histories = querySnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data()
		}));

		console.log(`Found ${histories.length} scan histories for user: ${userId}`);
		return histories;
	} catch (err) {
		console.error("Error fetching scan histories:", err);
		return false;
	}
};

const postScan = async (userId, image) => {
	try {
		// Step 1: Process the image with AI service
		const result = await predict(image);
		if (!result) {
			console.error("AI processing failed.");
			return false;
		}

		const scanId = generateId();

		// Step 2: Upload the image to Cloud Storage
		const imageUploadResult = await storeScanImage(scanId, image);
		if (!imageUploadResult) {
			console.error("Failed to upload image to storage.");
			return false;
		}

		// Step 3: Store the AI result and image metadata in Firestore
		const scanData = {
			id: scanId,
			image: imageUploadResult,
			result,
			createdAt: new Date()
		};

		// Save scan data to Firestore
		const scanRef = usersRef.doc(userId).collection("scans").doc(scanData.id);
		await scanRef.set(scanData);

		console.log(`Scan saved successfully for user: ${userId}`);
		return result;
	} catch (err) {
		console.error("Error posting scan:", err);
		return false;
	}
};

module.exports = { getHistories, postScan };
