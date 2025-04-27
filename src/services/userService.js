const { Op } = require('sequelize');
const User = require('../models/user');

class UserService {
    async getAllUsers(sortBy, order, username) {
        const users = await User.findAll({
            order: [[sortBy, order.toUpperCase()]],
            where: {
                username: {
                    [Op.regexp]: username,
                },
            },
        });

        return users;
    }
}

module.exports = new UserService();
