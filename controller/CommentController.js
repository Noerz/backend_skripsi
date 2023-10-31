const db = require("../config/Database");
const initModels = require("../models/init-models");
const models = initModels(db);
const { Op } = require("sequelize")

const getComment = async (req, res) => {
    try {
        const { id } = req.query;
        const whereCondition = {};

        if (id) {
            whereCondition.id = id;
        }

        const response = await models.comment.findAll({
            where: whereCondition,
            // attributes: ['id', 'name', 'email', 'gender', 'status'],
            attributes: ['id', 'post_id', 'user_id','name', 'email','body'],
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

const createComment = async (req, res) => {
    try {
        const body = {
            post_id: req.body.post_id,
            user_id: req.body.user_id,
            body: req.body.body,
        };

        // Mengambil data pengguna berdasarkan user_id
        const user = await models.admin.findOne({ where: { id: req.body.user_id } });

        // Memastikan pengguna ditemukan
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Mengisi otomatis nama dan email dari pengguna terkait
        body.name = user.name;
        body.email = user.email;

        const response = await models.comment.create(body);
        res.status(201).json({ msg: 'success', response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const updateComment = async (req, res) => {
    const comment = await models.comment.findOne({
        where: {
            id: req.query.id
        }
    });
    if (!comment) return res.status(404).json({ msg: "Comment tidak ditemukan" });
    const body = {
        post_id:req.body.post_id,
        user_id:req.body.user_id,
            name: req.body.name,
            email: req.body.email,
            body: req.body.body,
    }

    try {
        await models.comment.update(body, {
            where: {
                id: req.query.id
            }
        });
        res.status(200).json({ msg: "Comment Updated" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

const deleteComment = async (req, res) => {
    const comment = await models.comment.findOne({
        where: {
            id: req.query.id
        }
    });
    if (!comment) return res.status(404).json({ msg: "Comment tidak ditemukan" });
    try {
        await models.comment.destroy({
            where: {
                id: comment.id
            }
        });
        res.status(200).json({ msg: "Comment Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

module.exports = { getComment,createComment,updateComment,deleteComment }