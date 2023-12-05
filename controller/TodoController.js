const db = require("../config/Database");
const initModels = require("../models/init-models");
const models = initModels(db);
const { Op } = require("sequelize")

const getTodo = async (req, res) => {
    const year = req.query.year;
    const { id } = req.query;
    console.log(year);
    let whereCondition = {};
    if (id) {
        whereCondition.id = id;
    }
    if (year) {
        const yearStart = `${year}-01-01`; // Tanggal awal tahun
        const yearEnd = `${year}-12-31`; // Tanggal akhir tahun

        whereCondition = {
            due_on: {
                [Op.between]: [yearStart, yearEnd] // Menggunakan operator between untuk mencocokkan rentang tanggal
            }
        };
    }
    try {
        const response = await models.todo.findAll({
            where: whereCondition,
            include: [
                {
                    model: models.admin,
                    as: 'admin',
                },
            ],
        });
        let array = [];
        for (const x of response) {
            let obj = {
                id: x.id,
                admin_id: x.admin_id,
                title: x.title,
                due_on: x.due_on,
                status: x.status,
            }
            array.push(obj);
        }

        res.status(200).json(array);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createTodo = async (req, res) => {
    try {
        const body = {
            admin_id: req.body.admin_id,
            title: req.body.title,
            due_on: req.body.due_on,
            status: req.body.status,
        }
        const response = await models.todo.create(body);
        res.status(201).json({ msg: "success", response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

const updateTodo = async (req, res) => {
    const todo = await models.todo.findOne({
        where: {
            id: req.query.id
        }
    });
    if (!todo) return res.status(404).json({ msg: "Kegiatan tidak ditemukan" });
    const body = {
        title: req.body.title,
        due_on: req.body.due_on,
        status: req.body.status,
    }

    try {
        await models.todo.update(body, {
            where: {
                id: todo.id
            }
        });
        res.status(200).json({ msg: "Kegiatan Updated" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

const deleteTodo = async (req, res) => {
    const todo = await models.todo.findOne({
        where: {
            id: req.query.id
        }
    });
    if (!todo) return res.status(404).json({ msg: "Kegiatan tidak ditemukan" });
    try {
        await models.todo.destroy({
            where: {
                id: todo.id
            }
        });
        res.status(200).json({ msg: "Kegiatan Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

module.exports = { getTodo, createTodo, updateTodo, deleteTodo }