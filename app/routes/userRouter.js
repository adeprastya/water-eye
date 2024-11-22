const express = require("express");
const router = express.Router();

const { getUser, patchUser, deleteUser } = require("../controllers/userController");
const { getScans, postScans } = require("../controllers/scansController");
const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware);

// User Routes
router.route("/:userId").get(getUser).patch(patchUser).delete(deleteUser);

// Scans Routes
router.route("/:userId/scans").get(getScans).post(postScans);

module.exports = router;
