const Char = require('../models/char');
const User = require('../models/user');

class CharService {
    async getAllChars(sortBy, order) {
        const chars = await Char.findAll({
            order: [[sortBy, order.toUpperCase()]],
            include: [
                {
                    model: User,
                    as: 'user-creator',
                    attributes: ['username'],
                },
            ],
        });

        return chars;
    }

    async getCharsByUserId(userId, sortBy, order) {
        const chars = await Char.findAll({
            where: { userid: userId },
            order: [[sortBy, order.toUpperCase()]],
        });

        return chars;
    }

    async getSingleCharById(id) {
        const char = await Char.findByPk(id);

        return char;
    }

    async createChar(charData) {
        const {
            charname,
            userid,
            face_type,
            head_type,
            accessory_type,
            item_type,
        } = charData;

        const newChar = await Char.create({
            charname: charname,
            userid: userid,
            face_type: face_type,
            head_type: head_type,
            accessory_type: accessory_type,
            item_type: item_type,
        });

        return newChar;
    }

    async updateCharById(id, newCharData) {
        const [updated] = await Char.update(newCharData, {
            where: {
                id: id,
            },
        });

        return updated;
    }

    async deleteCharById(id) {
        await Char.destroy(id);
    }
}

module.exports = new CharService();
