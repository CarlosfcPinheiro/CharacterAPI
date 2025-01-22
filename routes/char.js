// Importing usefull packages
const express = require('express');
// Instance Router class
const router = express.Router();

// Importing Char controller
const {
    getAllChars,
    getCharsByUserId,
    getSingleCharById,
    createChar,
    changeCharById,
    deleteCharById
} = require('../controllers/char.js');

router.get('/', getAllChars);
router.get('/userId/:userId', getCharsByUserId);
router.get('/id/:id', getSingleCharById);

router.post('/', createChar);

router.patch('/id/:id', changeCharById);

router.delete('/id/:id', deleteCharById);

// Exporting Char Router
module.exports = router;