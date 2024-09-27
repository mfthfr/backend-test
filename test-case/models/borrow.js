const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Book = require('./book');
const Member = require('./member');

const Borrow = sequelize.define('Borrow', {
  memberId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bookId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  borrowDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  returnDate: {
    type: DataTypes.DATE,
    allowNull: true
  }
});

// Asosiasi dengan model Book dan Member
Borrow.belongsTo(Book, { as: 'book', foreignKey: 'bookId' });
Borrow.associate = (models) => {
    Borrow.belongsTo(models.Member, {
        foreignKey: "memberId"
    });
}

module.exports = Borrow;
