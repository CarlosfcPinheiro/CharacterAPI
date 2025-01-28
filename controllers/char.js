// Importing models
const Char = require('../models/char.js');
const User = require('../models/user.js');

const getAllChars = async(req, res) => {
    res.send('getAllChars');
    res.end();
}

const getCharsByUserId = async(req, res) => {
    res.send('getCharsByUserId');
    res.end();
}

const getSingleCharById = async(req, res) => {
    res.send('getSingleCharById');
    res.send();
}

const createChar = async(req, res) => {
    res.send('createChar');
    res.end();
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