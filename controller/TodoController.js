const db = require("../config/Database");
const initModels = require("../models/init-models");
const models = initModels(db);
const { Op } = require("sequelize");

const getTodo = async (req, res) => {
    try {
        const { id, year } = req.query;
        let whereCondition = id ? { id } : {};

        if (year) {
            const yearStart = `${year}-01-01`;
            const yearEnd = `${year}-12-31`;
            whereCondition.due_on = { [Op.between]: [yearStart, yearEnd] };
        }

        const response = await models.todo.findAll({
            where: whereCondition,
            include: [{ model: models.admin, as: 'admin' }],
        });

        const result = response.map((x) => ({
            id: x.id,
            admin_id: x.admin_id,
            title: x.title,
            due_on: x.due_on,
            status: x.status,
        }));

        res.status(200).json({
            code: 200,
            status: "success",
            message: "Todos retrieved successfully",
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            status: "error",
            message: error.message,
            data: null,
        });
    }
};

const createTodo = async (req, res) => {
    try {
        const { admin_id, title, due_on, status } = req.body;
        const response = await models.todo.create({ admin_id, title, due_on, status });
        res.status(201).json({
            code: 201,
            status: "success",
            message: "Todo created successfully",
            data: response,
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            status: "error",
            message: error.message,
            data: null,
        });
    }
};

const updateTodo = async (req, res) => {
    try {
        const { id } = req.query;
        const todo = await models.todo.findOne({ where: { id } });
        if (!todo) {
            return res.status(404).json({
                code: 404,
                status: "error",
                message: "Todo not found",
                data: null,
            });
        }

        const { title, due_on, status } = req.body;
        await models.todo.update({ title, due_on, status }, { where: { id } });

        res.status(200).json({
            code: 200,
            status: "success",
            message: "Todo updated successfully",
            data: null,
        });
    } catch (error) {
        res.status(400).json({
            code: 400,
            status: "error",
            message: error.message,
            data: null,
        });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const { id } = req.query;
        const todo = await models.todo.findOne({ where: { id } });
        if (!todo) {
            return res.status(404).json({
                code: 404,
                status: "error",
                message: "Todo not found",
                data: null,
            });
        }

        await models.todo.destroy({ where: { id: todo.id } });
        res.status(200).json({
            code: 200,
            status: "success",
            message: "Todo deleted successfully",
            data: null,
        });
    } catch (error) {
        res.status(400).json({
            code: 400,
            status: "error",
            message: error.message,
            data: null,
        });
    }
};

module.exports = { getTodo, createTodo, updateTodo, deleteTodo };
