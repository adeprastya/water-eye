const { usersRef } = require("../config/firestore");
const { generateId, hashPassword } = require("../utils/commonHelper");

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

		const userCreated = await usersRef.add(newUser);

		return userCreated.id;
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

	return false;
};

const findByEmail = async (email) => {
	// Thessa
	// TODO: Cari data berdasarkan email di database
	// input: email
	// output: Jika ada kembalikan data, jika tidak kembalikan false

	return false;
};

const findOne = async (id) => {
	// Iskandar
	// TODO: Cari data berdasarkan id di database
	// input: id
	// output: Jika ada kembalikan data, jika tidak kembalikan false

	return false;
};

const patchOne = async (id) => {
	// Thessa
	// TODO: Update data user di database berdasarkan id
	// input: id
	// output: Jika berhasil kembalikan data, jika gagal kembalikan false

	return false;
};

const deleteOne = async (id) => {
	// Zacky
	// TODO: Hapus data user di database berdasarkan id
	// input: id
	// output: Jika berhasil kembalikan true, jika gagal kembalikan false

	return true;
};

const signin = async (email, password) => {
	// Iskandar
	// TODO: Cari dan verifikasi email dan password di database
	// input: email, password
	// output: Jika valid kembalikan true, jika tidak kembalikan false

	return true;
};

module.exports = { findEmail, findByEmail, findOne, patchOne, deleteOne, create, signin };
