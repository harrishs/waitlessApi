const Restaurant = require("../models/restaurant");
const Reservation = require("../models/reservation");
const Waitlist = require("../models/waitlist");


exports.getWaitlist = (req, res, next) => {
    const restaurantId = req.params.restaurantId;
    Restaurant.findById(restaurantId)
    .populate("waitlist").exec((err, restaurant) => {
        if (err){
            res.status(400).json({err});
        } else if (restaurant){
            res.status(200).json({waitlist: restaurant.waitlist});
        }
    });
}

exports.addWaitlist = (req, res, next) => {
    const restaurantId = req.userId;
    const name = req.body.name;
    const time = req.body.time;
    const increment = req.body.increment;

    Restaurant.findById(restaurantId)
    .then(restaurant => {
        if (restaurant.waitlist){
            res.status(401).json({messsage: "Waitlist already exists for this restaurant"});
        } else {
            const waitlist = new Waitlist({
                name,
                time,
                restaurant: restaurantId,
                increment
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

exports.editWaitlist = (req, res, next) => {
    const waitlistId = req.params.waitlistId;
    const restaurantId = req.userId;
    const name = req.body.name;
    const time = req.body.time;

    Waitlist.findById(waitlistId)
    .then(waitlist => {
        waitlist.name = name;
        waitlist.time = time;
        waitlist.restaurant = restaurantId;
        return waitlist.save();
    }).then(result => res.status(200).json({waitlist: result}))
    .catch(err => res.status(400).json({err}));
}

exports.getReservations = (req, res, next) => {
    const waitlistId = req.params.waitlistId;

    Waitlist.findById(waitlistId)
    .populate("reservations").exec((err, waitlist) => {
        if (err){
            res.status(400).json({err});
        } else if (waitlist){
            res.status(200).json({reservations: waitlist.reservations});
        }
    });
}

exports.addReservation = (req, res, next) => {
    const waitlistId = req.params.waitlistId;
    const name = req.body.name;
    const size = req.body.size;
    const position = req.body.position;
    const expire = req.body.expire;

    const reservation = new Reservation({
        name,
        size,
        position,
        expire,
        waitlist: waitlistId
    });
    reservation.save()
    .then(result => {
        Waitlist.findById(waitlistId)
        .then(waitlist => {
            waitlist.reservations.push(reservation);
            return waitlist.save()
        }).then(() => res.status(200).json({reservation: result}))
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