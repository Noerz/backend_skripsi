const db = require("../config/Database");
const initModels = require("../models/init-models");
const models = initModels(db);

const getDivisi = async (req, res) => {
    try {
        const { id } = req.query;
        const whereCondition = id ? { id } : {};

        const response = await models.division.findAll({
            where: whereCondition,
            attributes: ['name', 'description'],
        });

        res.status(200).json({
            code: 200,
            status: "success",
            message: "Divisions retrieved successfully",
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

const createDivisi = async (req, res) => {
    try {
        const { name, description } = req.body;
        const response = await models.division.create({ name, description });
        res.status(201).json({
            code: 201,
            status: "success",
            message: "Division created successfully",
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

const updateDivisi = async (req, res) => {
    try {
        const { id } = req.query;
        const divisi = await models.division.findOne({ where: { id } });
        if (!divisi) {
            return res.status(404).json({
                code: 404,
                status: "error",
                message: "Division not found",
                data: null,
            });
        }

        const { name, description } = req.body;
        await models.division.update({ name, description }, { where: { id } });

        res.status(200).json({
            code: 200,
            status: "success",
            message: "Division updated successfully",
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

module.exports = { getDivisi, createDivisi, updateDivisi };
