const {Sequelize} = require('sequelize');
const Book = require('../models/book');

describe('Book Model', () => {
    let sequelize;

    beforeAll(async () => {
        sequelize = new Sequelize('sqlite::memory:');
        await sequelize.sync({force: true});
    });

    it('should create a book record', async () => {
        const book = await Book.create({
            code: 'JK-45',
            title: 'Harry Potter',
            author: 'J.K Rowling',
            stock: 1 
        });

        expect(book).toBeTruthy();
        expect(book.code).toBe('JK-45');
        expect(book.title).toBe('Harry Potter');
        expect(book.author).toBe('J.K Rowling');
        expect(book.stock).toBe(1);
    });

    afterAll(async () => {
        await sequelize.close();
    });
});
