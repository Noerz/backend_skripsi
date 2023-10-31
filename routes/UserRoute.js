// const express = require('express');
const { getUsers, createUser, updateUser, deleteUser } = require('../controller/UserController');
const{isUser, isAdmin} = require('../middleware/VerifyAuth');
const { verifyToken } = require('../middleware/VerifyAuth');

// const router = express.Router();

// router.get('/users', getUsers);

const userRoutes = (router) => {
    router.get('/users' ,getUsers);
    router.post('/users', createUser);
    router.patch('/users', updateUser);
    router.delete('/users', deleteUser);
}


module.exports = { userRoutes };