const signin = (email, password) => {
	// TODO: Find user email and password in database, and return token

	return "token";
};

const findOne = async (email) => {
	// TODO: Find user email in database

	return false;
};

const create = async ({ email, password, name, picture }) => {
	// TODO: Add user to database

	return true;
};

module.exports = { findOne, create, signin };
