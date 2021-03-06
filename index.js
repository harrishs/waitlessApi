const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const port = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());     
app.use(cors());

const authRoutes = require("./routes/auth");
const restaurantRoutes = require("./routes/restaurant");
const waitlistRoutes = require("./routes/waitlist");

app.use("/auth", authRoutes);
app.use("/restaurant", restaurantRoutes);
app.use("/waitlist", waitlistRoutes);

mongoose.connect(process.env.MONGO,  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
.then(result => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
        console.log(`Server is listening on port: ${port}`);
    });
})
