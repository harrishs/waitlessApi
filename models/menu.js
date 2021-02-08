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
    items: [
            {
                itemId: {type: Schema.Types.ObjectId, required: true, ref: "Item"}, 
                inStock: {type: Boolean, default: true}
            }
        ],
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    }
})

module.exports = mongoose.model("Menu", menuSchema);