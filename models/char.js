// Importing usefull packages
const {Sequelize, DataTypes} = require('sequelize');
// Getting sequelize instance
const {sequelize}= require('../db/db.js');

// Creating ENUMs
const FACE_ENUM = ['Sad', 'Happy', 'Angry', 'Neutral'];
const HEAD_ENUM = ['Triangle', 'Square', 'Circle'];
const ACCESSORY_ENUM = ['Glasses', 'Moustache', 'Hat'];
const ITEM_ENUM = ['Cane', 'Staff', 'Paper'];

// Creating char entity
const Char = sequelize.define('char', 
    {
        id:{
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        userid:{
            type: DataTypes.UUID,
            allowNull: false,
        },
        charname:{
            type: DataTypes.STRING(30),
            allowNull: false
        },
        face_type:{
            type: DataTypes.ENUM,
            values: FACE_ENUM,
            allowNull: false,
        },
        head_type:{
            type: DataTypes.ENUM,
            values: HEAD_ENUM,
            allowNull: false,
        },
        accessory_type:{
             type: DataTypes.ENUM,
             values: ACCESSORY_ENUM,
             allowNull: false,
        },
        item_type:{
            type: DataTypes.ENUM,
            values: ITEM_ENUM,
            allowNull: false,
        },
        created_at:{
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: Sequelize.NOW,
        }
    },
    {
        tableName: 'char',
        timestamps: false,
    }
);

// Exporting char model
module.exports = Char;