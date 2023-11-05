// const express = require('express');


const { getTodo, createTodo, updateTodo, deleteTodo } = require("../controller/TodoController");
const { istodos, isUser, verifyToken } = require("../middleware/VerifyAuth");

// const router = express.Router();

// router.get('/users', getUsers);

const todoRoutes = (router) => {
    router.get('/todos',verifyToken, getTodo);
    router.post('/todos', createTodo);
    router.patch('/todos', updateTodo);
    router.put('/todos', updateTodo);
    router.delete('/todos', deleteTodo);
}


module.exports = { todoRoutes };