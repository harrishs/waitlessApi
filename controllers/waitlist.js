const Restaurant = require("../models/restaurant");
const Reservation = require("../models/reservation");
const Waitlist = require("../models/waitlist");
const restaurant = require("../models/restaurant");

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

exports.addWaitlist = (req, res, next) => {
    const restaurantId = req.userId;
    const name = req.body.name;
    const time = req.body.time;

    Restaurant.findById(restaurantId)
    .then(restaurant => {
        if (restaurant.waitlist){
            res.status(401).json({messsage: "Waitlist already exists for this restaurant"});
        } else {
            const waitlist = new Waitlist({
                name,
                time,
                restaurant: restaurantId
            });
            waitlist.save()
            .then(result => {
                restaurant.waitlist = waitlist;
                restaurant.save()
                .then(res.status(200).json({result}))
                .catch(err => res.status(401).json({err}));
            }).catch(err => res.status(400).json({err: err}));
        }
    })
}

exports.addReservation = (req, res, next) => {
    const waitlistId = req.params.waitlistId;
    const name = req.body.name;
    const size = req.body.size;
    const position = req.body.position;
    const expire = req.body.expire;

    Waitlist.findById(waitlistId)
    .then(waitlist => {
        const reservation = new Reservation({
            name,
            size,
            position,
            expire,
            waitlist: waitlistId
        });
        reservation.save()
        .then(res => res.status(200).json({reservation}))
        .catch(err => res.status(401).json({err}));
    }).catch(err => res.status(400).json({err: err}));
}

exports.deleteWaitlist = (req, res, next) => {
    const waitlistId = req.params.waitlistId;
    const restaurantId = req.userId;
    Waitlist.findByIdAndDelete(waitlistId)
    .then(() => Restaurant.findById(restaurantId))
    .then(restaurant => {
        restaurant.waitlist = null;
        return restaurant.save();
    }).then(() => res.status(200).json({item: "Item successfully deleted!"}))
    .catch(err => res.status(400).json({err: err}));
}

exports.deleteReservation = (req, res, next) => {
    const reservationId = req.params.reservationId;
    const waitlistId = req.params.waitlistId;
    Reservation.findByIdAndDelete(reservationId)
    .then(() => Waitlist.findById(waitlistId))
    .then(waitlist => {
        waitlist.reservations.pull(reservationId);
        return waitlist.save();
    }).then(() => res.status(200).json({item: "Item successfully deleted!"}))
    .catch(err => res.status(400).json({err: err}));
}