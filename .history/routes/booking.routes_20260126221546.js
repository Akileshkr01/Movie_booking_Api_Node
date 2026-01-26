const bookingController = require('../controllers/booking.controller');
const authMiddlewares = require('../middlewares/auth.middlewares');
const bookingMiddlewares 
const routes = (app) => {
    app.post(
        '/mba/api/v1/booking',
        authMiddlewares.isAuthenticated,
        bookingController.create
    );
}

module.exports = routes;