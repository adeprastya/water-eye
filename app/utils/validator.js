const validateRegisterData = (data) => {
	// Zacky
	// TODO: Validasi field yang diperlukan { email, password, name, picture }, dan format data sesuai
	// input: req.body
	// output: Jika valid kembalikan true, jika tidak kembalikan false

	return true;
};

const validateSigninData = (data) => {
	// Iskandar
	// TODO: Validasi field yang diperlukan { email, password }, dan format data sesuai
	// input: req.body
	// output: Jika valid kembalikan true, jika tidak kembalikan false

	return true;
};

const validateScanImage = (image) => {
	// Thessa
	// TODO: Validasi data dan format image sesuai
	// input: image
	// output: Jika valid kembalikan true, jika tidak kembalikan false

	return true;
};

module.exports = { validateRegisterData, validateSigninData, validateScanImage };