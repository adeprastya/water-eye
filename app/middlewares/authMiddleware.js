const { decodeToken } = require("../utils/token");

const authMiddleware = (req, res, next) => {
	const { userId } = req.params;

	const token = req.headers.authorization?.split(" ")[1];
	if (!token) {
		return res.status(401).send(JSON.stringify({ status: "error", message: "User Unauthenticated" }));
	}

	const payloadId = decodeToken(token);
	if (!payloadId) {
		return res.status(401).send(JSON.stringify({ status: "error", message: "User Unauthenticated" }));
	}

	const isAuthorized = userId == payloadId;
	if (!isAuthorized) {
		return res.status(403).send(JSON.stringify({ status: "error", message: "User Unauthorized" }));
	}

	next();
};

module.exports = authMiddleware;
