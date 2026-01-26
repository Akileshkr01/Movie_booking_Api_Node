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

const updateBooking = async (bookingId, data) => {
  try {
    const response = await Booking.findByIdAndUpdate(
      bookingId,
      data,
      { new: true, runValidators: true }
    );

    if (!response) {
      throw {
        err: "No booking found for the given id",
        code: STATUS.NOT_FOUND
      };
    }

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

    throw {
      err: "Failed to update booking",
      code: STATUS.INTERNAL_SERVER_ERROR
    };
  }
};

const getBookings = async (data) => {
    try
}




module.exports = {
  createBooking,
  updateBooking
};
