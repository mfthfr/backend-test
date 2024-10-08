const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const sequelize = require('../config/database');
const {Op} = require('sequelize');

// mengambil semua buku
router.get('/', async (req, res) => {
    const books = await Book.findAll();
    res.json(books);
});

// Route untuk menambahka data
router.post('/', async (req, res) => {
    try {
        // Menghapus data lama
        await Book.destroy({ where: {}, truncate: true });

        // Menambahkan data book
        const books = [
            {
                code: "JK-45",
                title: "Harry Potter",
                author: "J.K Rowling",
                stock: 1
            },
            {
                code: "SHR-1",
                title: "A Study in Scarlet",
                author: "Arthur Conan Doyle",
                stock: 1
            },
            {
                code: "TW-11",
                title: "Twilight",
                author: "Stephenie Meyer",
                stock: 1
            },
            {
                code: "HOB-83",
                title: "The Hobbit, or There and Back Again",
                author: "J.R.R. Tolkien",
                stock: 1
            },
            {
                code: "NRN-7",
                title: "The Lion, the Witch and the Wardrobe",
                author: "C.S. Lewis",
                stock: 1
            },
        ];
        await Book.bulkCreate(books);

        res.status(201).json({ message: 'Data book berhasil ditambahkan' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/available', async (req, res) => {
    try {
        const books = await Book.findAll({
            attributes: {
                include: [
                    // Hitung jumlah buku yang sedang dipinjam
                    [sequelize.literal(`(
                        SELECT COUNT(*)
                        FROM borrows AS borrow
                        WHERE
                            borrow.bookId = Book.code
                            AND borrow.returnDate IS NULL
                    )`), 'borrowedCount'],
                ]
            }
        });

        // Periksa stok buku yang tersedia
        const availableBooks = books.map(book => ({
            ...book.toJSON(),
            availableStock: book.stock - book.dataValues.borrowedCount
        }));

        res.json(availableBooks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
