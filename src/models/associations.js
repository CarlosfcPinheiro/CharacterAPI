const User = require('./user.js');
const Char = require('./char.js');

User.hasMany(Char, {
    foreignKey: 'userid',
    as: 'char'
});
Char.belongsTo(User, {
    foreignKey: 'userid',
    as: 'user-creator'
});

module.exports = { User, Char };