const theatreController = require('../controllers/theatre.controller');
const theatreMiddleware = require('../middlewares/theatre.middleware');
const authMiddleware = require('../middlewares/auth.middlewares');
module.exports = (app) => {
    console.log(' Theatre routes registered');

    app.post(
        '/mba/api/v1/theatres',
        authMiddleware.isAuthenticated,
        authM
        theatreMiddleware.validateTheatreCreateRequest,
        theatreController.create
    );

    app.delete(
        '/mba/api/v1/theatres/:id',
        authMiddleware.isAuthenticated,
        theatreController.destroy
    );

    app.get(
        '/mba/api/v1/theatres/:id',
        theatreController.getTheatre
    );

    app.get(
        '/mba/api/v1/theatres',
        theatreController.getTheatres
    );

    app.patch(
        '/mba/api/v1/theatres/:id',
        theatreController.update
    );

    app.patch(
        '/mba/api/v1/theatres/:id/movies',
        theatreMiddleware.validateUpdateMoviesRequest,
        theatreController.updateMovies
    );

    app.get(
        '/mba/api/v1/theatres/:id/movies',
        theatreController.getMovies
    );
     
   app.get(
    '/mba/api/v1/theatres/:theatreId/movies/:movieId',
    theatreController.checkMovie
   );
};

