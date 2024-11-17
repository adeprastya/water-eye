const authMiddleware = (req, res, next) => {
	const token = req.headers.authorization?.split(" ")[1];

	if (!token) {
		return res.status(401).send(JSON.stringify({ status: "error", message: "User Unauthenticated" }));
	}

	console.log(token);
	// TODO: Validate token with user id

	next();
};

module.exports = authMiddleware;
