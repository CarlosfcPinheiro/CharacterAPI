const User = require('../models/user.js');
const Char = require('../models/char.js');
const { Op } = require('sequelize');

// Creating User controllers
const getAllUsers = async(req, res) => {
    try{
        const {sortBy='username', order='ASC', username} = req.query;

        const users = await User.findAll({
            order: [[sortBy, order.toUpperCase()]],
            where: {
                username: {
                    [Op.regexp]: username,
                },
            }
        });
        res.status(200).json({
            users: users,
            entities_count: Object.keys(users).length,
        });
    } catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Error to get users.',
            error: err.name,
        });
    }
}

const getSingleUserById = async(req, res) => {
    const {id} = req.params;
    try{
        const user = await User.findByPk(id);
        if (!user){
            return res.status(404).json({
                message: 'User not found'
            });
        }
        res.status(200).json({user});
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Error to get single user.',
            error: err.name,
        });
    }
}

const registerUser = async(req, res) => {
    res.send('createUser');
    res.end();
} 

const deleteUser = async(req, res) => {
    res.send('deleteUser');
    res.end();
}

const changeCredentialsUser = async(req, res) => {
    res.send('changeCredentialsUSer');
    res.end();
}

const loginUser = async(req, res) => {
    res.send('loginUser');
    res.end();
}

const verifyTokenUser = async(req, res) => {
    res.send('verifyTokenUser');
    res.end();
}

const logoutUser = async(req, res) => {
    res.send('logoutUser');
    res.end();
}

// Exporting methods
module.exports = {
    getAllUsers,
    getSingleUserById,
    registerUser,
    deleteUser,
    changeCredentialsUser,
    loginUser,
    verifyTokenUser,
    logoutUser,
}