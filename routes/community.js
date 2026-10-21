const express = require('express');
const multer = require('multer');
const path = require('path');
const { getDb, saveDb } = require('../database/init');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, '_'))
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

router.get('/', async (req, res) => {
  try {
    const db = await getDb();
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const offset = (page - 1) * limit;
    const cat = req.query.category || '';
    let where = '';
    if (cat) where = `WHERE p.category='${cat.replace(/'/g, "''")}'`;
    const result = db.exec(`SELECT p.*, u.name as author_name FROM posts p JOIN users u ON p.user_id=u.id ${where} ORDER BY p.created_at DESC LIMIT ${limit} OFFSET ${offset}`);
    if (!result.length) return res.json([]);
    const cols = result[0].columns;
    const rows = result[0].values.map(r => {
      const obj = {}; cols.forEach((c, i) => obj[c] = r[i]); return obj;
    });
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', requireAuth, upload.single('image'), async (req, res) => {
  try {
    const { title, content, category } = req.body;
    if (!title || !content) return res.status(400).json({ error: 'Title and content required' });
    const imagePath = req.file ? '/uploads/' + req.file.filename : null;
    const db = await getDb();
    db.run('INSERT INTO posts (user_id,title,content,category,image_path) VALUES (?,?,?,?,?)',
      [req.session.userId, title, content, category || 'general', imagePath]);
    saveDb();
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/:id/like', requireAuth, async (req, res) => {
  try {
    const db = await getDb();
    db.run(`UPDATE posts SET likes=likes+1 WHERE id=${parseInt(req.params.id)}`);
    saveDb();
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/:id/comments', async (req, res) => {
  try {
    const db = await getDb();
    const result = db.exec(`SELECT c.*, u.name as author_name FROM comments c JOIN users u ON c.user_id=u.id WHERE c.post_id=${parseInt(req.params.id)} ORDER BY c.created_at ASC`);
    if (!result.length) return res.json([]);
    const cols = result[0].columns;
    const rows = result[0].values.map(r => {
      const obj = {}; cols.forEach((c, i) => obj[c] = r[i]); return obj;
    });
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/:id/comments', requireAuth, async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ error: 'Content required' });
    const db = await getDb();
    db.run('INSERT INTO comments (post_id,user_id,content) VALUES (?,?,?)',
      [parseInt(req.params.id), req.session.userId, content]);
    saveDb();
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
