import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, 'data.json');

// Default data with 3 items
const DEFAULT_DATA = {
  items: [
    {
      id: '1',
      title: "Nebula's Embrace",
      type: 'art',
      content: "A digital masterpiece capturing the ethereal dance of cosmic gases in the Orion Nebula. This piece explores the paradox of creation through destruction, as stars are born from the very chaos that consumes them. The swirling violets and deep cyans represent the duality of existence—light emerging from darkness, order from entropy.",
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80',
      createdAt: '2024-01-15T10:30:00Z',
      status: 'active'
    },
    {
      id: '2',
      title: 'The Paradox Protocol',
      type: 'article',
      content: "In the vast expanse of digital consciousness, we find ourselves at the intersection of ancient wisdom and future technology. The Winchester Paradox is not merely a concept—it is a living, breathing entity that exists in the space between what was and what will be.\n\nThis article explores the philosophical underpinnings of paradoxical existence, drawing from quantum mechanics, Eastern philosophy, and the emerging field of digital metaphysics. We examine how contradictions can coexist, how the observer shapes the observed, and how meaning emerges from the void.\n\nThe protocol demands that we embrace uncertainty, that we find comfort in the unknown, and that we recognize the infinite possibilities contained within every moment of indecision.",
      price: 0,
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
      createdAt: '2024-02-01T14:45:00Z',
      status: 'active'
    },
    {
      id: '3',
      title: 'Void Crystal Pendant',
      type: 'product',
      content: "Handcrafted obsidian pendant infused with bioluminescent resin. Each piece is unique, containing a fragment of the void that seems to pulse with inner light. The crystal has been treated with a proprietary process that creates the illusion of depth—stare long enough, and you might see the universe staring back.",
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=80',
      createdAt: '2024-02-10T09:00:00Z',
      status: 'active'
    }
  ],
  subscribers: [],
  admin: { username: 'admin', password: 'paradox' }
};

// Middleware
app.use(cors());
app.use(express.json());

// Helper functions
const readData = () => {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(DEFAULT_DATA, null, 2));
      return DEFAULT_DATA;
    }
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data file:', error);
    return DEFAULT_DATA;
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing data file:', error);
    return false;
  }
};

// ===== ITEMS API =====
app.get('/api/items', (req, res) => {
  const data = readData();
  res.json(data.items.filter(item => item.status === 'active'));
});

app.get('/api/items/all', (req, res) => {
  const data = readData();
  res.json(data.items);
});

app.get('/api/items/:id', (req, res) => {
  const data = readData();
  const item = data.items.find(i => i.id === req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

app.post('/api/items', (req, res) => {
  const data = readData();
  const newItem = {
    id: Date.now().toString(),
    ...req.body,
    createdAt: new Date().toISOString(),
    status: 'active'
  };
  data.items.push(newItem);
  
  if (writeData(data)) {
    res.status(201).json(newItem);
  } else {
    res.status(500).json({ error: 'Failed to create item' });
  }
});

app.put('/api/items/:id', (req, res) => {
  const data = readData();
  const index = data.items.findIndex(i => i.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  data.items[index] = {
    ...data.items[index],
    ...req.body,
    id: data.items[index].id,
    createdAt: data.items[index].createdAt
  };
  
  if (writeData(data)) {
    res.json(data.items[index]);
  } else {
    res.status(500).json({ error: 'Failed to update item' });
  }
});

app.delete('/api/items/:id', (req, res) => {
  const data = readData();
  const index = data.items.findIndex(i => i.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  data.items.splice(index, 1);
  
  if (writeData(data)) {
    res.json({ message: 'Item deleted successfully' });
  } else {
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

// ===== SUBSCRIBERS API =====
app.get('/api/subscribers', (req, res) => {
  const data = readData();
  res.json(data.subscribers);
});

app.post('/api/subscribe', (req, res) => {
  const { email } = req.body;
  
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' });
  }
  
  const data = readData();
  
  if (data.subscribers.find(s => s.email === email)) {
    return res.status(409).json({ error: 'Email already subscribed' });
  }
  
  const newSubscriber = {
    id: Date.now().toString(),
    email,
    subscribedAt: new Date().toISOString()
  };
  
  data.subscribers.push(newSubscriber);
  
  if (writeData(data)) {
    res.status(201).json({ message: 'Subscribed successfully', subscriber: newSubscriber });
  } else {
    res.status(500).json({ error: 'Failed to subscribe' });
  }
});

app.delete('/api/subscribers/:id', (req, res) => {
  const data = readData();
  const index = data.subscribers.findIndex(s => s.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Subscriber not found' });
  }
  
  data.subscribers.splice(index, 1);
  
  if (writeData(data)) {
    res.json({ message: 'Subscriber deleted successfully' });
  } else {
    res.status(500).json({ error: 'Failed to delete subscriber' });
  }
});

// ===== AUTH API =====
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const data = readData();
  
  if (username === data.admin.username && password === data.admin.password) {
    res.json({ 
      success: true, 
      token: 'paradox_token_' + Date.now(),
      message: 'Authentication successful'
    });
  } else {
    res.status(401).json({ success: false, error: 'Invalid credentials' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'alive', timestamp: new Date().toISOString() });
});

// ===== SERVE STATIC FILES =====
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// Handle SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🌌 Winchester Paradox Server running on port ${PORT}`);
});
