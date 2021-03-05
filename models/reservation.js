const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    position: {
        type: Number,
        required: true
    },
    time: {
        type: Number,
        // set time of booking 
        default: Date.now
    },
    expire: {
        type: Number,
        required: true
    },
    waitlist: {
        type: Schema.Types.ObjectId,
        ref: "Waitlist",
        required: true
    }
})

module.exports = mongoose.model("Reservation", reservationSchema);