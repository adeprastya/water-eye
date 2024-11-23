const express = require("express");
const router = express.Router();

const { getUser, patchUser, deleteUser } = require("../controllers/userController");
const { getScans, postScans } = require("../controllers/scansController");
const authMiddleware = require("../middlewares/authMiddleware");

// User Routes
router
	.route("/:userId")
	.get(authMiddleware, getUser)
	.patch(authMiddleware, patchUser)
	.delete(authMiddleware, deleteUser);

// Scans Routes
router.route("/scans").get(authMiddleware, getScans).post(authMiddleware, postScans);

module.exports = router;
