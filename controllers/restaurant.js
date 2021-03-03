const Menu = require("../models/menu");
const Item = require("../models/item");
const Restaurant = require("../models/restaurant");

exports.getMenus = (req, res, next) => {
    const restaurantId = req.params.restaurantId;
    Restaurant.findById(restaurantId)
    .then(restaurant => {
        menus = restaurant.menus;
        res.status(200).json({menus});
    }).catch(err => res.status(400).json({err: err}));
}

exports.getMenu = (req, res, next) => {
    const menuId = req.params.menuId;
    Menu.findById(menuId)
    .then(menu => res.status(200).json({menu}))
    .catch(err => res.status(400).json({err: err}));
}

exports.getItem = (req, res, next) => {
    const itemId = req.params.itemId;
    Item.findById(itemId)
    .then(item => res.status(200).json({item}))
    .catch(err => res.status(400).json({err}));
}

exports.postAddMenu = (req, res, next) => {
    const restaurantId = req.userId;
    const name = req.body.name;
    const description = req.body.description;
    const items = [];

    Restaurant.findById(restaurantId)
    .then(restaurant => {
        if (restaurant.menus.length >= 5){
            res.status(401).json({err: "You have reached the max number of menus"});
        } else {
            const menu = new Menu(
                {
                    name,
                    description,
                    items,
                    restaurant: restaurantId
                }
            );
            menu.save()
            .then(result => {
                restaurant.menus.push(menu);
                restaurant.save()
                .then(res.status(200).json({result}))
                .catch(err => res.status(401).json({err}));
            }).catch(err => res.status(400).json({err: err}));
        }
    })
}

exports.postAddItem = (req, res, next) => {
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const section = req.body.section;
    const menuId = req.params.menuId;

    const item = new Item(
        {
            name,
            price,
            description,
            imageUrl,
            section,
            menu: menuId
        }
    );
    item.save()
    .then(result => {
        Menu.findById(menuId)
        .then(menu => {
            menu.items.push(item);
            return menu.save();
        }).then(() => res.status(200).json({item: result}))
    }).catch(err => res.status(400).json({err: err}));
}

exports.putEditItem = (req, res, next) => {
    const itemId = req.params.itemId;
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const menuId = req.params.menuId;

    Item.findById(itemId)
    .then(item => {
        item.name = name;
        item.price = price;
        item.description = description;
        item.imageUrl = imageUrl;
        item.menu = menuId;
        return item.save()
    }).then(result => res.status(200).json({item: result}))
    .catch(err => res.status(400).json({err: err}));
}

exports.deleteMenu = (req, res, next) => {
    const menuId = req.params.menuId;
    const restaurantId = req.userId;
    Menu.findByIdAndDelete(menuId)
    .then(() => Restaurant.findById(restaurantId))
    .then(restaurant => {
        restaurant.menus.pull(menuId);
        Item.deleteMany({menu: menuId});
        return restaurant.save();
    }).then(() => res.status(200).json({item: "Item successfully deleted!"}))
    .catch(err => res.status(400).json({err}));
}

exports.deleteItem = (req, res, next) => {
    const itemId = req.params.itemId;
    const menuId = req.params.menuId;
    Item.findByIdAndDelete(itemId)
    .then(() => Menu.findById(menuId))
    .then(menu => {
        menu.items.pull(itemId);
        return menu.save();
    }).then(() => res.status(200).json({item: "Item successfully deleted!"}))
    .catch(err => res.status(400).json({err: err}));
}