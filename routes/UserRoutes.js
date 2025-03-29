const express = require('express');
const router = express.Router();
const {userModel} = require('../db');
const jwt = require('jsonwebtoken');
const {JWT_USER_PASSWORD} = require('../config');

router.post('/signup', async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    try {
        const user = await userModel.create({ email, password, firstName, lastName });
        res.json({
            message: 'Signup succeeded',
            user
        });
    }
    catch(err) {
        console.error(err);
        res.status(500).json({
            message: 'Signup failed',
            error: err.message
        });
    }
});

router.post('/signin', async(req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email, password });

    if (!user) {
        return res.status(401).json({
            message: 'Invalid credentials'
        });
    }
    const token = jwt.sign({ userId: user._id }, JWT_USER_PASSWORD, {
        expiresIn: '1h'
    });
    res.json({
        message: 'Signin succeeded',
        user,
        token
    });
});

router.post('/purchases', (req, res) => {
    res.json({
        message: 'purchases route'
    });
});

module.exports = router;
