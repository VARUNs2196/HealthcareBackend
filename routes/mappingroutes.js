const express = require('express');
const db = require('../database/db');
const authentication = require('../database/authentication');

const router = express.Router();

// POST /api/mappings 
router.post('/', authentication, async (req, res) => {
    const { patientId, doctorId } = req.body;
    try {
        const patientResult = await db.query('SELECT user_id FROM patients WHERE id = $1', [patientId]);
        if (patientResult.rows.length === 0 || patientResult.rows[0].user_id !== req.user.id) {
            return res.status(403).json({ msg: 'Permission Denied' });
        }

        const result = await db.query('INSERT INTO patient_doctor_mappings (patient_id, doctor_id) VALUES ($1, $2) RETURNING *', [patientId, doctorId]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        if (err.code === '23505') {
            return res.status(409).json({ msg: 'Mapping already exists' });
        }
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// GET /api/mappings
router.get('/', authentication, async (req, res) => {
    try {
        const result = await db.query('SELECT m.id, p.name AS patient_name, d.name AS doctor_name, d.specialty FROM patient_doctor_mappings m JOIN patients p ON m.patient_id = p.id JOIN doctors d ON m.doctor_id = d.id WHERE p.user_id = $1', [req.user.id]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// GET /api/mappings/patient_id
router.get('/:patientId', authentication, async (req, res) => {
    const { patientId } = req.params;
    try {
        // Verify user owns the patient
        const patientResult = await db.query('SELECT * FROM patients WHERE id = $1 AND user_id = $2', [patientId, req.user.id]);
        if (patientResult.rows.length === 0) {
            return res.status(404).json({ msg: 'Patient not found or you do not have access' });
        }
        
        const result = await db.query('SELECT d.* FROM doctors d JOIN patient_doctor_mappings m ON d.id = m.doctor_id WHERE m.patient_id = $1', [patientId]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// DELETE /api/mappings/id
router.delete('/:id', authentication, async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('DELETE FROM patient_doctor_mappings WHERE id = $1 RETURNING patient_id', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ msg: 'Mapping not found' });
        }

        const patientId = result.rows[0].patient_id;
        const patientResult = await db.query('SELECT user_id FROM patients WHERE id = $1', [patientId]);
        if (patientResult.rows[0].user_id !== req.user.id) {
            return res.status(403).json({ msg: 'You do not have permission to delete this mapping' });
        }
        
        res.json({ msg: 'Mapping removed successfully' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

module.exports = router;