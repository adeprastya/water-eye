const express = require("express");

const router = express.Router();

const { getUser, patchUser, deleteUser, upgradeUser } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

router
	.route("/:userId")
	.get(authMiddleware, getUser)
	.patch(authMiddleware, patchUser)
	.delete(authMiddleware, deleteUser);

router.route("/:userId/upgrade").patch(authMiddleware, upgradeUser);

module.exports = router;
