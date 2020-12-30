const express = require("express");

const restaurantController = require("../controllers/restaurant");

const router = express.Router();

router.get("/menu", restaurantController.getMenu);

router.get("/menu/:itemId", restaurantController.getItem);

router.post("/menu/add", restaurantController.postAddItem);

router.put("/menu/edit/:itemId", restaurantController.putEditItem);

router.delete("/menu/delete/:itemId", restaurantController.deleteItem);

module.exports = router;