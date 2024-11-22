const { Firestore } = require("@google-cloud/firestore");
const { GCP_PROJECT_ID, serviceAccountPath } = require("../config/googleCloud");

const firestore = new Firestore({
	projectId: GCP_PROJECT_ID,
	keyFilename: serviceAccountPath
});

const usersRef = firestore.collection("users");

module.exports = { firestore, usersRef };
