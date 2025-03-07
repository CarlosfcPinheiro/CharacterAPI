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
// Importing Middlewares
const verifyToken = require('../middlewares/verifyToken.js');

router.get('/', getAllChars);
router.get('/userId/:userId', getCharsByUserId);
router.get('/id/:id', getSingleCharById);

router.post('/', verifyToken, createChar);

router.patch('/id/:id', verifyToken, changeCharById);

router.delete('/id/:id', verifyToken, deleteCharById);

// Exporting Char Router
module.exports = router;