const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const port = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.json());
app.use(cors());

const authRoutes = require("./routes/auth");
const restaurantRoutes = require("./routes/restaurant");

app.use("/auth", authRoutes);
app.use("/restaurant", restaurantRoutes);

mongoose.connect(process.env.DB_URL)
.then(result => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
        console.log(`Server is listening on port: ${PORT}`);
    });
})
