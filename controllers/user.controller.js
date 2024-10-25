const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Register User
exports.register = async (req, res) => {
    const {name, username, password } = req.body;
    try {
        const newUser = new User({ name, username, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered' });
    } catch (error) {
        // Check if the error is a duplicate key error (MongoDB error code 11000)
        if (error.code === 11000) {
            res.status(400).json({ error: 'Username already exists. Please choose a different username.' });
        } else {
            res.status(400).json({ error: error.message });
        }
    }
};


// Login User
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
