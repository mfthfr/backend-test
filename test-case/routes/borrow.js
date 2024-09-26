const express = require('express');
const router = express.Router();
const Borrow = require('../models/borrow');
const Member = require('../models/member');
const Book = require('../models/book');
const { Op } = require('sequelize');

// Peminjaman buku
router.post('/', async (req, res) => {
    try {
        const { memberId, bookId } = req.body;

        // Cek apakah anggota sudah meminjam 2 buku
        const memberBorrows = await Borrow.count({
            where: {
                memberId,
                returnDate: { [Op.is]: null }
            }
        });

        if (memberBorrows >= 2) {
            return res.status(400).json({ message: 'Anggota hanya bisa meminjam maksimal 2 buku!' });
        }

        // Cek apakah buku sudah dipinjam oleh orang lain
        const bookBorrowed = await Borrow.findOne({
            where: {
                bookId,
                returnDate: { [Op.is]: null }
            }
        });

        if (bookBorrowed) {
            return res.status(400).json({ message: 'Buku sudah dipinjam oleh orang lain.' });
        }

        // Cek penalti anggota
        const member = await Member.findByPk(memberId);
        const today = new Date();

        if (member.penaltyUntil && member.penaltyUntil > today) {
            return res.status(400).json({ message: 'Anggota sedang terkena penalti sampai ' + member.penaltyUntil });
        }

        // Simpan data peminjaman
        const borrow = await Borrow.create({
            memberId,
            bookId,
            borrowDate: new Date(),
            returnDate: null // Nilai awal returnDate
        });

        res.status(201).json(borrow);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
