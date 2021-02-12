const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    },
    section: {
        type: String,
        required: true
    },
    position: {
        type: Number,
        required: true
    },
    menu: {
        type: Schema.Types.ObjectId,
        ref: "Menu",
        required: true
    }
})

module.exports = mongoose.model("Item", itemSchema);