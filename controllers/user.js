const User = require('../models/user.js');
const Char = require('../models/char.js');

const {hashPassword, verifyPassword} = require('../utils/hash.js');

const { Op } = require('sequelize');

// Creating User controllers
const getAllUsers = async(req, res) => {
    try{
        const {sortBy='username', order='ASC', username=""} = req.query;

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
                message: 'User not found.'
            });
        }
        res.status(200).json({user});
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Error to get single user or Id is not well formatted.',
            error: err.name,
        });
    }
}

const registerUser = async(req, res) => {
    try{
        let {username, email, password} = req.body;
        const user = await User.findOne({
            where:{
                [Op.or]: [{username: username}, {email: email}]
            }
        });
        if (user){
            return res.status(409).json({
                message: 'Username or email already being used.',
            });
        }

        console.log(password);
        password = await hashPassword(password);
        const newUser = await User.create({username, email, password});

        res.status(201).json({
            message: 'User created successfuly.',
            user: {newUser},
        });
    } catch(err){
        res.status(500).json({
            message: 'User was not created.',
            error: err.name,
        });
    }
} 

const deleteUser = async(req, res) => {
    try{
        const {id} = req.params;
        const user = await User.findByPk(id);

        if (!user){
            return res.status(404).json({
                message: 'User not found.'
            });
        }

        await user.destroy();
        res.status(200).json({
            message: 'User deleted successfully.'
        });
    } catch(err){
        console.log(err);
        res.status(500).json({
            message: 'User was not deleted.',
            error: err.name,
        });
    }
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