const Restaurant = require("../models/restaurant");
const Reservation = require("../models/reservation");
const Waitlist = require("../models/waitlist");

exports.getWaitlist = (req, res, next) => {
    const restaurantId = req.params.restaurantId;
    Restaurant.findById(restaurantId)
    .then(restaurant => {
        if (restaurant.Waitlist){
            Waitlist.findById(restairant.Waitlist)
            .then(waitlist => res.status(200).json({waitlist}))
            .catch(err => res.status(400).json({err}));
        }
    }).catch(err => res.status(400).json({err}));
}