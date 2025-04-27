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
 * /users:
 *   get:
 *     summary: Returns all users.
 *     tags:
 *          - Users
 *     description: Returns all users registereds.
 *     responses:
 *       200:
 *         description: Returns users array successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                         example: "505b22a9-2ca6-4f8f-9728-ce2ce5c44fd7"
 *                       username:
 *                         type: string
 *                         example: "example"
 *                       email:
 *                         type: string
 *                         format: email
 *                         example: "example@gmail.com"
 *                       password:
 *                         type: string
 *                         example: "$2a$05$r6HDVn7QlBIropqa1Pb2deoQSKYOLiEkCbKqekEBUD25oeMoULrfK"
 *                       char_count:
 *                         type: integer
 *                         example: 0
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-02-14T20:07:15.166Z"
 *                 entities_count:
 *                   type: integer
 *                   example: 1
 */
router.get('/', getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Returns a specific user.
 *     tags:
 *          - Users
 *     description: Returns all details from a single user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: User ID requested.
 *     responses:
 *       200:
 *         description: User data returned successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: "505b22a9-2ca6-4f8f-9728-ce2ce5c44fd7"
 *                     username:
 *                       type: string
 *                       example: "example"
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: "example@gmail.com"
 *                     password:
 *                       type: string
 *                       example: "$2a$05$r6HDVn7QlBIropqa1Pb2deoQSKYOLiEkCbKqekEBUD25oeMoULrfK"
 *                     char_count:
 *                       type: integer
 *                       example: 0
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-14T20:07:15.166Z"
 */
router.get('/:id', getSingleUserById);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Register a new user.
 *     tags:
 *          - Users
 *     description: Register a new user in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "example"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "example@gmail.com"
 *               password:
 *                 type: string
 *                 example: "example"
 *     responses:
 *       201:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "User created successfuly."
 *                 created_user:
 *                   type: object
 *                   properties:
 *                     newUser:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           format: uuid
 *                           example: "bb9ca6f6-006e-4e29-a6da-8aae2f9566bf"
 *                         char_count:
 *                           type: integer
 *                           example: 0
 *                         created_at:
 *                           type: string
 *                           format: date-time
 *                           example: "2025-03-08T23:21:59.204Z"
 *                         username:
 *                           type: string
 *                           example: "example"
 *                         email:
 *                           type: string
 *                           format: email
 *                           example: "example@gmail.com"
 *                         password:
 *                           type: string
 *                           example: "$2a$05$7jadWRdPTklY3A68D.XWi.rPNkPpIGM4EXhrjXwqoP43IrYQsVpvC"
 */
router.post('/', registerUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Remove an User
 *     tags:
 *          - Users
 *     description: Remove an User by ID passed.
 *     security:
 *          - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do usuário a ser deletado.
 *     responses:
 *       200:
 *         description: Usuário excluído com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "User deleted successfully."
 *       404:
 *         description: Usuário não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "User not found."
 */
router.delete('/:id', verifyToken, deleteUser);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Changes one or more User fields.
 *     tags:
 *          - Users
 *     description: Changes one or more user fields by ID passed.
 *     security:
 *          - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: user ID to be updated.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "deleting"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "posting@gmail.com"
 *               password:
 *                 type: string
 *                 example: "nova_senha_segura"
 *     responses:
 *       200:
 *         description: User updated one or more fields successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "User has been updated successfully."
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: "76ab44eb-e7eb-4e8c-996c-228ef58bc011"
 *                     username:
 *                       type: string
 *                       example: "deleting"
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: "posting@gmail.com"
 *                     password:
 *                       type: string
 *                       example: "$2a$05$DB0C5iMUmtlqSB0H/H.V0uGYWvsr5VSOGySZ0ztaw.y9EsCnMJh.6"
 *                     char_count:
 *                       type: integer
 *                       example: 0
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-10T20:27:55.852Z"
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "User not found."
 */
router.patch('/:id', verifyToken, changeCredentialsUser);

// Exporting User router
module.exports = router;