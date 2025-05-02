const User = require('../models/user.js');
const { Op } = require('sequelize');

const userService = require('../services/userService.js');

require('dotenv').config();

// Creating User controllers
const getAllUsers = async (req, res) => {
    try {
        const { sortBy = 'username', order = 'ASC', username = '' } = req.query;

        const users = await userService.getAllUsers(sortBy, order, username);

        res.status(200).json({
            success: true,
            users: users,
            entities_count: users.length,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Error to get users.',
            error: err.name,
        });
    }
};

const getSingleUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userService.getSingleUserById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.',
            });
        }
        res.status(200).json({
            success: true,
            user: user,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Error to get single user or Id is not well formatted.',
            error: err.name,
        });
    }
};

const registerUser = async (req, res) => {
    let { username, email, password } = req.body;
    try {
        const user = await User.findOne({
            where: {
                [Op.or]: [{ username: username }, { email: email }],
            },
        });
        if (user) {
            return res.status(409).json({
                success: false,
                message: 'Username or email already being used.',
            });
        }

        const newUser = await userService.registerUser({
            username,
            email,
            password,
        });

        res.status(201).json({
            success: true,
            message: 'User created successfuly.',
            created_user: { newUser },
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'User was not created.',
            error: err.name,
        });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.',
            });
        }

        if (req.user.id != user.id) {
            return res.status(403).json({
                success: false,
                message:
                    'Action denied. User token is different than id provided.',
            });
        }

        await userService.deleteUser(user);
        res.status(200).json({
            success: true,
            message: 'User deleted successfully.',
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'User was not deleted.',
            error: err.name,
        });
    }
};

const changeCredentialsUser = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        if (req.user.id != id) {
            return res.status(403).json({
                success: false,
                message:
                    'Action denied. User token is different than id provided.',
            });
        }

        const updated = await userService.changeCredentialsUser(id, data);
        if (!updated) {
            return res.status(204).json({
                success: true,
                message: 'No changes has been made.',
            });
        }

        const user = await userService.getSingleUserById(id);
        res.status(200).json({
            success: true,
            message: 'User has been updated successfully.',
            user: user,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'User was not updated.',
            error: err.name,
        });
    }
};

// Exporting methods
module.exports = {
    getAllUsers,
    getSingleUserById,
    registerUser,
    deleteUser,
    changeCredentialsUser,
};
