const db = require("../config/Database");
const initModels = require("../models/init-models");
const models = initModels(db);
const bcrypt = require("bcrypt");
const { Op } = require("sequelize")

const Register = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const {
            name,
            email,
            password,
            role,
            gender,
            status,
            division_id,
        } = req.body;
        const hashPassword = await bcrypt.hash(password, salt)
        await models.auth.create({
            name: name,
            email: email,
            password: hashPassword,
            role: role,
        });
        if (role == 'admin') {
            const body = {
                name: name,
                email: email,
                gender: gender,
                status: status,
                division_id: division_id
            }
            await models.admin.create(body);
        } else {
            const body = {
                name: name,
                email: email,
                gender: gender,
            }
            await models.user.create(body);
        }
        res.status(201).json({ msg: "success" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

module.exports = { Register };