const movieController = require('../controllers/movie.controller');
const movieMiddlewares = require('../middlewares/movie.middleware');

module.exports = (app) => {
    console.log('✅ Movie routes registered');

    // Create Movie
    app.post(
        '/mba/api/v1/movies',
        movieMiddlewares.validateMovieCreateRequest,
        movieController.createMovie
    );

    // Get Movie by ID
    app.get(
        '/mba/api/v1/movies/:id',
        movieController.getMovie
    );

    // Delete Movie
    app.delete(
        '/mba/api/v1/movies/:id',
        movieController.deleteMovie
    );
};