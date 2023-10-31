// const express = require('express');

const { getAdmin, createAdmin, updateAdmin, deleteAdmin } = require("../controller/AdminController");
const { isAdmin, isUser, verifyToken } = require("../middleware/VerifyAuth");

// const router = express.Router();

// router.get('/users', getUsers);

const adminRoutes = (router) => {
    router.get('/admin', verifyToken, getAdmin);
    router.post('/admin', isAdmin, createAdmin);
    router.patch('/admin', isAdmin, updateAdmin);
    router.put('/admin', isAdmin, updateAdmin);
    router.delete('/admin', isAdmin, deleteAdmin);
}


module.exports = { adminRoutes };