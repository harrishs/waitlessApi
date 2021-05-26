const express = require("express");
const isAuth = require("../middleware/isAuth");

const waitlistController = require("../controllers/waitlist");

const router = express.Router();

router.get("/:restaurantId/waitlist", waitlistController.getWaitlist);

router.post("/:restaurantId/addWaitlist", isAuth, waitlistController.addWaitlist);

router.put("/:waitlistId/update", isAuth, waitlistController.editWaitlist);

router.get("/:waitlistId/reservations", waitlistController.getReservations);

router.post("/book/:waitlistId", waitlistController.addReservation);

router.delete("/delete/:waitlistId", isAuth, waitlistController.deleteWaitlist)

router.delete("/delete/:waitlistId/reservation/:reservationId", waitlistController.deleteReservation)

module.exports = router;