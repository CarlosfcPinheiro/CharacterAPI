// Importing usefull packages
const express = require('express');
// Instance Router class
const router = express.Router();
// Importing middlewares
const verifyToken = require('../middlewares/verifyToken.js');

const {
    loginUser,
    verifyTokenUser,
    logoutUser} = require('../controllers/auth.js');

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user.
 *     tags:
 *          - Auth
 *     description: Check user credentials and returns a token JWT to validate successfully.
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
 *               password:
 *                 type: string
 *                 example: "example_password"
 *     responses:
 *       200:
 *         description: Login successfully, returns authenticate token.
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
 *                   example: "Login successfully."
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   example: "64b4141c-f22d-474e-869b-6ef08d877f2e"
 *                 authToken:
 *                   type: string
 *                   description: Token JWT
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Invalid credentials.
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
 *                   example: "Invalid username or password."
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /auth/verify:
 *   get:
 *     summary: Verify User token validation.
 *     tags:
 *          - Auth
 *     description: Retorna a validação do token do usuário.
 *     security:
 *          - BearerAuth: []
 *     responses:
 *       200:
 *         description: Valid token.
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
 *                   example: "Valid Token."
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "64b4141c-f22d-474e-869b-6ef08d877f2e"
 *                     iat:
 *                       type: integer
 *                       example: 1741804103
 *                     exp:
 *                       type: integer
 *                       example: 1741807703
 *       500:
 *         description: Internal server error.
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
 *                   example: "Error during Token validation."
 */
router.get('/verify', verifyToken, verifyTokenUser);

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Logout user.
 *     tags:
 *          - Auth
 *     description: Logout a user which requires validation to logout user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successfully.
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
 *                   example: "Logout successfully."
 *       401:
 *         description: Invalid token or not send.
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
 *                   example: "Unauthorized. Token required."
 *       500:
 *         description: Internal server error.
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
 *                   example: "Error during logout user."
 */
router.get('/logout', verifyToken, logoutUser);

// Exporting auth router
module.exports = router;