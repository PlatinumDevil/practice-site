const express = require('express');
const bodyParser = require('body-parser');
const PORT = 5001
const cors = require('cors');
const Entry = require('./Schema/Entry.js')
const connectDB = require('./db');

const app = express();
connectDB()
// Configure body-parser to handle JSON data
app.use(cors());
app.use(bodyParser.json());

// Set up a route to handle POST requests to /api/entries
app.post('/api/add-entry', async (req, res) => {
    try {
        const { title, date, content } = req.body;
        console.log(date)
        const entry = new Entry({ title, date, content });
        await entry.save();
        res.status(201).json(entry);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.get('/api/entries', async (req, res) => {
    try {
        let entries = await Entry.find({})
        res.status(201).json(entries)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
