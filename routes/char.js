// Importing usefull packages
const express = require('express');
// Instance Rotuer class
const router = express.Router();

// Importing Char controllers
const {
    getAllChars,
    getCharsByUserId,
    getSingleCharById,
    createChar,
    changeCharById,
    deleteCharById
} = require('../controllers/user.js');

router.get('/', getAllChars);
router.get('/:userid', getCharsByUserId);
router.get('/single/:id', getSingleCharById);

router.post('/', createChar);

router.patch('/:id', changeCharById);

router.delete('/:id', deleteCharById);