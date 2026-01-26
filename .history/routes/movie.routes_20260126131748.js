const movieController = require('../controllers/movie.controller');
const movieMiddlewares = require('../middlewares/movie.middleware');
const authMiddlewares = require('../middlewares/auth.middlewares');
module.exports = (app) => {
    console.log('Movie routes registered');

    // Create Movie
    
    app.post(
        '/mba/api/v1/movies',
        authMiddlewares.isAuthenticated,
        authMiddlewares.isAdminOrClient,
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
        authMiddlewares.isAuthenticated,
        authMiddlewares.isAdminOrClient,
        movieController.deleteMovie
    );

    // Update Movie
    
    app.put(
        '/mba/api/v1/movies/:id',
        authMiddlewares.isAuthenticated,
        authMiddlewares.isAdminOrClient, 
        movieController.updateMovie
    );
    //Partial Update Movie
    
    app.patch(
        '/mba/api/v1/movies/:id',
        authMiddl 
        movieController.updateMovie
    );
    //Fetch the movies 
    
    app.get(
        '/mba/api/v1/movies',
        movieController.getMovies
    )
};