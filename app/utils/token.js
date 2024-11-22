const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

if (!SECRET_KEY) {
	throw new Error("Secret key is not defined");
}

const generateToken = (id) => {
	try {
		const token = jwt.sign({ id }, SECRET_KEY, { algorithm: "HS256", expiresIn: "1h" });

		return token;
	} catch (err) {
		console.error("Error generating token:", err.message);
		return false;
	}
};

const decodeToken = (token) => {
	try {
		const result = jwt.verify(token, SECRET_KEY);
		if (!result || !result.id) {
			throw new Error("Invalid token or payload");
		}

		return result.id;
	} catch (err) {
		console.error("Error decoding token:", err.message);
		return false;
	}
};

module.exports = { generateToken, decodeToken };
