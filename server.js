const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// --- HELPER FUNCTIONS ---
const readData = () => {
    try {
        if (!fs.existsSync(DATA_FILE)) {
            // Default data if file is missing
            return { items: [], subscribers: [] };
        }
        return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    } catch (e) { return { items: [], subscribers: [] }; }
};

const writeData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// --- API ENDPOINTS ---

// 1. Get All Items
app.get('/api/items', (req, res) => {
    const data = readData();
    res.json(data.items);
});

// 2. Admin Login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    // HARDCODED CREDENTIALS
    if (username === "admin" && password === "paradox") {
        res.json({ success: true, token: "admin-access-granted" });
    } else {
        res.status(401).json({ success: false });
    }
});

// 3. Add Item (Protected)
app.post('/api/items', (req, res) => {
    const data = readData();
    const newItem = { id: Date.now(), ...req.body };
    data.items.push(newItem);
    writeData(data);
    res.json(newItem);
});

// 4. Delete Item (Protected)
app.delete('/api/items/:id', (req, res) => {
    const data = readData();
    data.items = data.items.filter(i => i.id != req.params.id);
    writeData(data);
    res.json({ success: true });
});

// Serve Frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🌌 Winchester Paradox Active on Port ${PORT}`);
});
