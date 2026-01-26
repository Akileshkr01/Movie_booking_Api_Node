const { STATUS,USER_ROLE,B } = require('../utils/constants');
const ObjectId = require('mongoose').Types.ObjectId;
const theatreService = require('../services/theatre.service');
const userService = require('../services/user.service');

const validateBookingCreateRequest = async (req, res, next) => {
  try {
    // validate theatreId presence
    if (!req.body.theatreId) {
      return res.status(STATUS.BAD_REQUEST).json({ err: "No theatre id provided" });
    }

    // validate theatreId format
    if (!ObjectId.isValid(req.body.theatreId)) {
      return res.status(STATUS.BAD_REQUEST).json({ err: "Invalid theatre id provided" });
    }

    // check if theatre exists
    const theatre = await theatreService.getTheatre(req.body.theatreId);
    if (!theatre) {
      return res.status(STATUS.NOT_FOUND).json({ err: "No theatre found for the given id" });
    }

    // validate movieId presence
    if (!req.body.movieId) {
      return res.status(STATUS.BAD_REQUEST).json({ err: "No movie id provided" });
    }

    // validate movieId format
    if (!ObjectId.isValid(req.body.movieId)) {
      return res.status(STATUS.BAD_REQUEST).json({ err: "Invalid movie id format" });
    }

    // validate movie exists in the theatre
    const movieExists = theatre.movies.some(
      movieId => movieId.toString() === req.body.movieId
    );

    if (!movieExists) {
      return res.status(STATUS.NOT_FOUND).json({
        err: "Given movie is not available in the requested theatre"
      });
    }

    // validate timing
    if (!req.body.timing) {
      return res.status(STATUS.BAD_REQUEST).json({ err: "No movie timing passed" });
    }

    // validate noOfSeats
    if (!req.body.noOfSeats || req.body.noOfSeats <= 0) {
      return res.status(STATUS.BAD_REQUEST).json({
        err: "Invalid number of seats provided"
      });
    }

    // request is valid
    next();
  } catch (err) {
    console.error(err);
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
      err: "Internal server error"
    });
  }
};

module.exports = {
  validateBookingCreateRequest
};
