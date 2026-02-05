const theatreService = require('../services/theatre.service');
const { successResponseBody, errorResponseBody } = require('../utils/responseBody');
const { STATUS } = require('../utils/constants');
const sendM


const create = async (req, res) => {
    try {
        const theatre = await theatreService.createTheatre({...req.body , owner: req.user});
        sendMail(
            'Successfully created a theatre',
            req.user,
            'You have successfully created a new theatre'
        );

        return res.status(STATUS.CREATED).json({
            ...successResponseBody,
            data: theatre
        });
    } catch (err) {
        return res.status(err.code || STATUS.INTERNAL_SERVER_ERROR).json({
            ...errorResponseBody,
            err: err.err || err.message || err
        });
    }
};

const destroy = async (req, res) => {
    try {
        const theatre = await theatreService.deleteTheatre(req.params.id);
        return res.status(STATUS.OK).json({
            ...successResponseBody,
            data: theatre
        });
    } catch (err) {
        return res.status(err.code || STATUS.INTERNAL_SERVER_ERROR).json({
            ...errorResponseBody,
            err: err.err || err.message || err
        });
    }
};

const getTheatre = async (req, res) => {
    try {
        const theatre = await theatreService.getTheatre(req.params.id);
        return res.status(STATUS.OK).json({
            ...successResponseBody,
            data: theatre
        });
    } catch (err) {
        return res.status(err.code || STATUS.INTERNAL_SERVER_ERROR).json({
            ...errorResponseBody,
            err: err.err || err.message || err
        });
    }
};

const getTheatres = async (req, res) => {
    try {
        const theatres = await theatreService.getAllTheatres(req.query);
        return res.status(STATUS.OK).json({
            ...successResponseBody,
            data: theatres
        });
    } catch (err) {
        return res.status(err.code || STATUS.INTERNAL_SERVER_ERROR).json({
            ...errorResponseBody,
            err: err.err || err.message || err
        });
    }
};

const update = async (req, res) => {
    try {
        const theatre = await theatreService.updateTheatre(req.params.id, req.body);
        return res.status(STATUS.OK).json({
            ...successResponseBody,
            data: theatre
        });
    } catch (err) {
        return res.status(err.code || STATUS.INTERNAL_SERVER_ERROR).json({
            ...errorResponseBody,
            err: err.err || err.message || err
        });
    }
};

const updateMovies = async (req, res) => {
    try {
        const theatre = await theatreService.updateMoviesInTheatres(
            req.params.id,
            req.body.movieIds,
            req.body.insert
        );
        return res.status(STATUS.OK).json({
            ...successResponseBody,
            data: theatre
        });
    } catch (err) {
        return res.status(err.code || STATUS.INTERNAL_SERVER_ERROR).json({
            ...errorResponseBody,
            err: err.err || err.message || err
        });
    }
};

const getMovies = async (req, res) => {
    try {
        const theatre = await theatreService.getMoviesInAtheatre(req.params.id);
        return res.status(STATUS.OK).json({
            ...successResponseBody,
            data: theatre
        });
    } catch (err) {
        return res.status(err.code || STATUS.INTERNAL_SERVER_ERROR).json({
            ...errorResponseBody,
            err: err.err || err.message || err
        });
    }
};

const checkMovie = async (req, res) => {
    try {
        const result = await theatreService.checkMovieInATheatre(
            req.params.theatreId,
            req.params.movieId
        );
        return res.status(STATUS.OK).json({
            success: true,
            data: result
        });
    } catch (err) {
        return res.status(err.code || STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            err: err.err || err.message || err
        });
    }
};

module.exports = {
    create,
    destroy,
    getTheatre,
    getTheatres,
    update,
    updateMovies,
    getMovies,
    checkMovie
};
