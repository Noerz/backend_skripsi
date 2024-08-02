const db = require("../config/Database");
const initModels = require("../models/init-models");
const models = initModels(db);

const getComment = async (req, res) => {
    try {
        const { id } = req.query;
        const whereCondition = id ? { id } : {};

        const response = await models.comment.findAll({
            where: whereCondition,
            include: [
                {
                    model: models.auth,
                    as: 'auth',
                },
                {
                    model: models.post,
                    as: 'post',
                }
            ],
        });

        const result = response.map((x) => ({
            id: x.id,
            body: x.body,
            name: x.auth.name,
            auth_id: x.auth.id,
            email: x.auth.email,
            post_id: x.post.id,
            title: x.post.title,
        }));

        res.status(200).json({
            code: 200,
            status: "success",
            message: "Comments retrieved successfully",
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

const createComment = async (req, res) => {
    try {
        const { post_id, auth_id, body } = req.body;

        const user = await models.auth.findOne({ where: { id: auth_id } });
        if (!user) {
            return res.status(404).json({
                code: 404,
                status: "error",
                message: "User not found",
                data: null,
            });
        }

        const commentData = { post_id, auth_id, body, name: user.name };
        const response = await models.comment.create(commentData);

        res.status(201).json({
            code: 201,
            status: "success",
            message: "Comment created successfully",
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

const updateComment = async (req, res) => {
    try {
        const { id } = req.query;
        const comment = await models.comment.findOne({ where: { id } });
        if (!comment) {
            return res.status(404).json({
                code: 404,
                status: "error",
                message: "Comment not found",
                data: null,
            });
        }

        const { post_id, user_id, name, email, body } = req.body;
        await models.comment.update({ post_id, user_id, name, email, body }, { where: { id } });

        res.status(200).json({
            code: 200,
            status: "success",
            message: "Comment updated successfully",
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

const deleteComment = async (req, res) => {
    try {
        const { id } = req.query;
        const comment = await models.comment.findOne({ where: { id } });
        if (!comment) {
            return res.status(404).json({
                code: 404,
                status: "error",
                message: "Comment not found",
                data: null,
            });
        }

        await models.comment.destroy({ where: { id: comment.id } });
        res.status(200).json({
            code: 200,
            status: "success",
            message: "Comment deleted successfully",
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

module.exports = { getComment, createComment, updateComment, deleteComment };
