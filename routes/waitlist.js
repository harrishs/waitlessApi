const express = require("express");

const waitlistController = require("../controllers/waitlist");

const router = express.Router();

router.get("/:restaurantId/waitlist", waitlistController.getWaitlist);

module.exports = router;