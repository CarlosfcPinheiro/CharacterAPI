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
                success: false,
                message: `User with name ${username} not found.`,
            });
        }

        const checkPassword = await verifyPassword(password, user.password);
        if (!checkPassword){
            return res.status(401).json({
                success: false,
                message: 'Invalid or wrong password.'
            });
        }

        const token = jwt.sign({id: user.id}, process.env.SECRET_KEY, {expiresIn: '1h'});
        res.status(200).json({
            success: true,
            message: 'Login successfully.',
            id: user.id,
            authToken: token,
        });
    } catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'User was not logged in.',
            error: err.name,
        });
    }
}

const verifyTokenUser = async(req, res) => {
    try{
        res.status(200).json({
            success: true,
            message: 'Valid Token.',
            user: req.user
        });
    } catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Error during Token validation.'
        });
    }
}
// Remove token from client side
const logoutUser = async(req, res) => {
    try{
        res.status(200).json({
            success: true,
            message: 'Logout successfully.'
        });
    } catch(err){
        res.status(500).json({
            success: false,
            message: 'Error during logout user.'
        });
    }
}

// Exporting methods
module.exports = {loginUser, verifyTokenUser, logoutUser}