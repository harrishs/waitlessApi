const Restaurant = require("../models/restaurant");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const salt = 12;

exports.postRegister = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const address = req.body.address;
    const longitude = req.body.longitude;
    const latitude = req.body.latitude;
    bcrypt.hash(password, salt)
    .then(hashedPass => {
        const restaurant = new Restaurant({
            email,
            password: hashedPass,
            name,
            address,
            longitude,
            latitude
        });
        restaurant.save()
        .then(result => {
            const token = jwt.sign({
                email: result.email,
                userId: result._id
            }, process.env.JWT_KEY, {expiresIn: "1h"});
            res.status(200).json({token, userId: result._id, message: "User Created"});
        }).catch(err => res.status(404).json({err}));
    }).catch(err => res.status(400).json({err}));
}

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedRestaurant;
    Restaurant.findOne({email})
    .then(restaurant => {
        if (!restaurant){
            res.status(404).json({err: "A user with this email was not found."})
        }
        loadedRestaurant = restaurant;
        bcrypt.compare(password, loadedRestaurant.password)
        .then(isEqual => {
            //if password does not match stored hash
            if (!isEqual) {
                res.status(404).json({err: "Password is incorrect."})
            }
            const token = jwt.sign({
                email: loadedRestaurant.email,
                userId: loadedRestaurant._id
            }, process.env.JWT_KEY);
            res.status(200).json({token, userId: loadedRestaurant._id});
        }).catch(err => res.status(400).json({err: err}));
    })
}