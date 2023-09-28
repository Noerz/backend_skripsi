// const express = require('express');
const { getUsers, createUser, updateUser, deleteUser} = require('../controller/UserController');
const verifyToken = require('../middleware/VerivyToken');

// const router = express.Router();

// router.get('/users', getUsers);

const userRoutes = (router) => {
    router.get('/users',verifyToken, getUsers);
    router.post('/users',createUser);
    router.patch('/users',updateUser);
    router.delete('/users',deleteUser);
}


module.exports = { userRoutes };