const express = require('express');
const router = express.Router();
const Member = require('../models/member');

// mengambil semua member
router.get('/', async (req, res) => {
    const members = await Member.findAll();
    res.json(members);
});

// Route untuk menambahkan data
router.post('/', async (req, res) => {
    try {
        // Menghapus data lama
        await Member.destroy({ where: {}, truncate: true });

        // Menambahkan data member
        const members = [
            {
                code: "M001",
                name: "Angga",
            },
            {
                code: "M002",
                name: "Ferry",
            },
            {
                code: "M003",
                name: "Putri",
            },
        ];
        await Member.bulkCreate(members);

        res.status(201).json({ message: 'Data member berhasil ditambahkan.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
