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
    deleteCharById,
} = require('../controllers/char.js');
// Importing Middlewares
const verifyToken = require('../middlewares/verifyToken.js');

/**
 * @swagger
 * /chars:
 *   get:
 *     summary: Get all characters
 *     description: Returns a list of characters, optionally sorted and filtered by the associated user's username.
 *     tags:
 *       - Chars
 *     parameters:
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           default: charname
 *         description: Field to sort by (default is 'charname')
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           default: ASC
 *         description: Sort order direction
 *       - in: query
 *         name: username
 *         schema:
 *           type: string
 *         description: Filter characters by associated user's username
 *     responses:
 *       200:
 *         description: Successful response with list of characters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 chars:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                         example: 7f2d9191-2e1c-4bb0-bc2b-9c61adfcf003
 *                       charname:
 *                         type: string
 *                         example: Arthas
 *                       userid:
 *                         type: string
 *                         format: uuid
 *                         example: 123e4567-e89b-12d3-a456-426614174000
 *                       face_type:
 *                         type: string
 *                         enum: [FACE_1, FACE_2, FACE_3]  # Substitua com os valores reais do seu enum
 *                         example: FACE_1
 *                       head_type:
 *                         type: string
 *                         enum: [HEAD_1, HEAD_2, HEAD_3]  # Substitua com os valores reais
 *                         example: HEAD_2
 *                       accessory_type:
 *                         type: string
 *                         enum: [ACC_1, ACC_2, ACC_3]  # Substitua com os valores reais
 *                         example: ACC_3
 *                       item_type:
 *                         type: string
 *                         enum: [ITEM_1, ITEM_2, ITEM_3]  # Substitua com os valores reais
 *                         example: ITEM_1
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-04-09T12:00:00Z
 *                       user-creator:
 *                         type: object
 *                         properties:
 *                           username:
 *                             type: string
 *                             example: warriorKing
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error to get characters.
 */
router.get('/', getAllChars);
/**
 * @swagger
 * /chars/userId/{userId}:
 *   get:
 *     summary: Get all characters by user ID
 *     description: Returns all characters associated with a specific user ID.
 *     tags:
 *       - Chars
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID of the user
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           default: charname
 *         description: Field to sort by (default is 'charname')
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           default: ASC
 *         description: Sort order direction
 *     responses:
 *       200:
 *         description: Successful response with list of characters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 chars:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                         example: 7f2d9191-2e1c-4bb0-bc2b-9c61adfcf003
 *                       charname:
 *                         type: string
 *                         example: Sylvanas
 *                       userid:
 *                         type: string
 *                         format: uuid
 *                         example: 123e4567-e89b-12d3-a456-426614174000
 *                       face_type:
 *                         type: string
 *                         example: FACE_1
 *                       head_type:
 *                         type: string
 *                         example: HEAD_2
 *                       accessory_type:
 *                         type: string
 *                         example: ACC_3
 *                       item_type:
 *                         type: string
 *                         example: ITEM_1
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-04-09T12:00:00Z
 *                 entities_count:
 *                   type: integer
 *                   example: 2
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error to get characters by userid.
 *                 error:
 *                   type: string
 *                   example: SequelizeDatabaseError
 */
router.get('/userId/:userId', getCharsByUserId);
/**
 * @swagger
 * /chars/{id}:
 *   get:
 *     summary: Get a single character by ID
 *     description: Returns a single character based on its unique ID.
 *     tags:
 *       - Chars
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID of the character
 *     responses:
 *       200:
 *         description: Character found and returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 char:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: 7f2d9191-2e1c-4bb0-bc2b-9c61adfcf003
 *                     charname:
 *                       type: string
 *                       example: Illidan
 *                     userid:
 *                       type: string
 *                       format: uuid
 *                       example: 123e4567-e89b-12d3-a456-426614174000
 *                     face_type:
 *                       type: string
 *                       example: FACE_1
 *                     head_type:
 *                       type: string
 *                       example: HEAD_2
 *                     accessory_type:
 *                       type: string
 *                       example: ACC_3
 *                     item_type:
 *                       type: string
 *                       example: ITEM_1
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-04-09T12:00:00Z
 *       404:
 *         description: Character not found
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
 *                   example: Char not found.
 *       500:
 *         description: Server error or malformed ID
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
 *                   example: Error to get single char or Id is not well formatted.
 */
router.get('/id/:id', getSingleCharById);

/**
 * @swagger
 * /chars:
 *   post:
 *     summary: Create a new character
 *     description: Creates a new character associated with the authenticated user.
 *     tags:
 *       - Chars
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - charname
 *               - face_type
 *               - head_type
 *               - accessory_type
 *               - item_type
 *             properties:
 *               charname:
 *                 type: string
 *                 example: Thrall
 *               face_type:
 *                 type: string
 *                 example: FACE_1
 *               head_type:
 *                 type: string
 *                 example: HEAD_2
 *               accessory_type:
 *                 type: string
 *                 example: ACC_3
 *               item_type:
 *                 type: string
 *                 example: ITEM_4
 *     responses:
 *       201:
 *         description: Character created successfully
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
 *                   example: Char created successfully.
 *                 newChar:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: 91b8f00c-15e1-4cd5-8a9c-255654a785eb
 *                     charname:
 *                       type: string
 *                       example: Thrall
 *                     userid:
 *                       type: string
 *                       format: uuid
 *                       example: 123e4567-e89b-12d3-a456-426614174000
 *                     face_type:
 *                       type: string
 *                       example: FACE_1
 *                     head_type:
 *                       type: string
 *                       example: HEAD_2
 *                     accessory_type:
 *                       type: string
 *                       example: ACC_3
 *                     item_type:
 *                       type: string
 *                       example: ITEM_4
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-04-09T12:00:00Z
 *       409:
 *         description: Character with the provided name already exists
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
 *                   example: The char with the provided charname already exists.
 *       500:
 *         description: Server error during character creation
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
 *                   example: Character was not created.
 *                 error:
 *                   type: string
 *                   example: SequelizeDatabaseError
 */
router.post('/', verifyToken, createChar);

/**
 * @swagger
 * /chars/{id}:
 *   patch:
 *     summary: Update a character by ID
 *     description: Updates the fields of a specific character. Only the character's owner can perform this action.
 *     tags:
 *       - Chars
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: UUID of the character to update
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               charname:
 *                 type: string
 *                 example: Grommash
 *               face_type:
 *                 type: string
 *                 example: FACE_3
 *               head_type:
 *                 type: string
 *                 example: HEAD_1
 *               accessory_type:
 *                 type: string
 *                 example: ACC_2
 *               item_type:
 *                 type: string
 *                 example: ITEM_5
 *     responses:
 *       200:
 *         description: Character updated successfully
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
 *                   example: Character has been updated.
 *                 char:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: 92bcd2c7-90aa-4a2e-bbea-4f80c7cfaeee
 *                     charname:
 *                       type: string
 *                       example: Grommash
 *                     userid:
 *                       type: string
 *                       format: uuid
 *                       example: 123e4567-e89b-12d3-a456-426614174000
 *                     face_type:
 *                       type: string
 *                       example: FACE_3
 *                     head_type:
 *                       type: string
 *                       example: HEAD_1
 *                     accessory_type:
 *                       type: string
 *                       example: ACC_2
 *                     item_type:
 *                       type: string
 *                       example: ITEM_5
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-04-09T12:00:00Z
 *       204:
 *         description: No character was updated (probably nothing changed)
 *       403:
 *         description: Action denied - user does not own the character
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
 *                   example: Action denied. Character was updated.
 *       500:
 *         description: Server error during update
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
 *                   example: Character was not updated.
 *                 error:
 *                   type: string
 *                   example: SequelizeDatabaseError
 */
router.patch('/id/:id', verifyToken, changeCharById);

/**
 * @swagger
 * /chars/{id}:
 *   delete:
 *     summary: Delete a character by ID
 *     description: Deletes a character by its UUID. Only the character's owner can delete it.
 *     tags:
 *       - Chars
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: UUID of the character to delete
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Character deleted successfully
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
 *                   example: Character deleted successfully.
 *       403:
 *         description: Action denied - user does not own the character
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
 *                   example: Action denied. Character was not deleted.
 *       500:
 *         description: Server error during deletion
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
 *                   example: Character was not deleted.
 *                 error:
 *                   type: string
 *                   example: SequelizeDatabaseError
 */
router.delete('/id/:id', verifyToken, deleteCharById);

// Exporting Char Router
module.exports = router;
