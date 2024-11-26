const { tracksRef, trackScansRef, deleteRecursive } = require("../services/firestore");
const { storeScanImage } = require("../services/cloudStorage");
const { predict } = require("../services/inference");
const { generateId } = require("../utils/commonHelper");
const { findOne, patchOne } = require("./userModel");

const findMany = async (userId) => {
	try {
		const snapshot = await tracksRef(userId).orderBy("createdAt", "desc").get();
		if (snapshot.empty) {
			return [];
		}

		const tracks = snapshot.docs.map((doc) => {
			const data = doc.data();

			if (data.createdAt && data.createdAt.toDate) {
				data.createdAt = data.createdAt.toDate();
			}

			return data;
		});

		return tracks;
	} catch (err) {
		console.error("Error finding tracks:", err);
		return false;
	}
};

const create = async (userId, data) => {
	try {
		const trackData = {
			id: generateId(),
			name: data.name,
			createdAt: new Date()
		};

		const trackRef = tracksRef(userId).doc(trackData.id);
		await trackRef.set(trackData);

		return trackData;
	} catch (err) {
		console.error("Error creating track:", err);
		return false;
	}
};

const deleteOne = async (userId, trackId) => {
	try {
		const trackRef = tracksRef(userId).doc(trackId);
		const trackDoc = await trackRef.get();
		if (!trackDoc.exists) {
			return false;
		}

		await deleteRecursive(trackRef);

		return true;
	} catch (err) {
		console.error("Error deleting track:", err);
		return false;
	}
};

const getScans = async (userId, trackId) => {
	try {
		const snapshot = await trackScansRef(userId, trackId).get();
		if (snapshot.empty) {
			return [];
		}

		const scans = snapshot.docs.map((doc) => {
			const data = doc.data();

			if (data.createdAt && data.createdAt.toDate) {
				data.createdAt = data.createdAt.toDate();
			}

			return data;
		});

		return scans;
	} catch (err) {
		console.error("Error finding scans:", err);
		return false;
	}
};

const postScan = async (userId, trackId, image) => {
	try {
		const result = await predict(image);
		if (!result) {
			return false;
		}

		const trackScanId = generateId();

		const imageUploadResult = await storeScanImage(trackScanId, image);
		if (!imageUploadResult) {
			return false;
		}

		const trackScanData = {
			id: trackScanId,
			image: imageUploadResult,
			result,
			createdAt: new Date()
		};

		const trackScanRef = trackScansRef(userId, trackId).doc(trackScanData.id);
		await trackScanRef.set(trackScanData);

		const userData = await findOne(userId);
		await patchOne(userId, {
			dailyScanHits: userData.dailyScanHits + 1,
			lastScan: new Date()
		});

		return result;
	} catch (err) {
		console.error("Error posting scan in track:", err);
		return false;
	}
};

module.exports = { findMany, create, deleteOne, getScans, postScan };
