const crypto = require("crypto");
const argon2 = require("argon2");

const generateId = () => {
	const randomPart = crypto.randomBytes(16).toString("hex");
	const timestampPart = Date.now().toString(36);

	return `${randomPart}${timestampPart}`;
};

const hashPassword = async (password) => {
	try {
		const hashedPassword = await argon2.hash(password);

		return hashedPassword;
	} catch (err) {
		console.error("Error hashing password:", err);
		return false;
	}
};

const verifyPassword = async (password, hashedPassword) => {
	try {
		const isValid = await argon2.verify(hashedPassword, password);

		return isValid;
	} catch (err) {
		console.error("Error verifying password:", err);
		return false;
	}
};

module.exports = { generateId, hashPassword, verifyPassword };
