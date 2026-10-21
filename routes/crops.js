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
    const result = db.exec('SELECT * FROM crops ORDER BY name');
    if (!result.length) return res.json([]);
    const cols = result[0].columns;
    const rows = result[0].values.map(r => {
      const obj = {}; cols.forEach((c, i) => obj[c] = r[i]); return obj;
    });
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const db = await getDb();
    const cropRes = db.exec(`SELECT * FROM crops WHERE id=${parseInt(req.params.id)}`);
    if (!cropRes.length || !cropRes[0].values.length) return res.status(404).json({ error: 'Crop not found' });
    const cols = cropRes[0].columns;
    const crop = {}; cols.forEach((c, i) => crop[c] = cropRes[0].values[0][i]);
    const disRes = db.exec(`SELECT * FROM diseases WHERE crop_id=${crop.id}`);
    crop.diseases = [];
    if (disRes.length) {
      const dCols = disRes[0].columns;
      crop.diseases = disRes[0].values.map(r => {
        const obj = {}; dCols.forEach((c, i) => obj[c] = r[i]); return obj;
      });
    }
    res.json(crop);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/diagnose', requireAuth, upload.single('image'), async (req, res) => {
  try {
    const { description } = req.body;
    const imagePath = req.file ? '/uploads/' + req.file.filename : null;
    const db = await getDb();
    // Keyword-based disease matching
    const allDiseases = db.exec('SELECT d.*, c.name as crop_name, c.name_hi as crop_name_hi, c.name_mr as crop_name_mr FROM diseases d JOIN crops c ON d.crop_id=c.id');
    let matches = [];
    if (allDiseases.length && description) {
      const dCols = allDiseases[0].columns;
      const words = description.toLowerCase().split(/\s+/);
      allDiseases[0].values.forEach(row => {
        const disease = {}; dCols.forEach((c, i) => disease[c] = row[i]);
        const searchText = `${disease.name} ${disease.symptoms} ${disease.cause} ${disease.name_hi} ${disease.symptoms_hi} ${disease.name_mr} ${disease.symptoms_mr}`.toLowerCase();
        let score = 0;
        words.forEach(w => { if (w.length > 2 && searchText.includes(w)) score++; });
        if (score > 0) matches.push({ ...disease, score });
      });
      matches.sort((a, b) => b.score - a.score);
      matches = matches.slice(0, 3);
    }
    const matchedId = matches.length > 0 ? matches[0].id : null;
    db.run('INSERT INTO diagnoses (user_id,description,image_path,matched_disease_id,result_text) VALUES (?,?,?,?,?)',
      [req.session.userId, description || '', imagePath, matchedId, JSON.stringify(matches)]);
    saveDb();
    res.json({ matches, imagePath });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/diagnoses/history', requireAuth, async (req, res) => {
  try {
    const db = await getDb();
    const result = db.exec(`SELECT d.*, dis.name as disease_name FROM diagnoses d LEFT JOIN diseases dis ON d.matched_disease_id=dis.id WHERE d.user_id=${req.session.userId} ORDER BY d.created_at DESC`);
    if (!result.length) return res.json([]);
    const cols = result[0].columns;
    const rows = result[0].values.map(r => {
      const obj = {}; cols.forEach((c, i) => obj[c] = r[i]); return obj;
    });
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
