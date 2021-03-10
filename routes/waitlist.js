const express = require("express");
const isAuth = require("../middleware/isAuth");

const waitlistController = require("../controllers/waitlist");

const router = express.Router();

router.get("/view/:restaurantId/waitlist", waitlistController.getWaitlist);

router.post("/add", isAuth, waitlistController.addWaitlist);

router.post("/book/:waitlistId", waitlistController.addReservation);

router.delete("/delete/:waitlistId", isAuth, waitlistController.deleteWaitlist)

router.delete("/delete/:waitlistId/:reservationId", waitlistController.deleteReservation)

module.exports = router;