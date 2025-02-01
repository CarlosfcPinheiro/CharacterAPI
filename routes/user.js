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

router.get('/', getAllUsers);
router.get('/id/:id', getSingleUserById);

router.post('/register', registerUser);

router.delete('/id/:id', deleteUser);

router.patch('/id/:id', changeCredentialsUser);

// Exporting User router
module.exports = router;