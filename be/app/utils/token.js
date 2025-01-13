const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

if (!SECRET_KEY) {
	throw new Error("Secret key is not defined");
}

const generateToken = (id) => {
	const token = jwt.sign({ id }, SECRET_KEY, { algorithm: "HS256", expiresIn: "1h" });
	if (!token) {
		return false;
	}

	return token;
};

const decodeToken = (token) => {
	const result = jwt.verify(token, SECRET_KEY);
	if (!result || !result.id) {
		return false;
	}

	return result.id;
};

module.exports = { generateToken, decodeToken };
