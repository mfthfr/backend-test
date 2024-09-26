const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Member = sequelize.define('Member', {
    code: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Member;