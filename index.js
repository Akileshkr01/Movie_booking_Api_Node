const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Import Routes
const movieRoutes = require('./routes/movie.routes');
const theatreRoutes = require('./routes/theatre.routes'); 

const app = express();

/**
 * Middleware Configuration
 * Using built-in express methods instead of requiring 'body-parser'
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Route Registration
 */
movieRoutes(app);
theatreRoutes(app); 

// Basic Test Route
app.get('/home', (req, res) => {
    res.json({ 
        success: true, 
        message: 'API is running and Movie/Theatre routes are registered' 
    });
});

/**
 * Server and Database Connection
 */
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    console.log(` Server started on port ${PORT}`);

    try {
        // Ensure DB_URL is defined in your .env file
        await mongoose.connect(process.env.DB_URL);
        console.log(' Connected to MongoDB');
    } catch (err) {
        console.error(' MongoDB connection failed:', err.message);
        // Exit process if DB connection fails
        process.exit(1); 
    }
});