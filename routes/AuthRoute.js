// const express = require('express');
const { Register } = require('../controller/AuthController');


// const router = express.Router();

// router.get('/users', getUsers);

const authRoutes = (router) => {
    router.post('/register', Register);
}


module.exports = { authRoutes };