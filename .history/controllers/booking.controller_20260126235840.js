const { STATUS } = require('../utils/constants');
const bookingService = require('../services/booking.service');

const create = async (req, res) => {
  try {
    const userId = req.user._id || req.user;

    const response = await bookingService.createBooking({
      ...req.body,
      userId
    });

    return res.status(STATUS.CREATED).json({
      message: "Successfully created a booking",
      data: response
    });

  } catch (error) {
    if (error.err && error.code) {
      return res.status(error.code).json({
        err: error.err
      });
    }

    console.error(error);

    return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
      err: "Internal server error"
    });
  }
};

const update = async (req,res) => {
    try {
        const response = await bookingService.updateBooking(req.body, req.params.id);
        su
    } catch (error) {
        
    }
}


module.exports = {
  create
};
