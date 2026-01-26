const bookingController = require('../controllers/booking.controller');
const authMiddlewares = require('../middlewares/auth.middlewares');
const bookingMiddlewares = require('../middlewares/booking.middlewares');
const routes = (app) => {
    app.post(
        '/mba/api/v1/booking',
        authMiddlewares.isAuthenticated,
        bookingMiddlewares.validateBookingCreateRequest,
        bookingController.create
    );

    app.patch(
        '/mba/api/v1/booking/:id',
        authMiddlewares.isAuthenticated,
        bookingMiddlewares.
        bookingController.update
    );
}

module.exports = routes;