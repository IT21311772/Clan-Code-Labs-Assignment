const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const secret = crypto.randomBytes(64).toString('hex');

// Backend Route for Signup
router.post('/signup', async(req, res) => {
    const { email, username, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'Email is already in use'});
        }

        const user = new User({ email, username, password});
        await user.save();

        const token = jwt.sign({ email: user.email, id: user._id}, secret, { expiresIn: '1h'});
        res.json({ message: 'User registered Successfully', token});

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error'});
    }
});

// Backend Route for Login
router.post('/login', async(req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: 'Non-existing User'});
        }
        if (user.password !== password) {
            res.status(400).json({ message: 'Invalid Credentials' });
        }

        const token = jwt.sign({ email: user.email, id: user._id}, secret, {expiresIn: '1h'});
        res.json({ message: 'Login Successful', token, role: user.role, id: user._id });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;