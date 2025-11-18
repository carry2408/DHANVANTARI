const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files (so register.html and others load)
app.use(express.static(path.join(__dirname)));

// DB setup
const DB_PATH = path.join(__dirname, 'dhanvantari.db');
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) console.error('Failed to open DB', err);
  else console.log('Connected to SQLite DB:', DB_PATH);
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      healthId TEXT UNIQUE,
      password TEXT,
      name TEXT,
      gender TEXT,
      age INTEGER,
      phone TEXT,
      address TEXT,
      createdAt TEXT
    )
  `);
});

// Registration endpoint
app.post('/api/auth/patient/register', (req, res) => {
  try {
    const { healthId, password, name, gender, age, phone, address } = req.body || {};
    if (!healthId || !password || !name) {
      return res.status(400).json({ error: 'healthId, password and name are required' });
    }

    // Check exists
    db.get('SELECT id FROM users WHERE healthId = ?', [healthId], async (err, row) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (row) return res.status(409).json({ error: 'Health ID already registered' });

      // Hash password
      const hashed = await bcrypt.hash(password, 10);

      const stmt = db.prepare(`INSERT INTO users (healthId,password,name,gender,age,phone,address,createdAt) VALUES (?,?,?,?,?,?,?,?)`);
      stmt.run(healthId, hashed, name, gender || null, age || null, phone || null, address || null, new Date().toISOString(), function (insertErr) {
        if (insertErr) {
          console.error('Insert error:', insertErr);
          return res.status(500).json({ error: 'Failed to register user' });
        }
        return res.json({ success: true, id: this.lastID });
      });
      stmt.finalize();
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Simple health check
app.get('/api/health', (req, res) => res.json({ success: true }));

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
