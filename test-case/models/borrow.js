const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Book = require('./book');
const Member = require('./member');

const Borrow = sequelize.define('Borrow', {
  memberId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  bookId: {
    type: DataTypes.INTEGER,
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
Borrow.belongsTo(Member, { as: 'member', foreignKey: 'memberId' });

module.exports = Borrow;
