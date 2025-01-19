// Importing usefull packages
const express = require('express');
// Importing models
const User = require('../models/user.js');
const Char = require('../models/char.js');

// Creating User controllers
const getAllUsers = async(req, res) => {
    res.send('getAllUsers');
    res.end();
}

const getSingleUserById = async(req, res) => {
    res.send('getSingleUserById');
    res.end();
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