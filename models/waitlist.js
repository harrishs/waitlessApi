const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const waitlistSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    reservations: [{
        type: Schema.Types.ObjectId,
        ref: "Reservation"
    }],
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    }
})

module.exports = mongoose.model("Waitlist", waitlistSchema);