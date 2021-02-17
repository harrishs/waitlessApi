const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const menuSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    items: [{
        type: Schema.Types.ObjectId,
        ref: "Item"
    }],
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    }
})

module.exports = mongoose.model("Menu", menuSchema);