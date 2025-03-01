// Importing models
const { Op, where } = require('sequelize');
const Char = require('../models/char.js');
const User = require('../models/user.js');

const getAllChars = async(req, res) => {
    const {sortBy='charname', order='ASC', username} = req.query;
    try{
        const chars = await Char.findAll({
            order: [[sortBy, order.toUpperCase()]],
            // include option/attribute can fetch multipple associated models
            include:[
                {
                    model: User,
                    as: 'user-creator',
                    attributes: ['username']
                }
            ]
        });
        res.status(200).json(chars);
    } catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Error to get characters.',
        });
    }
}

const getCharsByUserId = async(req, res) => {
    const {userId} = req.params;
    const {sortBy='charname', order='ASC'} = req.query;
    try{
        const chars = await Char.findAll({
            where: { userid:userId },
            order: [[sortBy, order.toUpperCase()]],
        });
        res.status(200).json({
            chars,
            entities_count: Object.keys(chars).length,
        });
    } catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Error to get characters by userid.',
            error: err.name,
        });
    }
}

const getSingleCharById = async(req, res) => {
    const {id} = req.params;
    try{
        const char = await Char.findByPk(id);
        if (!char){
            return res.status(404).json({
                message: 'Char not found.'
            });
        }
        res.status(200).json(char);
    } catch(err){
        res.status(500).json({
            message: 'Error to get single char or Id is not well formatted.'
        });
    }
}

const createChar = async(req, res) => {
    const {charname, face_type, head_type, accessory_type, item_type} = req.body;
    try{
        const char = await Char.findOne({
            where: {
                charname: charname,
            }
        });
        // Checks if the charname provided already in use
        if (char){
            return res.status(409).json({
                message: 'The char with the provided charname already exists."='
            });
        }
        const userid = req.user.id;
        const newChar = await Char.create({
            charname: charname,
            userid: userid,
            face_type: face_type,
            head_type: head_type,
            accessory_type: accessory_type,
            item_type: item_type,
        });

        res.status(201).json({
            message: 'Char created successfully.',
            newChar: newChar
        });
    } catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Character was not created.',
            error: err.name,
        });
    }
}

const changeCharById = async(req, res) => {
    const {id} = req.params;
    const data = req.body;
    try{
        const char = await Char.findByPk(id);
        const differentUser = char.userid!=req.user.id ? true : false;
        if (differentUser){
            return res.status(404).json({
                message: 'Action denied. Character was updated.'
            });
        }

        const [updated] = await Char.update(data, { where:{id:id} });
        if (!updated){
            return res.status(204).end();
        }
        const updatedChar = await Char.findByPk(id);
        res.status(200).json({
            message: 'Character has been updated.',
            char: updatedChar,
        });
    } catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Character was not updated.',
            error: err.name
        });
    }
}

const deleteCharById = async(req, res) => {
    const {id} = req.params;
    try{
        const char = await Char.findByPk(id);
        const differentUser = char.userid!=req.user.id ? true : false;
        if (differentUser){
            return res.status(401).json({
                message: 'Action denied. Character was not deleted.'
            });
        }

        await char.destroy();
        res.status(200).json({
            message: 'Character deleted successfully.'
        });
    } catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Character was not deleted.',
            error: err.name
        });
    }
}

// Exporting methods
module.exports = {
    getAllChars,
    getCharsByUserId,
    getSingleCharById,
    createChar,
    changeCharById,
    deleteCharById
}