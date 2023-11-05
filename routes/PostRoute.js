// const express = require('express');
const {getPost,createPost, updatePost, deletePost } = require('../controller/PostController');
const { verifyToken } = require('../middleware/VerifyAuth');
const { isAdmin } = require("../middleware/VerifyAuth");

// const router = express.Router();

// router.get('/users', getUsers);

const postRoutes = (router) => {
    router.get('/posts',verifyToken, getPost);
    router.post('/posts',isAdmin, createPost);
    router.get('/users/:id/posts',getPost);
    router.put('/posts',updatePost);
    router.patch('/posts',updatePost);
    router.delete('/posts', deletePost);
}


module.exports = { postRoutes };