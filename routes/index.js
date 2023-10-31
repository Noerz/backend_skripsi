const express = require('express');
const { userRoutes } = require("./UserRoute");
const{authRoutes} = require("./AuthRoute");
const { divisiRoutes } = require('./DivisiRoute');
const { postRoutes } = require('./PostRoute');
const { adminRoutes } = require('./AdminRoute');
const {commentRoutes}=require('./CommentRoute');


const router = express.Router();

userRoutes(router);
authRoutes(router);
divisiRoutes(router);
postRoutes(router);
adminRoutes(router);
commentRoutes(router);

module.exports = router;