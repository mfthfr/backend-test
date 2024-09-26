const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Book = sequelize.define('Book', {
    code: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
});

module.exports = Book;