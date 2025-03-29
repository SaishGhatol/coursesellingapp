const express = require('express');
const router = express.Router();
const { adminModel,courseModel} = require('../db');
const jwt = require('jsonwebtoken');
const {JWT_ADMIN_PASSWORD} = require('../config');
const AdminMiddleware = require('../middlewares/AdminMiddleware');

router.post('/signup', async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    try {
        const admin = await adminModel.create({ email, password, firstName, lastName });
        res.json({
            message: 'Signup succeeded',
            admin
        });
    }
    catch(err) {
        console.error(err);
        res.status(500).json({
            message: 'Admin Signup failed',
            error: err.message
        });
    }
});

router.post('/signin',async (req, res) => {
    const { email, password } = req.body;

    const admin = await adminModel.findOne({ email, password });

    if (!admin) {
        return res.status(401).json({
            message: 'Invalid credentials'
        });
    }
    const token = jwt.sign({ adminId: admin._id }, JWT_ADMIN_PASSWORD, {
        expiresIn: '1h'
    });
    res.json({
        message: 'Admin Signin succeeded',
        admin,
        token
    });
});

router.post('/course', AdminMiddleware, async (req, res) => {
    const adminId = req.admin;
    const {  title, description, imageUrl, price } = req.body;
    const course= await courseModel.create({ title, description, imageUrl,price ,creatorId: adminId });
    res.json({
        message: 'Course created successfully',
        courseId:course._id,
        course: { title, description, price },

    });
});

router.put('/course/',AdminMiddleware,async (req, res) => {
    const adminId = req.admin;
    const { courseId, title, description, imageUrl, price } = req.body;
    const course = await courseModel.findOneAndUpdate(
     { _id: courseId, creatorId: adminId },
     { title, description, imageUrl, price }, 
     { new: true }
    );
    res.json({
        message: 'Course updated successfully',
        courseId:course._id,
        course
    });
});

module.exports = router; 