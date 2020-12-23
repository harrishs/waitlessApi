const express = require("express");

const restaurantController = require("../controllers/restaurant");

const router = express.Router();

router.get("/menu", restaurantController.getMenu);

module.exports = router;