const db = require("../config/Database");
const admin = require("../models/admin");
const initModels = require("../models/init-models");
const models = initModels(db);
const path=require("path");
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
            
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

const createPost = async (req, res) => {
    try {
        if (req.files === null) return res.status(400).json({ msg: "No File Uploaded" });
        const { admin_id, user_id, role, name, email } = req.decoded;
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        const fileName = file.md5 + ext;
        const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
        const allowedType = ['.png', '.jpg', '.jpeg'];
        if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
        if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });
        console.log(admin_id);
        const body = {
            user_id: admin_id,
            title: req.body.title,
            body: req.body.body,
            file: fileName,
            url: url
        }
        file.mv(`./public/images/${fileName}`, async (err) => {
            const response = await models.post.create(body);
            res.status(201).json({ msg: "success", response });
        })
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