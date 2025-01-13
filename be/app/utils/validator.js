const Joi = require("joi");

const emailSchema = Joi.string().email().required();
const passwordSchema = Joi.string().min(6).required();
const nameSchema = Joi.string()
	.pattern(/^[a-zA-Z\s'-]{2,}$/)
	.required();

const validateRegisterData = (data) => {
	const schema = Joi.object({
		email: emailSchema,
		password: passwordSchema,
		name: nameSchema
	});

	const { error } = schema.validate(data);
	if (error) {
		return false;
	}

	return true;
};

const validateSigninData = (data) => {
	const schema = Joi.object({
		email: emailSchema,
		password: passwordSchema
	});

	const { error } = schema.validate(data);
	if (error) {
		return false;
	}

	return true;
};

const validatePatchUserData = (data) => {
	const schema = Joi.object({
		name: nameSchema.optional()
	});

	const { error } = schema.validate(data);
	if (error) {
		return false;
	}

	return true;
};

const validateScanImage = (image) => {
	const schema = Joi.alternatives().try(
		Joi.string().pattern(/^data:image\/(jpeg|jpg|png|bmp|webp);base64,[A-Za-z0-9+/=]+$/),
		Joi.binary().max(1024 * 1024 * 10) // images max 10MB
	);

	const { error } = schema.validate(image);
	if (error) {
		return false;
	}

	return true;
};

const validateTrackData = (data) => {
	const schema = Joi.object({
		name: nameSchema
	});

	const { error } = schema.validate(data);
	if (error) {
		return false;
	}

	return true;
};

module.exports = {
	validateRegisterData,
	validateSigninData,
	validatePatchUserData,
	validateScanImage,
	validateTrackData
};
