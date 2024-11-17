const validateRegisterData = (data) => {
	// TODO: Validasi field yang diperlukan { email, password, name, picture }, dan format data sesuai
	// input: req.body
	// output: Jika valid kembalikan true, jika tidak kembalikan false

	return true;
};

const validateSigninData = (data) => {
	// TODO: Validasi field yang diperlukan { email, password }, dan format data sesuai
	// input: req.body
	// output: Jika valid kembalikan true, jika tidak kembalikan false

	return true;
};

const validateScanImage = (image) => {
	// TODO: Validasi data dan format image sesuai
	// input: image
	// output: Jika valid kembalikan true, jika tidak kembalikan false

	return true;
};

module.exports = { validateRegisterData, validateSigninData, validateScanImage };
