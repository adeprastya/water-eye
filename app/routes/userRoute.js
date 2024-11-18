const express = require("express");
const router = express.Router();

const { getUser, patchUser, deleteUser } = require("../controllers/userController");
const { getScans, postScans } = require("../controllers/scansController");

// User Route
router.get("/:userId", getUser).patch("/:userId", patchUser).delete("/:userId", deleteUser);

// Scans Route
router.get("/:userId/scans", getScans).post("/:userId/scans", postScans);

module.exports = router;
