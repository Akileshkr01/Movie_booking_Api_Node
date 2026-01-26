const movieController = require('../controllers/movie.controller');
const movieMiddlewares = require('../middlewares/movie.middleware');

module.exports = (app) => {
    console.log('Movie routes registered');

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
    // Method: DELETE | URL: http://localhost:3000/mba/api/v1/movies/:id
    app.delete(
        '/mba/api/v1/movies/:id',
        movieController.deleteMovie
    );

    // Update Movie
    // Method: PUT | URL: http://localhost:3000/mba/api/v1/movies/:id
    app.put(
        '/mba/api/v1/movies/:id', 
        movieController.updateMovie
    );
    //Partial Update Movie
    //Method: PATCH | URL:http://localhost:3000/mba/api/v1/movies/:id
    app.patch(
        '/mba/api/v1/movies/:id', 
        movieController.updateMovie
    );
    //Fetch the movies 
    //Method:GET 
    app.get(
        '/mba/api/v1/movies',
        movieController.getMovies
    )
};