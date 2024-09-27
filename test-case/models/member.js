const {DataTypes} = require('sequelize');
const Borrow = require('./borrow');
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

Member.hasMany(Borrow, {foreignKey: 'memberId' });

module.exports = Member;