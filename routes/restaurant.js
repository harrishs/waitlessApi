const express = require("express");
const isAuth = require("../middleware/isAuth");

const restaurantController = require("../controllers/restaurant");

const router = express.Router();

router.get("/:restaurantId/menus", restaurantController.getMenus);

router.get("/:menuId", restaurantController.getMenu);

router.get("/:itemId", restaurantController.getItem);

router.post("/:restaurantId/addMenu", isAuth, restaurantController.postAddMenu);

router.post("/:menuId/addItem", isAuth, restaurantController.postAddItem);

router.put("/:menuId/:itemId/edit", isAuth, restaurantController.putEditItem);

router.delete("/:menuId/delete", isAuth, restaurantController.deleteMenu);

router.delete("/:menuId/:itemId/delete", isAuth, restaurantController.deleteItem);

module.exports = router;