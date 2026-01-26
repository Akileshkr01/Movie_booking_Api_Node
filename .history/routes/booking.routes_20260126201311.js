const bookingController = require('../controllers/booking.controller');

const routes = (app) => {
    app.post(
        '/mba/api/v1/booking',
        bookingController.create
    );
}
