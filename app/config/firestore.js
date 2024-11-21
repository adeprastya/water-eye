const { Firestore } = require("@google-cloud/firestore");
const serviceAccountPath = require("../config/serviceAccount");

const firestore = new Firestore({
	keyFilename: serviceAccountPath,
	projectId: "water-eye-442016"
});

const usersRef = firestore.collection("users");

module.exports = { firestore, usersRef };
