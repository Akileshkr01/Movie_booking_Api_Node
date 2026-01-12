const MovieController = require('../controllers/movie.controller'); 

// Direct export of the function
module.exports = (app) => {
    console.log("✅ Routes are being registered...");
    app.post('/mba/api/v1/movies', MovieController.createMovie);
};