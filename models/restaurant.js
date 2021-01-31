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
    tags: Array,
    menu: {
        items: [
            {
                itemId: {type: Schema.Types.ObjectId, required: true, ref: "Item"}, 
                inStock: {type: Boolean, required: true}
            }
        ]
    }

})

module.exports = mongoose.model("Restaurant", restaurantSchema);