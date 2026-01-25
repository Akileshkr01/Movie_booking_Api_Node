const theatreController = require('../controllers/theatre.controller');
const theatreMiddleware = require('../middlewares/theatre.middleware');

module.exports = (app) => {
    console.log(' Theatre routes registered');

    app.post(
        '/mba/api/v1/theatres',
        theatreMiddleware.validateTheatreCreateRequest,
        theatreController.create
    );

    app.delete(
        '/mba/api/v1/theatres/:id',
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
        '/mba/api/v1/theatres/:theatreId/movies/:movie'
    )
};
