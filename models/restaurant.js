const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tags: Array,
    menus: [{
        type: Schema.Types.ObjectId,
        ref: "Menu"
    }]

})

module.exports = mongoose.model("Restaurant", restaurantSchema);