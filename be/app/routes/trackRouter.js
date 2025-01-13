const express = require("express");
const multer = require("multer");

const router = express.Router();
const upload = multer();

const { getTrack, postTrack, deleteTrack, getScanTrack, postScanTrack } = require("../controllers/trackController");
const authMiddleware = require("../middlewares/authMiddleware");
const scanLimitMiddleware = require("../middlewares/scanLimitMiddleware");

router.route("/:userId/track").get(authMiddleware, getTrack).post(authMiddleware, postTrack);

router
	.route("/:userId/track/:trackId")
	.delete(authMiddleware, deleteTrack)
	.get(authMiddleware, getScanTrack)
	.post(authMiddleware, scanLimitMiddleware, upload.single("image"), postScanTrack);

module.exports = router;
