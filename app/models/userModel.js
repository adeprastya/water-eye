const { usersRef } = require("../config/firestore");
const { generateId, hashPassword, verifyPassword } = require("../utils/commonHelper");

const create = async ({ email, password, name, picture }) => {
	// Ade

	try {
		const newUser = {
			id: generateId(),
			email,
			password: await hashPassword(password),
			name,
			picture: picture || "",
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
	// Zacky
	// TODO: Cari email di database
	// input: email
	// output: Jika ada kembalikan true, jika tidak kembalikan false

	try {
		const snapshot = await usersRef.where("email", "==", email).get();

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
	// Thessa
	// TODO: Cari data berdasarkan email di database
	// input: email
	// output: Jika ada kembalikan data, jika tidak kembalikan false

	try {
		const querySnapshot = await usersRef.where("email", "==", email).get();

		if (querySnapshot.empty) {
			return false;
		}

		const userData = querySnapshot.docs[0].data();
		userData.id = querySnapshot.docs[0].id;
		return userData;
	} catch (err) {
		console.error("Error finding user by email:", err);
		return false;
	}
};

const findOne = async (id) => {
	// Iskandar
	// TODO: Cari data berdasarkan id di database
	// input: id
	// output: Jika ada kembalikan data, jika tidak kembalikan false

	try {
		const userDoc = await usersRef.doc(id).get();

		if (!userDoc.exists) {
			return false;
		}

		const userData = userDoc.data();
		userData.id = userDoc.id; // Tambahkan id ke data yang dikembalikan
		return userData;
	} catch (err) {
		console.error("Error finding user by id:", err);
		return false;
	}
};

const patchOne = async (id, updateData) => {
	// Thessa
	// TODO: Update data user di database berdasarkan id
	// input: id
	// output: Jika berhasil kembalikan data, jika gagal kembalikan false

	try {
		if (!id || typeof id !== "string") {
			console.error("Invalid ID.");
			return false;
		}

		if (!updateData || typeof updateData !== "object" || Object.keys(updateData).length === 0) {
			console.error("Invalid updateData. Must be a non-empty object.");
			return false;
		}

		const userDoc = usersRef.doc(id);

		const docSnapshot = await userDoc.get();
		if (!docSnapshot.exists) {
			console.error(`User with ID ${id} does not exist.`);
			return false;
		}

		updateData.updatedAt = new Date();

		await userDoc.update(updateData);

		const updatedDoc = await userDoc.get();
		const updatedData = updatedDoc.data();
		updatedData.id = updatedDoc.id;

		return updatedData;
	} catch (err) {
		console.error("Error updating user in patchOne:", err);
		return false;
	}
};

const deleteOne = async (id) => {
	// Zacky
	// TODO: Hapus data user di database berdasarkan id
	// input: id
	// output: Jika berhasil kembalikan true, jika gagal kembalikan false

	try {
		const userDoc = await usersRef.doc(id).get();
		if (!userDoc.exists) {
			console.log(`User with id ${id} does not exist.`);
			return false;
		}

		await usersRef.doc(id).delete();

		console.log(`User with id ${id} deleted successfully.`);
		return true;
	} catch (err) {
		console.error("Error deleting user:", err);
		return false;
	}
};

const signin = async (email, password) => {
	// Iskandar
	// TODO: Cari dan verifikasi email dan password di database
	// input: email, password
	// output: Jika valid kembalikan true, jika tidak kembalikan false

	try {
		const querySnapshot = await usersRef.where("email", "==", email).get();

		if (querySnapshot.empty) {
			console.error("Email not found.");
			return false;
		}

		const userDoc = querySnapshot.docs[0];
		const userData = userDoc.data();

		const isPasswordValid = await verifyPassword(password, userData.password);
		if (!isPasswordValid) {
			console.error("Invalid password.");
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
