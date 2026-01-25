const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// ---------------------------
// Import Routes
// ---------------------------
const movieRoutes = require('./routes/movie.routes');
const theatreRoutes = require('./routes/theatre.routes');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const app = express();

// ---------------------------
// Middleware
// ---------------------------
app.use(express.json()); // Handles all HTTP methods safely
app.use(express.urlencoded({ extended: true }));

// Enable mongoose debug only in development
if (process.env.NODE_ENV === 'development') {
  mongoose.set('debug', true);
}

// ---------------------------
// Routes
// ---------------------------
movieRoutes(app);
theatreRoutes(app);
authRoutes(app);
userRoutes
// ---------------------------
// Test Route
// ---------------------------
app.get('/home', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running and routes are registered',
  });
});

// ---------------------------
// Handle invalid JSON errors
// ---------------------------
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      message: 'Invalid JSON body',
    });
  }
  next(err);
});

// ---------------------------
// Server & MongoDB Connection
// ---------------------------
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    const dbUrl = process.env.DB_URL?.trim();
    if (!dbUrl) {
      throw new Error('DB_URL is not defined in .env');
    }

    await mongoose.connect(dbUrl);
    console.log('Connected to MongoDB:', mongoose.connection.name);

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });

  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

// ---------------------------
// Start Server
// ---------------------------
startServer();
