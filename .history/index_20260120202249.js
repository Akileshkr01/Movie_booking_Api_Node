const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// ---------------------------
// Import Routes
// ---------------------------
const movieRoutes = require('./routes/movie.routes');
const theatreRoutes = require('./routes/theatre.routes');

const app = express();

// ---------------------------
// Middleware
// ---------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------------------------
// Routes
// ---------------------------
movieRoutes(app);
theatreRoutes(app);

// ---------------------------
// Test Route
// ---------------------------
app.get('/home', (req, res) => {
  res.json({
    success: true,
    message: 'API is running and Movie/Theatre routes are registered',
  });
});

// ---------------------------
// Server & MongoDB Connection
// ---------------------------
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Read DB_URL from .env and trim spaces
    const dbUrl = process.env.DB_URL?.trim();
    if (!dbUrl) {
      throw new Error('DB_URL is not defined in .env');
    }

    // Connect to MongoDB (Updated for Mongoose 7+)
    await mongoose.connect(dbUrl); // No deprecated options needed

    console.log(' Connected to MongoDB:', mongoose.connection.name);

    // Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server started on port ${PORT}`);
    });

  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1); // Exit if DB connection fails
  }
};

// Start the server
startServer();
