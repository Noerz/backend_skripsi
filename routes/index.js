const express = require('express');
const { userRoutes } = require("./UserRoute");
const{authRoutes} = require("./AuthRoute");

const router = express.Router();

userRoutes(router);
authRoutes(router);

module.exports = router;