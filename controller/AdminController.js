const db = require("../config/Database");
const initModels = require("../models/init-models");
const models = initModels(db);
const bcrypt = require("bcrypt");

const getAdmin = async (req, res) => {
    try {
        const { id } = req.query;
        const whereCondition = id ? { id } : {};

        const response = await models.admin.findAll({
            where: whereCondition,
            include: [
                {
                    model: models.auth,
                    as: 'auth',
                },
                {
                    model: models.division,
                    as: 'division',
                }
            ],
        });

        const result = response.map((x) => ({
            id: x.id,
            gender: x.gender,
            status: x.status,
            name: x.auth.name,
            auth_id: x.auth.id,
            email: x.auth.email,
            division_id: x.division.id,
            division: x.division.name
        }));

        res.status(200).json({
            code: 200,
            status: "success",
            message: "Admins retrieved successfully",
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

const createAdmin = async (req, res) => {
    try {
        const { name, email, gender, status, division_id } = req.body;
        const response = await models.admin.create({ name, email, gender, status, division_id });
        res.status(201).json({
            code: 201,
            status: "success",
            message: "Admin created successfully",
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

const updateAdmin = async (req, res) => {
    try {
        const { id } = req.query;
        const admin = await models.admin.findOne({ where: { id } });
        if (!admin) {
            return res.status(404).json({
                code: 404,
                status: "error",
                message: "Admin not found",
                data: null,
            });
        }

        const { password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await models.auth.update({ password: hashedPassword }, { where: { id: admin.auth_id } });
        res.status(200).json({
            code: 200,
            status: "success",
            message: "Admin updated successfully",
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

const deleteAdmin = async (req, res) => {
    try {
        const { id } = req.query;
        const admin = await models.admin.findOne({ where: { id } });
        if (!admin) {
            return res.status(404).json({
                code: 404,
                status: "error",
                message: "Admin not found",
                data: null,
            });
        }

        await models.admin.destroy({ where: { id: admin.id } });
        res.status(200).json({
            code: 200,
            status: "success",
            message: "Admin deleted successfully",
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

module.exports = { getAdmin, createAdmin, updateAdmin, deleteAdmin };
