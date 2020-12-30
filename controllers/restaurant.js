const Item = require("../models/item");

exports.getMenu = (req, res, next) => {
    Item.find()
    .then(items => {
        res.status(200).json({items: items});
    }).catch(err => res.status(400).json({err: err}));
}

exports.getItem = (req, res, next) => {
    const itemId = req.params.itemId;
    Item.findById(itemId)
    .then(item => res.status(200).json({item: item}))
    .catch(err => res.status(400).json({err: err}));
}

exports.postAddItem = (req, res, next) => {
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;

    const item = new Item(
        {
            name,
            price,
            description,
            imageUrl
        }
    )
    item.save()
    .then(result => {
        res.status(200).json({item: item});
    }).catch(err => res.status(400).json({err: err}));
}

exports.putEditItem = (req, res, next) => {
    const itemId = req.params.itemId;
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;

    Item.findById(itemId)
    .then(item => {
        item.name = name;
        item.price = price;
        item.description = description;
        item.imageUrl = imageUrl;
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