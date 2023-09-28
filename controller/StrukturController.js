import Struktur from "../models/StrukturModel.js";

export const getStruktur = async (req, res) => {
    try {
        const response = await Struktur.findAll();
        return res.status(200).json({ status: "Success", data: response });
    } catch (error) {
        console.error("Error occurred while fetching struktur:", error);
        res.status(500).json({ error: "Failed to fetch struktur" });
    }
};

export const getStrukturById = async (req, res) => {
    try {
        const response = await Struktur.findOne({
            where: {
                id: req.params.id,
            },
        });

        if (!response) {
            return res.status(404).json({ error: "Struktur not found" });
        }

        return res.status(200).json({ status: "Success", data: response });
    } catch (error) {
        console.error("Error occurred while fetching struktur:", error);
        res.status(500).json({ error: "Failed to fetch struktur" });
    }
};

export const createStruktur = async (req, res) => {
    const { name, jabatan, nik } = req.body;
    try {
        const struktur = await Struktur.create({ name, jabatan, nik });
        res.status(201).json({ message: "Struktur created", struktur });
    } catch (error) {
        console.error("Error occurred while creating struktur:", error);
        res.status(500).json({ error: "Failed to create struktur" });
    }
};

export const updateStruktur = async (req, res) => {
    try {
        const response = await Struktur.findOne({
            where: {
                id: req.params.id,
            },
        });

        if (!response) {
            return res.status(404).json({ error: "Struktur not found" });
        }

        await Struktur.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        res.status(200).json({ message: "Struktur updated" });
    } catch (error) {
        console.error("Error occurred while updating struktur:", error);
        res.status(500).json({ error: "Failed to update struktur" });
    }
};

export const deleteStruktur = async (req, res) => {
    try {
        const response = await Struktur.findOne({
            where: {
                id: req.params.id,
            },
        });

        if (!response) {
            return res.status(404).json({ error: "Struktur not found" });
        }

        await Struktur.destroy({
            where: {
                id: req.params.id,
            },
        });

        res.status(200).json({ message: "Struktur deleted" });
    } catch (error) {
        console.error("Error occurred while deleting struktur:", error);
        res.status(500).json({ error: "Failed to delete struktur" });
    }
};