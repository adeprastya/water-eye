const express = require("express");
const multer = require("multer");

const router = express.Router();
const upload = multer();

const { getUser, patchUser, deleteUser, upgradeUser } = require("../controllers/userController");
const { getScans, postScans } = require("../controllers/scansController");
const authMiddleware = require("../middlewares/authMiddleware");
const pointsMiddleware = require("../middlewares/pointsMiddleware");

// User Routes
router
	.route("/:userId")
	.get(authMiddleware, getUser)
	.patch(authMiddleware, patchUser)
	.delete(authMiddleware, deleteUser);

// Scans Routes
router
	.route("/:userId/scans")
	.get(authMiddleware, getScans)
	.post(authMiddleware, pointsMiddleware, upload.single("image"), postScans);

router.route("/:userId/upgrade").patch(authMiddleware, upgradeUser);

module.exports = router;
