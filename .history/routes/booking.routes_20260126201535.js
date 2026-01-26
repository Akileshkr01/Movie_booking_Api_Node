const bookingController = require('../controllers/booking.controller');
const authMiddlewares = require('../middlewares/')
const routes = (app) => {
    app.post(
        '/mba/api/v1/booking',
        bookingController.create
    );
}

module.exports = routes;