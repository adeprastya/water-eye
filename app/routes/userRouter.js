const express = require("express");
const multer = require("multer");

const router = express.Router();
const upload = multer();

const { getUser, patchUser, deleteUser, upgradeUser } = require("../controllers/userController");
const { getScans, postScans, compareScans } = require("../controllers/scansController");
const authMiddleware = require("../middlewares/authMiddleware");
const scanLimitMiddleware = require("../middlewares/scanLimitMiddleware");

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
	.post(authMiddleware, scanLimitMiddleware, upload.single("image"), postScans);

router.route("/:userId/upgrade").patch(authMiddleware, upgradeUser);

router.route("/:userId/compare/:scanId1/:scanId2").patch(authMiddleware, compareScans);

module.exports = router;
