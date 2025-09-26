const express = require('express');
const db = require('../database/db');
const auth = require('../database/authentication');

const router = express.Router();

// POST /api/doctors
router.post('/', auth, async (req, res) => {
    const { name, specialty } = req.body;
    try {
        const result = await db.query('INSERT INTO doctors (name, specialty) VALUES ($1, $2) RETURNING *', [name, specialty]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// GET /api/doctors
router.get('/', auth, async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM doctors');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// GET /api/doctors/id
router.get('/:id', auth, async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM doctors WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ msg: 'Doctor not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// PUT /api/doctors/id
router.put('/:id', auth, async (req, res) => {
    const { id } = req.params;
    const { name, specialty } = req.body;
    try {
        const result = await db.query('UPDATE doctors SET name = $1, specialty = $2 WHERE id = $3 RETURNING *', [name, specialty, id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ msg: 'Doctor not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// DELETE /api/doctors/id
router.delete('/:id', auth, async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('DELETE FROM doctors WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ msg: 'Doctor not found' });
        }
        res.json({ msg: 'Doctor deleted successfully' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

module.exports = router;