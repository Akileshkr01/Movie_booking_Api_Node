const theatreController = require('../controllers/theatre.controller');
const theatreMiddleware = require('../middlewares/theatre.middleware');

const routes = (app) => {
    console.log(' Theatre routes registered');

    // CREATE
    app.post(
        '/mba/api/v1/theatres',
        theatreMiddleware.validateTheatreCreateRequest,
        theatreController.create
    );

    // DELETE
    app.delete(
        '/mba/api/v1/theatres/:id',
        theatreController.destroy
    );

    // READ ONE
    app.get(
        '/mba/api/v1/theatres/:id',
        theatreController.getTheatre
    );

    // READ ALL
    app.get(
        '/mba/api/v1/theatres',
        theatreController.getTheatres
    );

    // UPDATE Theatre details
    app.patch(
        '/mba/api/v1/theatres/:id',
        theatreController.update
    );

    // OPTIONAL: Keep PUT only if required
    app.put(
        '/mba/api/v1/theatres/:id',
        theatreController.update
    );

    // UPDATE Movies in Theatre 
    app.patch(
        '/mba/api/v1/theatres/:id/movies',
        theatreMiddleware.validateUpdateMoviesRequest,
        theatreController.updateMovies
    );
};

module.exports = routes;
