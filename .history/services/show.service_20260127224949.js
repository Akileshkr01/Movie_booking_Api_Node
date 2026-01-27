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
        const filter = {
            ...(data.theatreId && { theatreId: data.theatreId }),
            ...(data.movieId && { movieId: data.movieId }),
        };

        const shows = await Show.find(filter).lean();

        if (!shows || shows.length === 0) {
            const error = new Error("No shows found");
            error.code = STATUS.NOT_FOUND;
            throw error;
        }

        return shows;
    } catch (error) {
        throw error; 
    }
};

const deleteShow = async (id) => {
    try {
        const response = await Show.findByIdAndDelete(id);

        if (!response) {
            const error = new Error('No show found');
            error.code = STATUS.NOT_FOUND;
            throw error;
        }

        return response;
    } catch (error) {
        throw error;
    }
};


const updateShow = async (id,data) => {
    try {
        const response = await Show.findByIdAndUpdate(id,data,{
            new:true,
            runValidators:true
        });
        if(!response)
    } catch (error) {
        
    }
}


module.exports = {
    createShow,
    getShows,
    deleteShow
};
