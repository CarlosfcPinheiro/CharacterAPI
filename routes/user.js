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

router.get('/', getAllUsers);
router.get('/id/:id', getSingleUserById);

router.post('/register', registerUser);

router.delete('/id/:id', verifyToken, deleteUser);

router.patch('/id/:id', verifyToken, changeCredentialsUser);

// Exporting User router
module.exports = router;