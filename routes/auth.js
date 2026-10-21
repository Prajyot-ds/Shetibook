const express = require('express');
const bcrypt = require('bcryptjs');
const { getDb, saveDb } = require('../database/init');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password, state, district, language_pref } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'Name, email and password are required' });
    const db = await getDb();
    const existing = db.exec(`SELECT id FROM users WHERE email='${email.replace(/'/g,"''")}'`);
    if (existing.length > 0 && existing[0].values.length > 0) return res.status(400).json({ error: 'Email already registered' });
    const hash = await bcrypt.hash(password, 10);
    db.run(`INSERT INTO users (name,email,phone,password_hash,state,district,language_pref) VALUES (?,?,?,?,?,?,?)`,
      [name, email, phone || '', hash, state || '', district || '', language_pref || 'en']);
    saveDb();
    const result = db.exec(`SELECT id,name,email,phone,state,district,language_pref FROM users WHERE email='${email.replace(/'/g,"''")}'`);
    const user = result[0].values[0];
    req.session.userId = user[0];
    res.json({ success: true, user: { id: user[0], name: user[1], email: user[2], phone: user[3], state: user[4], district: user[5], language_pref: user[6] }});
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
    const db = await getDb();
    const result = db.exec(`SELECT id,name,email,phone,password_hash,state,district,language_pref FROM users WHERE email='${email.replace(/'/g,"''")}'`);
    if (!result.length || !result[0].values.length) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const user = result[0].values[0];
    const valid = await bcrypt.compare(password, user[4]);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    req.session.userId = user[0];
    res.json({ success: true, user: { id: user[0], name: user[1], email: user[2], phone: user[3], state: user[5], district: user[6], language_pref: user[7] }});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

router.get('/me', async (req, res) => {
  if (!req.session || !req.session.userId) return res.status(401).json({ error: 'Not logged in' });
  try {
    const db = await getDb();
    const result = db.exec(`SELECT id,name,email,phone,state,district,language_pref FROM users WHERE id=${req.session.userId}`);
    if (!result.length || !result[0].values.length) return res.status(401).json({ error: 'User not found' });
    const u = result[0].values[0];
    res.json({ user: { id: u[0], name: u[1], email: u[2], phone: u[3], state: u[4], district: u[5], language_pref: u[6] }});
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
