const express = require('express');
const router = express.Router();
const Borrow = require('../models/borrow');
const Member = require('../models/member');
const { Op } = require('sequelize');

// Pengembalian buku
router.post('/', async (req, res) => {
    try {
        const { memberId, bookId } = req.body;

        // Cek apakah buku dipinjam oleh anggota ini
        const borrow = await Borrow.findOne({
            where: {
                memberId,
                bookId,
                returnDate: { [Op.is]: null } // Hanya mencari buku yang belum dikembalikan
            }
        });

        if (!borrow) {
            return res.status(400).json({ message: 'Buku tidak ditemukan atau belum dipinjam oleh anggota ini.' });
        }

        // Hitung selisih hari peminjaman
        const borrowDate = new Date(borrow.borrowDate);
        const returnDate = new Date();
        const daysBorrowed = Math.floor((returnDate - borrowDate) / (1000 * 60 * 60 * 24));

        // Jika lebih dari 7 hari, tambahkan penalti
        if (daysBorrowed > 7) {
            const penaltyUntil = new Date();
            penaltyUntil.setDate(returnDate.getDate() + 3); // Penalti 3 hari

            await Member.update(
                { penaltyUntil },
                { where: { id: memberId } }
            );
        }

        // Update tanggal pengembalian
        borrow.returnDate = returnDate;
        await borrow.save();

        res.status(200).json({ message: 'Buku berhasil dikembalikan', borrow });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
