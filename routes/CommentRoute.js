// const express = require('express');
const {getComment,createComment,updateComment,deleteComment } = require('../controller/CommentController');
const { verifyToken } = require('../middleware/VerifyAuth');

// const router = express.Router();

// router.get('/users', getUsers);

const commentRoutes = (router) => {
    router.get('/comments', getComment);
    router.post('/comments', createComment);
    router.get('/users/:id/comments',getComment)
    router.put('/comments', updateComment);
    router.patch('/comments', updateComment);
    router.delete('/comments', deleteComment);
}


module.exports = { commentRoutes };