const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const generateToken = (id) => {
	// Ade
	// TODO: Generate JWT token dengan payload id
	// input: id
	// output: JWT token
	try {
		const token = jwt.sign({ id }, SECRET_KEY, { algorithm: "RS256", expiresIn: "1h" });
		return token;
	} catch (err) {
		console.log(err);
		return false;
	}
};

const decodeToken = (token) => {
	// Ade
	// TODO: Decode JWT token dan kembalikan user id
	// input: JWT token
	// output: user id
	try {
		const result = jwt.verify(token, SECRET_KEY);

		if (!result.id) {
			throw new Error("Invalid token");
		}

		return result.id;
	} catch (err) {
		console.error("Error decoding token:", err.message);
		return false;
	}
};

module.exports = { generateToken, decodeToken };
