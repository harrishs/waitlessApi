const express = require("express");
const isAuth = require("../middleware/isAuth");

const restaurantController = require("../controllers/restaurant");

const router = express.Router();

router.get("/:restaurantId/menus", restaurantController.getMenus);

router.get("/:menuId", restaurantController.getMenu);

router.post("/:restaurantId/addMenu", isAuth, restaurantController.postAddMenu);

router.post("/:menuId/addItem", isAuth, restaurantController.postAddItem);

router.put("/:menuId/edit/:itemId", isAuth, restaurantController.putEditItem);

router.delete("/menu/delete/:itemId", isAuth, restaurantController.deleteItem);

module.exports = router;