const sendError = require("../utils/sendError");
const { decodeToken } = require("../utils/token");

const authMiddleware = (req, res, next) => {
	const { userId } = req.params;

	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return sendError(res, 401, "User Unauthenticated");
	}

	const token = authHeader.split(" ")[1];

	let payloadId;
	try {
		payloadId = decodeToken(token);
	} catch (err) {
		return sendError(res, 401, "Invalid or Malformed Token");
	}

	if (!payloadId) {
		return sendError(res, 401, "User Unauthenticated");
	}

	if (userId !== payloadId) {
		return sendError(res, 403, "User Unauthorized");
	}

	next();
};

module.exports = authMiddleware;
