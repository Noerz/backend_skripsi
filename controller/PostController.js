const db = require("../config/Database");
const initModels = require("../models/init-models");
const models = initModels(db);
const path = require("path");

const getPost = async (req, res) => {
    try {
        const { id } = req.query;
        const whereCondition = id ? { id } : {};

        const response = await models.post.findAll({ where: whereCondition });

        res.status(200).json({
            code: 200,
            status: "success",
            message: "Posts retrieved successfully",
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

const createPost = async (req, res) => {
    try {
        if (!req.files) return res.status(400).json({ code: 400, status: "error", message: "No file uploaded", data: null });

        const { admin_id, user_id, role, name, email } = req.decoded;
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        const id = req.query.id;
        const fileName = `image-${id}-${new Date().toISOString().split('T')[0].replace(/-/g, '')}${ext}`;
        const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
        const allowedTypes = ['.png', '.jpg', '.jpeg'];

        if (!allowedTypes.includes(ext.toLowerCase())) return res.status(422).json({ code: 422, status: "error", message: "Invalid image format", data: null });
        if (fileSize > 5000000) return res.status(422).json({ code: 422, status: "error", message: "Image must be less than 5 MB", data: null });

        const postData = {
            user_id: admin_id,
            title: req.body.title,
            body: req.body.body,
            file: fileName,
            url,
        };

        file.mv(`./public/images/${fileName}`, async (err) => {
            if (err) return res.status(500).json({ code: 500, status: "error", message: "File upload failed", data: null });
            const response = await models.post.create(postData);
            res.status(201).json({
                code: 201,
                status: "success",
                message: "Post created successfully",
                data: response,
            });
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

const updatePost = async (req, res) => {
    try {
        const { id } = req.query;
        const post = await models.post.findOne({ where: { id } });
        if (!post) {
            return res.status(404).json({
                code: 404,
                status: "error",
                message: "Post not found",
                data: null,
            });
        }

        let updateData = { title: req.body.title, body: req.body.body };

        if (req.files) {
            const file = req.files.file;
            const fileSize = file.data.length;
            const ext = path.extname(file.name);
            const fileName = `image-${id}-${new Date().toISOString().split('T')[0].replace(/-/g, '')}${ext}`;
            const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

            if (fileSize > 5000000) return res.status(422).json({ code: 422, status: "error", message: "Image must be less than 5 MB", data: null });

            file.mv(`./public/images/${fileName}`, async (err) => {
                if (err) return res.status(500).json({ code: 500, status: "error", message: "File upload failed", data: null });

                updateData = { ...updateData, file: fileName, url };
                await models.post.update(updateData, { where: { id } });

                res.status(200).json({
                    code: 200,
                    status: "success",
                    message: "Post updated successfully",
                    data: null,
                });
            });
        } else {
            await models.post.update(updateData, { where: { id } });
            res.status(200).json({
                code: 200,
                status: "success",
                message: "Post updated successfully",
                data: null,
            });
        }
    } catch (error) {
        res.status(400).json({
            code: 400,
            status: "error",
            message: error.message,
            data: null,
        });
    }
};

const deletePost = async (req, res) => {
    try {
        const { id } = req.query;
        const post = await models.post.findOne({ where: { id } });
        if (!post) {
            return res.status(404).json({
                code: 404,
                status: "error",
                message: "Post not found",
                data: null,
            });
        }

        await models.post.destroy({ where: { id: post.id } });
        res.status(200).json({
            code: 200,
            status: "success",
            message: "Post deleted successfully",
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

module.exports = { getPost, createPost, updatePost, deletePost };
