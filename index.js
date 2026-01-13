


/***const env = require("dotenv");
env.config();
const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Movie = require('./models/movie.model');
const MovieRoutes = require('./routes/movie.routes');
//console.log("Movie:", Movie);
//console.log("Type of Movie:", typeof Movie);
const app = express();//express app object

//configure body parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
console.log("DEBUG - What is MovieRoutes?:", MovieRoutes);
console.log("DEBUG - Type:", typeof MovieRoutes);
MovieRoutes(app); // involking movie routes 

app.get("/home", (req, res)=>{
    return res.json({
        success:true,
        message:"fetched home"
    });
});

app.listen(process.env.PORT, async() => {
    // this callback gets executed .once we succesfully start the server on the given port 
  console.log(`Server started on Port ${process.env.PORT}!!`);

try {
        // ENSURE YOUR .ENV FILE USES THE NAME "DB_URL"
        await mongoose.connect(process.env.DB_URL);
        console.log("Successfully connected to mongo");
    } catch (error) {
        console.error("Mongoose connection error:", error.message);
    }
}); 
***/
/***const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//configuring body parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/home/:id',(req,res) => {
    console.log("Hitting the /home");
    console.log(req.body,req.query,req.params); 
    return res.json({
        success:true,
        message:'fetched home'
    });
})

   app.listen(3000,() =>{
    console.log("Server started on the port 3000 !!");
   });  */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const MovieRoutes = require('./routes/movie.routes');

const app = express();

// body parser config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// register routes
MovieRoutes(app);

// test route
app.get('/home', (req, res) => {
    res.json({ success: true, message: 'API is running' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    console.log(`Server started on port ${PORT}`);

    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection failed:', err.message);
    }
});

