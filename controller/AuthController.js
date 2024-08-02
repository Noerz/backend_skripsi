const db = require("../config/Database");
const initModels = require("../models/init-models");
const models = initModels(db);
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const Register = async (req, res) => {
    try {
        const { name, email, password, role, gender, status, idDivision, nik } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const createdAuth = await models.auth.create({ name, email, password: hashPassword, role });

        const adminOrUserData = {
            name,
            email,
            gender,
            idAuth: createdAuth.idAuth,
        };

        if (role === 'admin') {
            adminOrUserData.nik = nik;
            adminOrUserData.status = status;
            adminOrUserData.idDivision = idDivision;
            await models.admin.create(adminOrUserData);
        } else {
            await models.user.create(adminOrUserData);
        }

        res.status(201).json({
            code: 201,
            status: "success",
            message: "Registration successful",
            data: createdAuth,
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

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const auth = await models.auth.findOne({ where: { email } });
        if (!auth) {
            return res.status(400).json({
                code: 400,
                status: "error",
                message: "Email not found",
                data: null,
            });
        }

        const match = await bcrypt.compare(password, auth.password);
        if (!match) {
            return res.status(400).json({
                code: 400,
                status: "error",
                message: "Incorrect password",
                data: null,
            });
        }

        const { idAuth, name, role } = auth;
        let accessToken;
        let userType = {};

        if (role === 'admin') {
            const admin = await models.admin.findOne({ where: { idAuth } });
            userType = { admin_id: admin.idAdmin };
        } else {
            const user = await models.user.findOne({ where: { idAuth } });
            userType = { user_id: user.id };
        }

        accessToken = jwt.sign({ idAuth, name, email, role, ...userType }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

        const result = {
            idAuth,
            name,
            email,
            role,
            ...userType,
            accessToken,
        };

        res.status(200).json({
            code: 200,
            status: "success",
            message: "Login successful",
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

const resetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ code: 400, status: "error", message: "Email is required", data: null });
        if (!email.includes("@")) return res.status(400).json({ code: 400, status: "error", message: "Invalid email format", data: null });

        const user = await models.auth.findOne({ where: { email } });
        if (!user) return res.status(400).json({ code: 400, status: "error", message: "Email not registered", data: null });

        const password = generateRandomPassword();
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await models.auth.update({ password: hashedPassword }, { where: { email } });

        const transporter = nodemailer.createTransport({
            service: process.env.SERVICE_MAIL,
            host: process.env.HOST_MAIL,
            port: process.env.PORT_MAIL,
            secure: true,
            auth: {
                user: process.env.USER_MAIL,
                pass: process.env.PASS_MAIL,
            }
        });
        const mailOptions = {
            from: process.env.USER_MAIL,
            to: email,
            subject: 'Reset Password',
            text: `Your new password: ${password}`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({
            code: 200,
            status: "success",
            message: "Password reset successful",
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

const generateRandomPassword = () => {
    const character = process.env.RANDOM_PASSWORD;
    let password = 'HIMTIF#';
    for (let i = 0; i < 8; i++) {
        password += character.charAt(Math.floor(Math.random() * character.length));
    }
    return password;
};

module.exports = { Register, login, resetPassword };
