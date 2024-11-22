const { Firestore } = require("@google-cloud/firestore");
const { GCP_PROJECT_ID, serviceAccountPath } = require("../config/googleCloud");

try {
	const firestore = new Firestore({
		projectId: GCP_PROJECT_ID,
		keyFilename: serviceAccountPath
	});

	const usersRef = firestore.collection("users");

	module.exports = { firestore, usersRef };
} catch (err) {
	console.error("Error initializing Firestore:", err.message);
	throw new Error("Firestore initialization failed");
}
