const Booking = require('../models/booking.model');
const { STATUS } = require('../utils/constants');

const createBooking = async (data) => {
  try {
    const response = await Booking.create(data);
    return response;

  } catch (error) {
    if (error.name === 'ValidationError') {
      const err = {};

      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });

      throw {
        err,
        code: STATUS.UNPROCESSABLE_ENTITY
      };
    }

    // fallback for unknown errors
    throw {
      err: "Failed to create booking",
      code: STATUS.INTERNAL_SERVER_ERROR
    };
  }
};

const updateBooking = async(data,bookingId) => {
    try {
        const response = await Booking.findByIdAndUpdate
    } catch (error) {
        
    }
}





module.exports = {
  createBooking
};
