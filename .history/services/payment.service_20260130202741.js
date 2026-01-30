const Payment = require('../models/payment.model');
const Booking = require('../models/booking.model');
const {STATUS,BOOKING_STATUS,PAYMENT_STATUS} = require('../utils/constants');


const createPayment = async(data)