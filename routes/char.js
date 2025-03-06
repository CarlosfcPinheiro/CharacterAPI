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
/**
 * @swagger
 * /user:
 *  get:
 *      summary: Returns all users
 *      description: Returns all users registereds
 *      responses:
 *          200:
 *              description: Returns all users successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  id:
 *                                      type: integer
 *                                      example: 6ec86c45-36be-4318-8d8f-2ef3edb3ae6c
 *                                  username:
 *                                      type: string
 *                                      example: CoolUser
 */
router.get('/', getAllChars);
router.get('/userId/:userId', getCharsByUserId);
router.get('/id/:id', getSingleCharById);

router.post('/', verifyToken, createChar);

router.patch('/id/:id', verifyToken, changeCharById);

router.delete('/id/:id', verifyToken, deleteCharById);

// Exporting Char Router
module.exports = router;