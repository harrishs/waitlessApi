const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwToken = process.env.JWT_KEY;

const isAuth = (req, res, next) => {
    const token = req.get("X-Auth-Token");
    if (!token) {
        return res.status(401).json({ error: "No token, auth failed" });
    }
    try {
        const check = jwt.verify(token, jwToken);
        req.userId = check.userId;
        next();
    } catch (err) {
        res.status(400).json({ error: "Token not valid" });
    }
}

module.exports = isAuth;