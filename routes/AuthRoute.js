// const express = require('express');
const { Register, login, resetPassword } = require('../controller/AuthController');
const { getProfile, updateProfile,changePassword } = require('../controller/ProfileController');
const { isAdmin, isUser,verifyToken } = require('../middleware/VerifyAuth');


// const router = express.Router();

// router.get('/users', getUsers);

const authRoutes = (router) => {
    router.post('/register', Register);
    router.post('/login', login);
    router.patch('/reset',resetPassword);
    router.get('/profile', verifyToken, getProfile);
    router.patch('/profile',verifyToken,updateProfile);
    router.patch('/change-password', verifyToken, changePassword);

}


module.exports = { authRoutes };