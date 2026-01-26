const mongoose = require('mongoose');
const Theatre = require('../models/theatre.model');
const { STATUS } = require('../utils/constants');

/**
 * CREATE THEATRE
 */
const createTheatre = async (data) => {
    try {
        return await Theatre.create(data);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const err = {};
            Object.keys(error.errors).forEach(key => {
                err[key] = error.errors[key].message;
            });
            throw { err, code: STATUS.UNPROCESSABLE_ENTITY };
        }
        throw { err: error.message, code: STATUS.INTERNAL_SERVER_ERROR };
    }
};

/**
 * DELETE THEATRE
 */
const deleteTheatre = async (id) => {
    let theatre;

    try {
        theatre = await Theatre.findByIdAndDelete(id);
    } catch {
        throw { err: "Invalid theatre ID", code: STATUS.BAD_REQUEST };
    }

    if (!theatre) {
        throw { err: "No theatre found", code: STATUS.NOT_FOUND };
    }

    return theatre;
};

/**
 * GET ONE THEATRE
 */
const getTheatre = async (id) => {
    let theatre;

    try {
        theatre = await Theatre.findById(id);
    } catch {
        throw { err: "Invalid theatre ID", code: STATUS.BAD_REQUEST };
    }

    if (!theatre) {
        throw { err: "No theatre found", code: STATUS.NOT_FOUND };
    }

    return theatre;
};

/**
 * GET ALL THEATRES
 */
const getAllTheatres = async (queryParams) => {
    try {
        const query = {};
        const options = {};

        if (queryParams.city) query.city = queryParams.city;
        if (queryParams.pincode) query.pincode = queryParams.pincode;
        if (queryParams.name) query.name = queryParams.name;

        if (queryParams.movieId) {
            if (!mongoose.Types.ObjectId.isValid(queryParams.movieId)) {
                throw { err: "Invalid movieId format", code: STATUS.BAD_REQUEST };
            }
            query.movies = queryParams.movieId;
        }

        if (queryParams.limit) options.limit = parseInt(queryParams.limit, 10);
        if (queryParams.skip !== undefined) {
            const perPage = options.limit || 5;
            options.skip = parseInt(queryParams.skip, 10) * perPage;
        }

        return await Theatre.find(query, null, options).populate('movies');

    } catch (error) {
        throw error.code
            ? error
            : { err: "Database error while fetching theatres", code: STATUS.INTERNAL_SERVER_ERROR };
    }
};

/**
 * UPDATE THEATRE
 */
const updateTheatre = async (id, data) => {
    try {
        const theatre = await Theatre.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        });

        if (!theatre) {
            throw { err: "No theatre found", code: STATUS.NOT_FOUND };
        }

        return theatre;

    } catch (error) {
        if (error.name === 'ValidationError') {
            const err = {};
            Object.keys(error.errors).forEach(key => {
                err[key] = error.errors[key].message;
            });
            throw { err, code: STATUS.UNPROCESSABLE_ENTITY };
        }

        throw error.code
            ? error
            : { err: "Invalid theatre ID", code: STATUS.BAD_REQUEST };
    }
};

/**
 * UPDATE MOVIES IN THEATRE
 */
const updateMoviesInTheatres = async (theatreId, movieIds, insert) => {
    const theatre = await Theatre.findById(theatreId);

    if (!theatre) {
        throw { err: "No theatre found", code: STATUS.NOT_FOUND };
    }

    if (insert) {
        movieIds.forEach(id => theatre.movies.addToSet(id));
    } else {
        theatre.movies = theatre.movies.filter(
            id => !movieIds.includes(id.toString())
        );
    }

    await theatre.save();
    return theatre.populate('movies');
};

/**
 * GET MOVIES IN A THEATRE
 */
const getMoviesInAtheatre = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw { err: "Invalid theatre id", code: STATUS.BAD_REQUEST };
    }

    const theatre = await Theatre.findById(
        id,
        { name: 1, movies: 1, address: 1 }
    ).populate('movies');

    if (!theatre) {
        throw { err: "No theatre with the given id found", code: STATUS.NOT_FOUND };
    }

    return theatre;
};

/**
 * CHECK MOVIE IN A THEATRE
 */
const checkMovieInATheatre = async (theatreId, movieId) => {
    if (
        !mongoose.Types.ObjectId.isValid(theatreId) ||
        !mongoose.Types.ObjectId.isValid(movieId)
    ) {
        throw { err: "Invalid theatreId or movieId", code: STATUS.BAD_REQUEST };
    }

    const theatre = await Theatre.findById(theatreId);

    if (!theatre) {
        throw { err: "No such theatre found", code: STATUS.NOT_FOUND };
    }

    return {
        isMoviePresent: theatre.movies.includes(movieId)
    };
};

module.exports = {
    createTheatre,
    deleteTheatre,
    getTheatre,
    getAllTheatres,
    updateTheatre,
    updateMoviesInTheatres,
    getMoviesInAtheatre,
    checkMovieInATheatre
};
