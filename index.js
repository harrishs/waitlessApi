const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const authRoutes = require("./routes/auth");

app.use("/auth", authRoutes);

app.listen(8080);