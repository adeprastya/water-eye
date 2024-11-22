const userModel = require("../models/userModel");

const getUser = async (req, res) => {
	const data = await userModel.findOne(req.params.userId);
	if (!data) {
		return res.status(500).send(JSON.stringify({ status: "error", message: "Error getting user" }));
	}

	return res.status(200).send(JSON.stringify({ status: "success", message: "User retrieved successfully", data }));
};

const patchUser = async (req, res) => {
	try {
		const { userId } = req.params;
		const updateData = req.body;
		if (!updateData || typeof updateData !== "object" || Object.keys(updateData).length === 0) {
			return res.status(400).json({ status: "error", message: "Invalid or empty update data" });
		}

		const data = await userModel.patchOne(userId, updateData);
		if (!data) {
			return res.status(404).json({ status: "error", message: "User not found or update failed" });
		}

		return res.status(200).json({ status: "success", message: "User updated successfully", data });
	} catch (err) {
		console.error("Error in patchUser controller:", err);
		return res.status(500).json({ status: "error", message: "Internal server error" });
	}
};

const deleteUser = async (req, res) => {
	const result = await userModel.deleteOne(req.params.userId);
	if (!result) {
		return res.status(500).send(JSON.stringify({ status: "error", message: "Error deleting user" }));
	}

	return res.status(200).send(JSON.stringify({ status: "success", message: "User deleted successfully" }));
};

module.exports = { getUser, patchUser, deleteUser };
