// Importing User model
const User = require('../models/user.js');
// Importing jwt
const jwt = require('jsonwebtoken');
// Importing hash functions
const {verifyPassword} = require('../utils/hash.js');

const loginUser = async(req, res) => {
    const {username, password} = req.body;
    try{
        const user = await User.findOne({
            where:{
                username: username
            },
        });
        if (!user){
            return res.status(404).json({
                message: `User with name ${username} not found.`,
            });
        }

        const checkPassword = await verifyPassword(password, user.password);
        if (!checkPassword){
            return res.status(401).json({
                message: 'Invalid or wrong password.'
            });
        }

        const token = jwt.sign({id: user.id}, process.env.SECRET_KEY, {expiresIn: '1h'});
        res.status(200).json({
            message: 'Login successfully.',
            id: user.id,
            authToken: token,
        });
    } catch(err){
        console.log(err);
        res.status(500).json({
            message: 'User was not logged in.',
            error: err.name,
        });
    }
}

const verifyTokenUser = async(req, res) => {
    res.status(200).json({
        message: 'Valid Token.',
        user: req.user
    });
}
// Remove token from client side
const logoutUser = async(req, res) => {
    res.status(200).json({
        message: 'Logout successfully.'
    });
}

// Exporting methods
module.exports = {loginUser, verifyTokenUser, logoutUser}