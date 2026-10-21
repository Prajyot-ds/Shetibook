const express = require('express');
const { getDb } = require('../database/init');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const db = await getDb();
    const result = db.exec('SELECT * FROM schemes ORDER BY name');
    if (!result.length) return res.json([]);
    const cols = result[0].columns;
    const rows = result[0].values.map(r => {
      const obj = {}; cols.forEach((c, i) => obj[c] = r[i]); return obj;
    });
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
