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
    loginUser,
    verifyTokenUser,
    logoutUser
} = require('../controllers/user.js');

router.get('/', getAllUsers);
router.get('/id/:id', getSingleUserById);
router.get('/verify', verifyTokenUser);
router.get('/logout', logoutUser);

router.post('/register', registerUser);
router.post('/login', loginUser);

router.delete('/', deleteUser);

router.patch('/id/:id', changeCredentialsUser);

// Exporting User router
module.exports = router;