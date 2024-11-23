const express = require("express");
const multer = require("multer");

const router = express.Router();
const upload = multer();

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
router.route("/:userId/scans").get(authMiddleware, getScans).post(authMiddleware, upload.single("image"), postScans);

module.exports = router;
