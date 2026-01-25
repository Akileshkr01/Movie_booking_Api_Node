const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const movieRoutes = require('./routes/movie.routes');
const theatreRoutes = require('./routes/theatre.routes');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

const app = express();

// ---------------------------
// 1. Core Security & Parsing Middleware
// ---------------------------
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// ---------------------------
// 2. Logging (Phase 6 Requirement)
// ---------------------------
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
});

// ---------------------------
// 3. Register Routes
// ---------------------------
movieRoutes(app);
theatreRoutes(app);
authRoutes(app);
userRoutes(app);

// ---------------------------
// 4. 404 Catch-All (Industry Best Practice)
// ---------------------------
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API endpoint not found"
    });
});

// ---------------------------
// 5. Global Error Handlers (The Safety Net)
// ---------------------------
// Handle malformed JSON
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ success: false, message: 'Invalid JSON body' });
    }
    next(err);
});

// Final Error Logger & Responder
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error('🔥 Server Error:', err.stack || err);
    res.status(statusCode).json({
        success: false,
        err: err.message || "Internal Server Error",
        // Only show stack trace in development mode
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined 
    });
});

// ---------------------------
// 6. Database & Server Start
// ---------------------------
const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        const dbUrl = process.env.DB_URL?.trim();
        if (!dbUrl) throw new Error('DB_URL is missing in .env');

        await mongoose.connect(dbUrl);
        console.log(' Connected to MongoDB');

        app.listen(PORT, () => {
            console.log(` Server running at http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error(' Startup failed:', err.message);
        process.exit(1);
    }
};

startServer(); 