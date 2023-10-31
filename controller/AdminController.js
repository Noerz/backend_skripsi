const db = require("../config/Database");
const initModels = require("../models/init-models");
const models = initModels(db);
const { Op } = require("sequelize")

const getAdmin = async (req, res) => {
    try {
        const { id } = req.query;
        const whereCondition = {};

        if (id) {
            whereCondition.id = id;
        }

        const response = await models.admin.findAll({
            where: whereCondition,
            include: [
                {
                    model: models.auth,
                    as: 'auth',
                },
                {
                    model: models.division,
                    as: 'division',
                }
            ],
        });
        let array = [];
        for (const x of response) {
            let obj = {
                id: x.id,
                gender: x.gender,
                sttus: x.status,
                name: x.auth.name,
                auth_id: x.auth.id,
                email: x.auth.email,
                division_id: x.division.id,
                division: x.division.name
            }
            array.push(obj);
        }

        res.status(200).json(array);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
// const getAdmin = async (req, res) => {
//     try {
//       const { id } = req.query;
//       const whereCondition = {};

//       if (id) {
//         whereCondition.id = id;
//       }

//       const response = await db.query("SELECT admin.*, auth.name AS auth_name, auth.email AS auth_email FROM admin JOIN auth ON admin.auth_id = auth.id; ")

//       res.status(200).json(response);
//     } catch (error) {
//       res.status(500).json({ msg: error.message });
//     }
//   };
const createAdmin = async (req, res) => {
    try {
        const body = {
            name: req.body.name,
            email: req.body.email,
            gender: req.body.gender,
            status: req.body.status,
            division_id: req.body.division_id
        }
        const response = await models.admin.create(body);
        res.status(201).json({ msg: "success", response });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

const updateAdmin = async (req, res) => {
    const admin = await models.admin.findOne({
        where: {
            id: req.query.id
        }
    });
    if (!admin) return res.status(404).json({ msg: "Admin tidak ditemukan" });
    const body = {
        name: req.body.name,
        email: req.body.email,
    }

    try {
        await models.auth.update(body, {
            where: {
                id: admin.auth_id
            }
        });
        await models.division.update(body, {
            where: {
                id: admin.auth_id
            }
        });
        res.status(200).json({ msg: "Admin Updated" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

const deleteAdmin = async (req, res) => {
    const admin = await models.admin.findOne({
        where: {
            id: req.query.id
        }
    });
    if (!admin) return res.status(404).json({ msg: "Admin tidak ditemukan" });
    try {
        await models.admin.destroy({
            where: {
                id: admin.id
            }
        });
        res.status(200).json({ msg: "Admin Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

module.exports = { getAdmin, createAdmin, updateAdmin, deleteAdmin }