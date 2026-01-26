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

const getBookings = async (userId) => {
  try {
    const bookings = await Booking.find({ userId });
    return bookings;
  } catch (error) {
    throw {
      err: "Failed to fetch user bookings",
      code: STATUS.INTERNAL_SERVER_ERROR
    };
  }
};

const getAllBookings = async () => {
  try {
    const bookings = await Booking.find();
    return bookings;
  } catch (error) {
    throw {
      err: "Failed to fetch bookings",
      code: STATUS.INTERNAL_SERVER_ERROR
    };
  }
};

const getBookingsById = async (id, userId) => {
    try {
        const response = await Booking.findById(id);
        if(!response){
            throw{
                err:'No booking records found for the id',
                code: STATUS.NOT_FOUND
            }
        }
        if(response.userId != userId){
            throw{
                err:'Not able to access the booking',
                code:STATUS.UNAUTHORIZED
            }
        }
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


module.exports = {
  createBooking,
  updateBooking,
  getBookings,
  getAllBookings,
  
};
