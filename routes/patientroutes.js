const express = require('express');
const db = require('../database/db');
const authentication = require('../database/authentication');

const router = express.Router();

// POST /api/patients 
router.post('/', authentication, async (req, res) => {
    const { name } = req.body;
    try {
        const result = await db.query('INSERT INTO patients (name, user_id) VALUES ($1, $2) RETURNING *', [name, req.user.id]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// GET /api/patients
router.get('/', authentication, async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM patients WHERE user_id = $1', [req.user.id]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// GET /api/patients/id
router.get('/:id', authentication, async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM patients WHERE id = $1 AND user_id = $2', [id, req.user.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ msg: 'Patient not found or you do not have access' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// PUT /api/patients/id
router.put('/:id', authentication, async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const result = await db.query('UPDATE patients SET name = $1 WHERE id = $2 AND user_id = $3 RETURNING *', [name, id, req.user.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ msg: 'Patient not found or you do not have access' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ msg: 'Server got error', error: err.message });
    }
});

// DELETE /api/patients/id
router.delete('/:id', authentication, async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('DELETE FROM patients WHERE id = $1 AND user_id = $2 RETURNING *', [id, req.user.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ msg: 'Patient not found or you do not have access' });
        }
        res.json({ msg: 'Patient deleted successfully' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

module.exports = router;