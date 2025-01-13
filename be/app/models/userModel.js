const { usersRef, deleteRecursive } = require("../services/firestore");
const { generateId, hashPassword, verifyPassword } = require("../utils/commonHelper");

const create = async ({ email, password, name }) => {
	try {
		const newUser = {
			id: generateId(),
			email,
			password: await hashPassword(password),
			name,
			dailyScanHits: 0,
			lastScan: new Date(),
			isPremium: false,
			createdAt: new Date(),
			updatedAt: new Date()
		};

		const userRef = usersRef.doc(newUser.id);
		await userRef.set(newUser);

		return newUser.id;
	} catch (err) {
		console.error("Error creating user:", err);
		return false;
	}
};

const findEmail = async (email) => {
	try {
		const snapshot = await usersRef.where("email", "==", email).limit(1).get();
		if (!snapshot.empty) {
			return true;
		}

		return false;
	} catch (err) {
		console.error("Error finding email:", err);
		return false;
	}
};

const findByEmail = async (email) => {
	try {
		const querySnapshot = await usersRef.where("email", "==", email).limit(1).get();
		if (querySnapshot.empty) {
			return false;
		}

		const userData = querySnapshot.docs[0].data();

		if (userData.createdAt && userData.createdAt.toDate) {
			userData.createdAt = userData.createdAt.toDate();
		}
		if (userData.updatedAt && userData.updatedAt.toDate) {
			userData.updatedAt = userData.updatedAt.toDate();
		}

		return userData;
	} catch (err) {
		console.error("Error finding user by email:", err);
		return false;
	}
};

const findOne = async (id) => {
	try {
		const userDoc = await usersRef.doc(id).get();
		if (!userDoc.exists) {
			return false;
		}

		const userData = userDoc.data();

		if (userData.createdAt && userData.createdAt.toDate) {
			userData.createdAt = userData.createdAt.toDate();
		}
		if (userData.updatedAt && userData.updatedAt.toDate) {
			userData.updatedAt = userData.updatedAt.toDate();
		}

		return userData;
	} catch (err) {
		console.error("Error finding user by id:", err);
		return false;
	}
};

const patchOne = async (id, updateData) => {
	try {
		const userDoc = usersRef.doc(id);

		const docSnapshot = await userDoc.get();
		if (!docSnapshot.exists) {
			return false;
		}

		updateData.updatedAt = new Date();
		await userDoc.update(updateData);

		const updatedDoc = await findOne(id);

		return updatedDoc;
	} catch (err) {
		console.error("Error updating user:", err);
		return false;
	}
};

const deleteOne = async (id) => {
	try {
		const userRef = await usersRef.doc(id);
		const userDoc = await userRef.get();
		if (!userDoc.exists) {
			return false;
		}

		await deleteRecursive(userRef);

		return true;
	} catch (err) {
		console.error("Error deleting user:", err);
		return false;
	}
};

const signin = async (email, password) => {
	try {
		const querySnapshot = await usersRef.where("email", "==", email).get();
		if (querySnapshot.empty) {
			return false;
		}

		const userDoc = querySnapshot.docs[0];
		const userData = userDoc.data();

		const isPasswordValid = await verifyPassword(password, userData.password);
		if (!isPasswordValid) {
			return false;
		}

		return {
			id: userDoc.id,
			name: userData.name,
			email: userData.email,
			picture: userData.picture
		};
	} catch (err) {
		console.error("Error signing in:", err);
		return false;
	}
};

module.exports = {
	findEmail,
	findByEmail,
	findOne,
	patchOne,
	deleteOne,
	create,
	signin
};
