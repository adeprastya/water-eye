const validateRegisterData = (data) => {
	// Zacky
	// TODO: Validasi field yang diperlukan { email, password, name, picture }, dan format data sesuai
	// input: req.body
	// output: Jika valid kembalikan true, jika tidak kembalikan false

	try {
        const { email, password, name, picture } = data;

        if (!email || !password || !name) {
            console.error("Validation failed: Missing required fields");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.error("Validation failed: Invalid email format");
            return false;
        }

        if (password.length < 6) {
            console.error("Validation failed: Password must be at least 6 characters long");
            return false;
        }

        const nameRegex = /^[a-zA-Z\s]{2,}$/;
        if (!nameRegex.test(name)) {
            console.error("Validation failed: Invalid name format");
            return false;
        }

        if (picture) {
            const urlRegex = /^(https?:\/\/[^\s$.?#].[^\s]*)$/;
            if (!urlRegex.test(picture)) {
                console.error("Validation failed: Invalid picture URL");
                return false;
            }
        }
		
		 return true;
	 } catch (err) {
		 console.error("Error during validation:", err);
		 return false;
	 }

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
