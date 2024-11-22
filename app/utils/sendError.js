const sendError = (res, statusCode, message) => {
	res.status(statusCode).json({
		status: "error",
		message
	});
};

module.exports = sendError;
