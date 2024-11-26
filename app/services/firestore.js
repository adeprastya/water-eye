const { Firestore } = require("@google-cloud/firestore");
const { GCP_PROJECT_ID, serviceAccountPath } = require("../config/googleCloud");

const firestore = new Firestore({
	projectId: GCP_PROJECT_ID,
	keyFilename: serviceAccountPath
});

const deleteRecursive = async (docRef) => {
	try {
		const subcollections = await docRef.listCollections();

		await Promise.all(subcollections.map((subcollection) => deleteCollectionRecursive(subcollection.path)));

		await docRef.delete();
	} catch (error) {
		console.error(`Error deleting document ${docRef.path}:`, error);
	}
};

const deleteCollectionRecursive = async (collectionPath) => {
	try {
		const collectionRef = firestore.collection(collectionPath);

		const docs = await collectionRef.listDocuments();

		await Promise.all(docs.map((doc) => deleteRecursive(doc)));
	} catch (error) {
		console.error(`Error deleting collection ${collectionPath}:`, error);
	}
};

const usersRef = firestore.collection("users");

const scansRef = (userId) => usersRef.doc(userId).collection("scans");

const tracksRef = (userId) => usersRef.doc(userId).collection("tracks");

const trackScansRef = (userId, trackId) => tracksRef(userId).doc(trackId).collection("scans");

module.exports = {
	firestore,
	deleteRecursive,
	deleteCollectionRecursive,
	usersRef,
	scansRef,
	tracksRef,
	trackScansRef
};
