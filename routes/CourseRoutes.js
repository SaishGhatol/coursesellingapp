const express = require('express');
const router = express.Router();
const {courseModel} = require('../db');

router.post('/purchase', (req, res) => {
    res.json({
        message:'create course route'
    });
});

router.get('/perview', (req, res) => {
    res.json({
        message:'preview course route'
    });
});

module.exports = router;
