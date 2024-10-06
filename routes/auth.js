const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Register a new user
router.post('/register', async (req, res) => {
    const { name, designation, email, password } = req.body;
    const id = await User.countDocuments() + 1;
    const user = new User({id, name, designation, email, password });
    try {
        await user.save();
        res.status(201).send({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(400).send({ error: 'Error registering user!' });
    }
});

// Login user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (user) {
            res.status(200).send({ message: 'Login successful!', userId: user.id });
        } else {
            res.status(400).send({ message: 'Invalid email or password!' });
        }
    } catch (error) {
        res.status(400).send({ error: 'Error logging in!' });
    }
});

module.exports = router;
