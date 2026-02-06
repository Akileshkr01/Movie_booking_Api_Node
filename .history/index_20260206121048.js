const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const movieRoutes = require('./routes/movie.routes');
const theatreRoutes = require('./routes/theatre.routes');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const bookingRoutes = require('./routes/booking.routes');
const showRoutes = require('./routes/show.routes');
const paymentRoutes = require('./routes/payment.routes');
const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
});

// Routes
movieRoutes(app);
theatreRoutes(app);
authRoutes(app);
userRoutes(app);
bookingRoutes(app);
showRoutes(app);
paymentRoutes(app);

// 404 Handler - Must come after all routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API endpoint not found"
    });
});

// Error Handlers - Must come last
// Handle malformed JSON
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ 
            success: false, 
            message: 'Invalid JSON body' 
        });
    }
    next(err);
});

// Final Error Handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(' Server Error:', err.stack || err);
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        err: {},
        data: {},
        // Only show stack trace in development mode
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

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
/***
 * try {
 *     await mongoose.connect(process.env.PROD_DB_URL);
 *      console.log("Successfully connected to mongo");
 *
 * } catch (err){
 *  console.log("")}
 * 
 */