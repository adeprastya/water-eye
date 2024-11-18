const getHistories = async (userId) => {
	// Thessa
	// TODO: Ambil data scan dari database berdasarkan user id
	// input: user id
	// output: Jika ada kembalikan data, jika tidak kembalikan false

	return [];
};

const postScan = async (userId, image) => {
	// Ade
	// TODO: Olah gambar ke service ai, lalu simpan hasil dan input ke database, simpan gambar ke storage
	// input: user id, image
	// output: Jika berhasil kembalikan result dari hasil pengolahan ai, jika gagal kembalikan false

	return {};
};

module.exports = { getHistories, postScan };
