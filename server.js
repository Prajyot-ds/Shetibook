const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const DEFAULT_PORT = Number(process.env.PORT) || 3000;

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'shetibook-secret-key-2024',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(uploadsDir));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/crops', require('./routes/crops'));
app.use('/api/posts', require('./routes/community'));
app.use('/api/schemes', require('./routes/schemes'));

// SPA fallback - serve index.html for unmatched routes
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  }
});

// Initialize DB then start server
const { getDb } = require('./database/init');

function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`\n🌾 ShetiBook server running at http://localhost:${port}\n`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      const nextPort = port + 1;
      console.warn(`Port ${port} is busy. Trying ${nextPort} instead...`);
      startServer(nextPort);
      return;
    }

    console.error('Server startup error:', err);
    process.exit(1);
  });
}

getDb().then(() => {
  startServer(DEFAULT_PORT);
}).catch(err => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});
