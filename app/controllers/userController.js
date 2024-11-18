const userModel = require("../models/userModel");

const getUser = async (req, res) => {
	const data = await userModel.findOne(req.params.userId);

	if (!data) {
		return res.status(500).send(JSON.stringify({ status: "error", message: "Error getting user" }));
	}

	return res.status(200).send(JSON.stringify({ status: "success", message: "User retrieved successfully", data }));
};

const patchUser = async (req, res) => {
	const data = await userModel.patchOne(req.params.userId);

	if (!data) {
		return res.status(500).send(JSON.stringify({ status: "error", message: "Error updating user" }));
	}

	return res.status(200).send(JSON.stringify({ status: "success", message: "User updated successfully", data }));
};

const deleteUser = (req, res) => {
	const result = userModel.deleteOne(req.params.userId);

	if (!result) {
		return res.status(500).send(JSON.stringify({ status: "error", message: "Error deleting user" }));
	}

	return res.status(200).send(JSON.stringify({ status: "success", message: "User deleted successfully" }));
};

module.exports = { getUser, patchUser, deleteUser };
