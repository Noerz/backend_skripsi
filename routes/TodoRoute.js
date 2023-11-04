// const express = require('express');


const { getTodo } = require("../controller/TodoController");
const { isAdmin, isUser, verifyToken } = require("../middleware/VerifyAuth");

// const router = express.Router();

// router.get('/users', getUsers);

const todoRoutes = (router) => {
    router.get('/todo',verifyToken, getTodo);
    // router.post('/admin', isAdmin, createAdmin);
    // router.patch('/admin', isAdmin, updateAdmin);
    // router.put('/admin', isAdmin, updateAdmin);
    // router.delete('/admin', isAdmin, deleteAdmin);
}


module.exports = { todoRoutes };