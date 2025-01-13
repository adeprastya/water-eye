const { errorResponse } = require("../utils/response");
const { decodeToken } = require("../utils/token");

const authMiddleware = (req, res, next) => {
	const userId = req.params.userId;

	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return errorResponse(res, 401, "User Unauthenticated");
	}

	const token = authHeader.split(" ")[1];

	let payloadId;
	try {
		payloadId = decodeToken(token);
	} catch (err) {
		return errorResponse(res, 401, "Invalid or Malformed Token");
	}

	if (!payloadId) {
		return errorResponse(res, 401, "User Unauthenticated");
	}

	if (userId != payloadId) {
		return errorResponse(res, 403, "User Unauthorized");
	}

	next();
};

module.exports = authMiddleware;
