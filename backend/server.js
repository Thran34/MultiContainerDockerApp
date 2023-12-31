const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const app = express();
const PORT = 3001;

mongoose.connect('mongodb://database:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

const User = mongoose.model('User', {
    username: String,
    password: String,
});

app.use(cors());

app.use(bodyParser.json());

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user' });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username, password });
        if (user) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error logging in' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
