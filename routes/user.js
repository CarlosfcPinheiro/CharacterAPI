// Importing usefull packages
const express = require('express');
// Instance Router class
const router = express.Router();

// Importing User controller
const {
    getAllUsers,
    getSingleUserById,
    registerUser,
    deleteUser,
    changeCredentialsUser,
} = require('../controllers/user.js');
// Importing Middlewares
const verifyToken = require('../middlewares/verifyToken.js');

/**
 * @swagger
 * /api/v1/user:
 *  get:
 *      summary: Returns all users
 *      tags:
 *          - Users
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
 *                                      type: UUID
 *                                      example: 6ec86c45-36be-4318-8d8f-2ef3edb3ae6c
 *                                  username:
 *                                      type: string
 *                                      example: CoolUser
 */
router.get('/', getAllUsers);

/**
 * @swagger
 * /api/v1/user/id/{id}:
 *  get:
 *      summary: Returns a single user
 *      tags:
 *          - Users
 *      description: Returns a single user by id provided by route param
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: User id that will be returned
 *            schema:
 *                type: string
 *      responses:
 *          200:
 *              description: Returns a single user registered successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                              type: object
 *                              properties:
 *                                  id:
 *                                      type: UUID
 *                                      example: 6ec86c45-36be-4318-8d8f-2ef3edb3ae6c
 *                                  username:
 *                                      type: string
 *                                      example: CoolUser
 */
router.get('/id/:id', getSingleUserById);

router.post('/register', registerUser);

router.delete('/id/:id', verifyToken, deleteUser);

router.patch('/id/:id', verifyToken, changeCredentialsUser);

// Exporting User router
module.exports = router;