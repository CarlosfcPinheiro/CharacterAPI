// Importing models
const { Op } = require('sequelize');
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
    console.log(req.params);
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
    res.send('getSingleCharById');
    res.send();
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
    res.send('changeCharById');
    res.end();
}

const deleteCharById = async(req, res) => {
    res.send('delteCharById');
    res.end();
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