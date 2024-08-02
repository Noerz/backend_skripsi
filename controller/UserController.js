const db = require("../config/Database");
const initModels = require("../models/init-models");
const models = initModels(db);

const getUsers = async (req, res) => {
    try {
        const { id } = req.query;
        const whereCondition = id ? { id } : {};

        const response = await db.query("SELECT name, email, gender FROM user INNER JOIN auth ON user.auth_id = auth.id;");

        res.status(200).json({
            code: 200,
            status: "success",
            message: "Users retrieved successfully",
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

const createUser = async (req, res) => {
    try {
        const { name, email, gender } = req.body;
        const response = await models.user.create({ name, email, gender });
        res.status(201).json({
            code: 201,
            status: "success",
            message: "User created successfully",
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

const updateUser = async (req, res) => {
    try {
        const { id } = req.query;
        const user = await models.user.findOne({ where: { id } });
        if (!user) {
            return res.status(404).json({
                code: 404,
                status: "error",
                message: "User not found",
                data: null,
            });
        }

        const { name, email, gender, status, division_id } = req.body;
        await models.user.update({ name, email, gender, status, division_id }, { where: { id } });

        res.status(200).json({
            code: 200,
            status: "success",
            message: "User updated successfully",
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

const deleteUser = async (req, res) => {
    try {
        const { id } = req.query;
        const user = await models.user.findOne({ where: { id } });
        if (!user) {
            return res.status(404).json({
                code: 404,
                status: "error",
                message: "User not found",
                data: null,
            });
        }

        await models.user.destroy({ where: { id: user.id } });
        res.status(200).json({
            code: 200,
            status: "success",
            message: "User deleted successfully",
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

module.exports = { getUsers, createUser, updateUser, deleteUser };
