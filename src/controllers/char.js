// Importing models
const Char = require('../models/char.js');
const User = require('../models/user.js');

const charService = require('../services/charService.js');

const getAllChars = async (req, res) => {
    try {
        const { sortBy = 'charname', order = 'ASC' } = req.query;

        const chars = await charService.getAllChars(sortBy, order);

        res.status(200).json({
            success: true,
            chars: chars,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Error to get characters.',
        });
    }
};

const getCharsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const { sortBy = 'charname', order = 'ASC' } = req.query;

        const chars = await charService.getCharsByUserId(userId, sortBy, order);

        res.status(200).json({
            success: true,
            chars: chars,
            entities_count: chars.length,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Error to get characters by userid.',
            error: err.name,
        });
    }
};

const getSingleCharById = async (req, res) => {
    const { id } = req.params;
    try {
        const char = await charService.getSingleCharById(id);

        if (!char) {
            return res.status(404).json({
                success: false,
                message: 'Char not found.',
            });
        }
        res.status(200).json({
            success: true,
            char: char,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Error to get single char or Id is not well formatted.',
        });
    }
};

const createChar = async (req, res) => {
    const { charname, face_type, head_type, accessory_type, item_type } =
        req.body;
    try {
        const char = await Char.findOne({
            where: {
                charname: charname,
            },
        });
        // Checks if the charname provided already in use
        if (char) {
            return res.status(409).json({
                success: false,
                message: 'The char with the provided charname already exists.',
            });
        }
        const userid = req.user.id;
        const newChar = await charService.createChar({
            charname,
            userid,
            face_type,
            head_type,
            accessory_type,
            item_type,
        });

        res.status(201).json({
            success: true,
            message: 'Char created successfully.',
            newChar: newChar,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Character was not created.',
            error: err.name,
        });
    }
};

const changeCharById = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const char = await Char.findByPk(id);
        if (char.userid != req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Action denied. Character was updated.',
            });
        }

        const updated = await charService.updateCharById(id, data);
        if (!updated) {
            return res.status(204).end();
        }
        const updatedChar = await Char.findByPk(id);

        res.status(200).json({
            success: true,
            message: 'Character has been updated.',
            char: updatedChar,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Character was not updated.',
            error: err.name,
        });
    }
};

const deleteCharById = async (req, res) => {
    const { id } = req.params;
    try {
        const char = await Char.findByPk(id);
        if (char.userid != req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Action denied. Character was not deleted.',
            });
        }

        await charService.deleteCharById(id);
        res.status(200).json({
            success: true,
            message: 'Character deleted successfully.',
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Character was not deleted.',
            error: err.name,
        });
    }
};

// Exporting methods
module.exports = {
    getAllChars,
    getCharsByUserId,
    getSingleCharById,
    createChar,
    changeCharById,
    deleteCharById,
};
