const express = require("express");
const multer = require("multer");

const router = express.Router();
const upload = multer();

const { getScans, postScan } = require("../controllers/scanController");
const authMiddleware = require("../middlewares/authMiddleware");
const scanLimitMiddleware = require("../middlewares/scanLimitMiddleware");

router
	.route("/:userId/scans")
	.get(authMiddleware, getScans)
	.post(authMiddleware, scanLimitMiddleware, upload.single("image"), postScan);

module.exports = router;
