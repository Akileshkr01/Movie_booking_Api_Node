const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const movieRoutes = require('./routes/movie.routes');
const theatreRoutes = require('./routes/theatre.routes');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

const app = express();

// Core middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Register routes
app.use('/mba/api/v1/movies', movieRoutes);
app.use('/mba/api/v1/theatres', theatreRoutes);
app.use('/mba/api/v1/auth', authRoutes);
app.use('/mba/api/v1/users', userRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "API endpoint not found" });
});

// Error handlers
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ success: false, message: 'Invalid JSON body' });
  }
  next(err);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error('🔥 Server Error:', err.stack || err);
  res.status(statusCode).json({
    success: false,
    err: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// DB + Server
const PORT = process.env.PORT || 3000;
const startServer = async () => {
  try {
    const dbUrl = process.env.DB_URL?.trim();
    if (!dbUrl) throw new Error('DB_URL is missing in .env');

    await mongoose.connect(dbUrl);
    console.log('✅ Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Startup failed:', err.message);
    process.exit(1);
  }
};

startServer();
