const {Sequelize} = require('sequelize');
const Member = require('../models/member');
const Book = require('../models/book');
const Borrow = require('../models/borrow');

describe('Borrow Model', () => {
    let sequelize;

    beforeAll(async () => {
        sequelize = new Sequelize('sqlite::memory:', {logging: false});
        
        await Member.sync({force: true});
        await Book.sync({force: true});
        await Borrow.sync({force: true});
    });

    it('should create a borrow record', async () => {
        const member = await Member.create({code: 'M001', name: 'Angga'});
        const book = await Book.create({code: 'JK-45', title: 'Harry Potter', author: 'J.K Rowling', stock: 1});

        const borrow = await Borrow.create({
            memberId: member.code,
            bookId: book.code,
            borrowDate: new Date(),
        });

        expect(borrow).toBeTruthy();
        expect(borrow.memberId).toBe(member.code);
        expect(borrow.bookId).toBe(book.code);
    });

    afterAll(async () => {
        await sequelize.close();
    });
});
