const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');




const app = express();

// Built-in body parsers (no need for body-parser package)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;

app.listen(PORT,async () => {
    console.log(`Notification server running on port ${PORT}`);
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('Successfully connected to mongo');
    } catch (error) {
        console.log(error);
    }
});
