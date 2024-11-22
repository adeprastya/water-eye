const Joi = require("joi");

const validateRegisterData = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().min(6).required(),
		name: Joi.string()
			.pattern(/^[a-zA-Z\s]{2,}$/)
			.required(),
		picture: Joi.string().uri().optional()
	});

	const { error } = schema.validate(data);
	if (error) {
		console.error("Validation failed:", error.message);
		return false;
	}

	return true;
};

const validateSigninData = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().min(6).required()
	});

	const { error } = schema.validate(data);
	if (error) {
		console.error("Validation failed:", error.message);
		return false;
	}

	return true;
};

const validateScanImage = (image) => {
	const schema = Joi.alternatives().try(
		Joi.string().pattern(/^data:image\/(jpeg|png|gif|bmp|webp);base64,[A-Za-z0-9+/=]+$/),
		Joi.binary().max(5 * 1024 * 1024) // Max 5MB
	);

	const { error } = schema.validate(image);
	if (error) {
		console.error("Validation failed:", error.message);
		return false;
	}

	return true;
};

module.exports = {
	validateRegisterData,
	validateSigninData,
	validateScanImage
};
