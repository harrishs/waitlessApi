const Menu = require("../models/menu");
const Item = require("../models/item");
const Restaurant = require("../models/restaurant");

exports.getMenus = (req, res, next) => {
    Menu.find()
    .then(menus => {
        res.status(200).json({menus});
    }).catch(err => res.status(400).json({err: err}));
}

exports.getMenu = (req, res, next) => {
    const menuId = req.params.menuId;
    Menu.findById(menuId)
    .then(menu => res.status(200).json({menu}))
    .catch(err => res.status(400).json({err: err}));
}

exports.addMenu = (req, res, next) => {
    const restaurantId = req.params.restaurantId;
    const name = req.body.name;
    const items = [];

    const menu = new Menu(
        {
            name,
            items,
            restaurantId
        }
    );
    menu.save()
    .then(result => {
        Restaurant.findById(restaurantId)
        .then(restaurant => {
            restaurant.menus.push({menu: result._id})
            .catch(err => res.status(401).json({err}));
        })}).catch(err => res.status(400).json({err: err}));
}

exports.postAddItem = (req, res, next) => {
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const menuId = req.params.menuId;

    const item = new Item(
        {
            name,
            price,
            description,
            imageUrl,
            menuId
        }
    );
    item.save()
    .then(result => {
        Menu.findById(menuId)
        .then(menu => {
            menu.items.push({itemId: result._id});
            return restaurant.save();
        }).then(() => res.status(200).json({item: result, menu: menu}))
        .catch(err => res.status(401).json({err}));
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

exports.deleteItem = (req, res, next) => {
    const itemId = req.params.itemId;
    Item.findByIdAndDelete(itemId)
    .then(result => res.status(200).json({item: "Item successfully deleted!"}))
    .catch(err => res.status(400).json({err: err}));
}