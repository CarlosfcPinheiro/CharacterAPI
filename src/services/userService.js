const { Op } = require('sequelize');
const User = require('../models/user');

const { hashPassword } = require('../utils/hash');

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

    async getSingleUserById(id) {
        const user = await User.findByPk(id);

        return user;
    }

    async registerUser(userData) {
        const { username, email, password } = userData;
        const hPassword = await hashPassword(password);

        const newUser = await User.create({
            username: username,
            email: email,
            password: hPassword,
        });

        return newUser;
    }

    async deleteUser(user) {
        await user.destroy();
    }

    async changeCredentialsUser(id, newUserData) {
        const [updated] = await User.update(newUserData, {
            where: { id: id },
        });

        return updated;
    }
}

module.exports = new UserService();
