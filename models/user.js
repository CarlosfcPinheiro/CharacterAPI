// Importing packages
const {Sequelize, DataTypes} = require('sequelize');
// Importing sequelize instance
const {sequelize} = require('../db/db.js');

const User = sequelize.define('user',
    {
        // Defining attributes
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        username:{
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        password:{
            type: DataTypes.STRING(60),
            allowNull: false,
        },
        char_count:{
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        created_at:{
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: Sequelize.NOW,
        },

    },
    {
        tableName: 'user',
        timestamps: false,
    }
);

// Exporting user model
module.exports = User;