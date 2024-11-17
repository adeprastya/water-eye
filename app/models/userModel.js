const create = async ({ email, password, name, picture }) => {
	// TODO: Masukan data user ke database
	// input: { email, password, name, picture }
	// output: Jika berhasil kembalikan true, jika gagal kembalikan false

	return true;
};

const findEmail = async (email) => {
	// TODO: Cari email di database
	// input: email
	// output: Jika ada kembalikan true, jika tidak kembalikan false

	return false;
};

const findByEmail = async (email) => {
	// TODO: Cari data berdasarkan email di database
	// input: email
	// output: Jika ada kembalikan data, jika tidak kembalikan false

	return false;
};

const findOne = async (id) => {
	// TODO: Cari data berdasarkan id di database
	// input: id
	// output: Jika ada kembalikan data, jika tidak kembalikan false

	return false;
};

const patchOne = async (id) => {
	// TODO: Update data user di database berdasarkan id
	// input: id
	// output: Jika berhasil kembalikan data, jika gagal kembalikan false

	return false;
};

const deleteOne = async (id) => {
	// TODO: Hapus data user di database berdasarkan id
	// input: id
	// output: Jika berhasil kembalikan true, jika gagal kembalikan false

	return true;
};

const signin = async (email, password) => {
	// TODO: Cari dan verifikasi email dan password di database
	// input: email, password
	// output: Jika valid kembalikan true, jika tidak kembalikan false

	return true;
};

module.exports = { findEmail, findByEmail, findOne, patchOne, deleteOne, create, signin };
