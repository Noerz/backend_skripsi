const db = require("../config/Database");
const initModels = require("../models/init-models");
const models = initModels(db);
const { Op } = require("sequelize")

const getPost = async (req, res) => {
    try {
        const { id } = req.query;
        const whereCondition = {};

        if (id) {
            whereCondition.id = id;
        }

        const response = await models.post.findAll({
            where: whereCondition,
            // attributes: ['id', 'name', 'email', 'gender', 'status'],
            attributes: ['id', 'user_id', 'title', 'body'],
            // include: [
            //     {
            //         model: models.division,
            //         attributes: ["name"],
            //         as: 'division'
            //     }
            // ]
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

const createPost = async (req, res) => {
    try {
        const body = {
            admin_id:req.body.admin_id,
            title: req.body.title,
            body: req.body.body,
        }
        const response = await models.post.create(body);
        res.status(201).json({ msg: "success", response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

const updatePost = async (req, res) => {
    const user = await models.post.findOne({
        where: {
            id: req.query.id
        }
    });
    if (!user) return res.status(404).json({ msg: "Post tidak ditemukan" });
    const body = {
        title: req.body.title,
        body: req.body.body,
    }

    try {
        await models.post.update(body, {
            where: {
                id: req.query.id
            }
        });
        res.status(200).json({ msg: "Post Updated" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

const deletePost = async (req, res) => {
    const post = await models.post.findOne({
        where: {
            id: req.query.id
        }
    });
    if (!post) return res.status(404).json({ msg: "Post tidak ditemukan" });
    try {
        await models.post.destroy({
            where: {
                id: post.id
            }
        });
        res.status(200).json({ msg: "Post Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

module.exports = { getPost, createPost, updatePost, deletePost }