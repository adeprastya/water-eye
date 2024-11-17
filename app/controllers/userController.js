const getUser = (req, res) => {
	res.send("GET, User ID: " + req.params.userId);
};

const patchUser = (req, res) => {
	res.send("PATCH, User ID: " + req.params.userId);
};

const deleteUser = (req, res) => {
	res.send("DELETE, User ID: " + req.params.userId);
};

module.exports = { getUser, patchUser, deleteUser };
