const db = require("../config/Database");
const initModels = require("../models/init-models");
const models = initModels(db);
const bcrypt = require("bcrypt");

const getProfile = async (req, res) => {
    try {
        const { admin_id, user_id, role, name, email } = req.decoded;
        const whereCondition = role === 'admin' ? { id: admin_id } : { id: user_id };

        const response = role === 'admin' ? await models.admin.findAll({ where: whereCondition }) : await models.user.findAll({ where: whereCondition });

        const result = response.map((x) => ({
            id: x.id,
            gender: x.gender,
            status: role === 'admin' ? x.status : undefined,
            name,
            email,
        }));

        res.status(200).json({
            code: 200,
            status: "success",
            message: "Profile retrieved successfully",
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

const updateProfile = async (req, res) => {
    try {
        const { admin_id, user_id, role, auth_id } = req.decoded;
        const { name, email, gender, status } = req.body;

        const updateData = role === 'admin' ? { name, email, gender, status } : { name, email, gender };
        await models.auth.update(updateData, { where: { id: auth_id } });

        res.status(200).json({
            code: 200,
            status: "success",
            message: "Profile updated successfully",
            data: null,
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

const changePassword = async (req, res) => {
    try {
        const { auth_id } = req.decoded;
        const { oldPassword, newPassword } = req.body;

        const user = await models.auth.findOne({ where: { id: auth_id } });
        if (!user) {
            return res.status(404).json({
                code: 404,
                status: "error",
                message: "User not found",
                data: null,
            });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({
                code: 400,
                status: "error",
                message: "Incorrect old password",
                data: null,
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await models.auth.update({ password: hashedPassword }, { where: { id: auth_id } });

        res.status(200).json({
            code: 200,
            status: "success",
            message: "Password updated successfully",
            data: null,
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

module.exports = { getProfile, updateProfile, changePassword };
