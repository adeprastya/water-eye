const errorResponse = (res, statusCode = 500, message = "An error occurred") => {
	return res.status(statusCode).json({
		status: "error",
		message
	});
};

const successResponse = (res, statusCode = 200, message = "Success", data = null) => {
	const response = {
		status: "success",
		message
	};
	if (data) response.data = data;

	return res.status(statusCode).json(response);
};

module.exports = { errorResponse, successResponse };
