const express = require("express");
const router = express.Router();

const { getUser, patchUser, deleteUser } = require("../controllers/userController");
const { getScans, postScans } = require("../controllers/scansController");
const authMiddleware = require("../middlewares/authMiddleware");

// User Route
router
	.get("/:userId", authMiddleware, getUser)
	.patch("/:userId", authMiddleware, patchUser)
	.delete("/:userId", authMiddleware, deleteUser);

// Scans Route
router.get("/:userId/scans", authMiddleware, getScans).post("/:userId/scans", authMiddleware, postScans);

module.exports = router;
