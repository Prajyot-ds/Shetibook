const express = require('express');
const bcrypt = require('bcryptjs');
const { getDb, saveDb } = require('../database/init');
const router = express.Router();

// Helper to normalize and validate email
function normalizeEmail(email) {
  if (!email || typeof email !== 'string') return '';
  return email.trim().toLowerCase();
}

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    let { name, email, phone, password, state, district, language_pref } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    name = String(name).trim();
    email = normalizeEmail(email);
    phone = phone ? String(phone).trim() : '';
    state = state ? String(state).trim() : '';
    district = district ? String(district).trim() : '';
    language_pref = language_pref ? String(language_pref).trim() : 'en';

    if (name.length < 2) {
      return res.status(400).json({ error: 'Please enter a valid full name' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address' });
    }

    if (String(password).length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    const db = await getDb();

    // Check for existing user case-insensitively
    const checkStmt = db.prepare('SELECT id FROM users WHERE LOWER(email) = ?');
    checkStmt.bind([email]);
    const exists = checkStmt.step();
    checkStmt.free();

    if (exists) {
      return res.status(400).json({ error: 'An account with this email already exists. Please log in.' });
    }

    const hash = await bcrypt.hash(password, 10);
    db.run(
      'INSERT INTO users (name, email, phone, password_hash, state, district, language_pref) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, email, phone, hash, state, district, language_pref]
    );
    saveDb();

    // Fetch created user
    const userStmt = db.prepare('SELECT id, name, email, phone, state, district, language_pref FROM users WHERE LOWER(email) = ?');
    userStmt.bind([email]);
    if (!userStmt.step()) {
      userStmt.free();
      return res.status(500).json({ error: 'Failed to retrieve registered user' });
    }
    const row = userStmt.get();
    userStmt.free();

    const user = {
      id: row[0],
      name: row[1],
      email: row[2],
      phone: row[3],
      state: row[4],
      district: row[5],
      language_pref: row[6]
    };

    req.session.userId = user.id;
    req.session.save((saveErr) => {
      if (saveErr) console.error('Session save error on register:', saveErr);
      res.json({ success: true, message: 'Account created successfully', user });
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: err.message || 'Registration failed' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    email = normalizeEmail(email);
    password = String(password);

    const db = await getDb();

    // Use prepared statement to prevent SQL injection and ensure case-insensitive email match
    const stmt = db.prepare('SELECT id, name, email, phone, password_hash, state, district, language_pref FROM users WHERE LOWER(email) = ?');
    stmt.bind([email]);

    if (!stmt.step()) {
      stmt.free();
      return res.status(401).json({ error: 'No account found with this email. Please check your spelling or register.' });
    }

    const row = stmt.get();
    stmt.free();

    const passwordHash = row[4];
    const valid = await bcrypt.compare(password, passwordHash);

    if (!valid) {
      return res.status(401).json({ error: 'Incorrect password. Please try again.' });
    }

    const user = {
      id: row[0],
      name: row[1],
      email: row[2],
      phone: row[3],
      state: row[5],
      district: row[6],
      language_pref: row[7]
    };

    req.session.userId = user.id;
    req.session.save((saveErr) => {
      if (saveErr) console.error('Session save error on login:', saveErr);
      res.json({
        success: true,
        message: 'Login successful',
        user
      });
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: err.message || 'Login failed due to a server error' });
  }
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.json({ success: true });
  });
});

// GET /api/auth/me
router.get('/me', async (req, res) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: 'Not logged in' });
  }

  try {
    const db = await getDb();
    const stmt = db.prepare('SELECT id, name, email, phone, state, district, language_pref FROM users WHERE id = ?');
    stmt.bind([req.session.userId]);

    if (!stmt.step()) {
      stmt.free();
      return res.status(401).json({ error: 'User session invalid' });
    }

    const row = stmt.get();
    stmt.free();

    const user = {
      id: row[0],
      name: row[1],
      email: row[2],
      phone: row[3],
      state: row[4],
      district: row[5],
      language_pref: row[6]
    };

    res.json({ user });
  } catch (err) {
    console.error('Auth verification error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
