const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const movieRoutes = require('./routes/movie.routes'); 
const theatreRoutes = require('./routes/theatre.routes');
const authRoutes = require('./routes/auth.routes'); // now a Router
const userRoutes = require('./routes/user.routes'); // now a Router

const app = express();

// ---------------------------
// Middleware
// ---------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
});

// ---------------------------
// Register Routers
// ---------------------------
app.use('/mba/api/v1/auth', authRoutes);
app.use('/mba/api/v1/users', userRoutes);
movieRoutes(app);
theatreRoutes(app);

// ---------------------------
// 404 Catch-All
// ---------------------------
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API endpoint not found"
    });
});

// ---------------------------
// Global Error Handler
// ---------------------------
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error('🔥 Server Error:', err.stack || err);
    res.status(statusCode).json({
        success: false,
        err: err.message || "Internal Server Error",
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

// ---------------------------
// DB & Server
// ---------------------------
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
