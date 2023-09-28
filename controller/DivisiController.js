const db = require("../config/Database");
const initModels = require("../models/init-models");
const models = initModels(db);

const getStruktur = async (req, res) => {
    try {
        const response = await models.division.findAll({
            attributes: ['name', 'description']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

module.exports = {
    getStruktur
}