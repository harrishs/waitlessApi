const express = require("express");

const restaurantController = require("../controllers/restaurant");

const router = express.Router();

router.get("/menus", restaurantController.getMenus);

router.get("/:menuId", restaurantController.getMenu);

router.get("/:restaurantId/addMenu", restaurantController.addMenu);

router.post("/:menuId/addItem", restaurantController.postAddItem);

router.put("/:menuId/edit/:itemId", restaurantController.putEditItem);

router.delete("/menu/delete/:itemId", restaurantController.deleteItem);

module.exports = router;