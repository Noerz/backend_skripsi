const db = require("../config/Database");
const initModels = require("../models/init-models");
const models = initModels(db);

const getDivisi = async (req, res) => {
    try {
        const { id } = req.query;
        const whereCondition = {};

        if (id) {
            whereCondition.id = id;
        }

        const response = await models.division.findAll({
            where: whereCondition,
            // attributes: ['id', 'name', 'email', 'gender', 'status'],
            attributes: [ 'name', 'description'],
            // include: [
            //     {
            //         model: models.division,
            //         attributes: ["name"],
            //         as: 'division'
            //     }
            // ]
        });

        res.status(200).json({ msg: "success", response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

const createDivisi = async (req, res) => {
    try {
        const body = {
            name: req.body.name,
            description:req.body.description
        }
        const response = await models.division.create(body);
        res.status(201).json({ msg: "success", response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

const updateDivisi = async (req, res) => {
    const divisi = await models.division.findOne({
        where: {
            id: req.query.id
        }
    });
    if (!divisi) return res.status(404).json({ msg: "Divisi tidak ditemukan" });
    const body = {
        name: req.body.name,
        description: req.body.description
    }

    try {
        await models.division.update(body, {
            where: {
                id: req.query.id
            }
        });
        res.status(200).json({ msg: "Divisi Updated" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

module.exports = {
    getDivisi,
    createDivisi,
    updateDivisi
}