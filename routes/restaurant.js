const express = require("express");
const isAuth = require("../middleware/isAuth");

const restaurantController = require("../controllers/restaurant");

const router = express.Router();

router.get("/:restaurantId/menus", restaurantController.getMenus);

router.get("/menus/:menuId", restaurantController.getMenu);

router.get("/items/:itemId", restaurantController.getItem);

router.post("/:restaurantId/addMenu", isAuth, restaurantController.postAddMenu);

router.post("/menus/:menuId/addItem", isAuth, restaurantController.postAddItem);

router.put("/items/:menuId/:itemId/edit", isAuth, restaurantController.putEditItem);

router.delete("/menus/:menuId/delete", isAuth, restaurantController.deleteMenu);

router.delete("/items/:menuId/:itemId/delete", isAuth, restaurantController.deleteItem);

module.exports = router;