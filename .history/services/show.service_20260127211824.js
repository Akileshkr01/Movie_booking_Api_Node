const Show = require('../models/show.model');
const Theatre = require('../models/theatre.model');
const { STATUS } = require('../utils/constants');

const createShow = async (data) => {
    try {
        const theatre = await Theatre.findById(data.theatreId);

        if (!theatre) {
            throw {
                err: 'No theatre found',
                code: STATUS.NOT_FOUND
            };
        }

        const movieExists = theatre.movies
            .map(movieId => movieId.toString())
            .includes(data.movieId.toString());

        if (!movieExists) {
            throw {
                err: 'Movie is currently not available in the requested theatre',
                code: STATUS.NOT_FOUND
            };
        }

        const response = await Show.create(data);
        return response;

    } catch (error) {
        if (error.name === 'ValidationError') {
            const err = {};
            Object.keys(error.errors).forEach(key => {
                err[key] = error.errors[key].message;
            });
            throw {
                err,
                code: STATUS.UNPROCESSABLE_ENTITY
            };
        }
        throw error;
    }
};

const getShows = async (data = {}) => {
    try {
        const filter = {};

        if (data.theatreId) {
            filter.theatreId = data.theatreId;
        }

        if (data.movieId) {
            filter.movieId = data.movieId;
        }

        const shows = await Show.find(filter).lean();
        if(!response){
            throw{
                err:''
            }
        }
        return shows;
    } catch (error) {
        throw new Error(error.message || "Failed to fetch shows");
    }
};


module.exports = {
    createShow,
    getShows
};
