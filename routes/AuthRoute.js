// const express = require('express');
const { Register, login } = require('../controller/AuthController');
const { getProfile, updateProfile } = require('../controller/ProfileController');
const { isAdmin, isUser,verifyToken } = require('../middleware/VerifyAuth');


// const router = express.Router();

// router.get('/users', getUsers);

const authRoutes = (router) => {
    router.post('/register', Register);
    router.post('/login', login);
    router.get('/profile', verifyToken, getProfile);
    router.patch('/profile',verifyToken,updateProfile)

}


module.exports = { authRoutes };