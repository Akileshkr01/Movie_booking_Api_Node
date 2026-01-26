const {successResponseBody,errorResponseBody} = require('../utils/responseBody');
const bookingService = require('../services/booking.service');
const {STATUS} = require('../utils/constants');

const create = async