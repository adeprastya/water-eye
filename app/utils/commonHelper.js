const crypto = require("crypto");
const argon2 = require("argon2");

const generateId = () => {
	try {
		const randomPart = crypto.randomBytes(16).toString("hex");
		const timestampPart = Date.now().toString(36);

		return `${randomPart}${timestampPart}`;
	} catch (err) {
		console.error("Error generating ID:", err);
		throw new Error("Error generating ID");
	}
};

const hashPassword = async (password) => {
	try {
		const hashedPassword = await argon2.hash(password);

		return hashedPassword;
	} catch (err) {
		console.error("Error hashing password:", err);
		throw new Error(`Error hashing password: ${err.message}`);
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
