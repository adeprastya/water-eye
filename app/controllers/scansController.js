const getScans = (req, res) => {
	res.send("GET, User ID: " + req.params.userId + " Scans History");
};

const postScans = (req, res) => {
	res.send("POST, User ID: " + req.params.userId + " Scans Post");
};

module.exports = { getScans, postScans };
