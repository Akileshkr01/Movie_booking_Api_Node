const theatreService = require('../services/theatre.service');
const { successResponseBody, errorResponseBody } = require('../utils/responseBody');

const create = async (req, res) => {
    try {
        const response = await theatreService.createTheatre(req.body);

        if (response?.err) {
            return res
                .status(response.code)
                .json({ ...errorResponseBody, err: response.err });
        }

        return res
            .status(201)
            .json({ ...successResponseBody, data: response });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ...errorResponseBody,
            err: 'Internal server error'
        });
    }
};

const destroy = async (req, res) => {
    try {
        const response = await theatreService.deleteTheatre(req.params.id);

        if (response?.err) {
            return res
                .status(response.code)
                .json({ ...errorResponseBody, err: response.err });
        }

        return res.json({ ...successResponseBody, data: response });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ...errorResponseBody,
            err: 'Internal server error'
        });
    }
};

const getTheatre = async (req, res) => {
    try {
        const response = await theatreService.getTheatre(req.params.id);

        if (response?.err) {
            return res
                .status(response.code)
                .json({ ...errorResponseBody, err: response.err });
        }

        return res.json({ ...successResponseBody, data: response });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ...errorResponseBody,
            err: 'Internal server error'
        });
    }
};

const getTheatres = async (req, res) => {
    try {
        const response = await theatreService.getAllTheatres(req.query);

        if (response && response.err) {
            return res.status(response.code).json({
                ...errorResponseBody,
                err: response.err
            });
        }

        return res.status(200).json({
            ...successResponseBody,
            data: response,
            message: "Successfully fetched all the theatres"
        });

    } catch (error) {
        return res.status(500).json({
            ...errorResponseBody,
            err: error.message
        });
    }
};


const update = async (req, res) => {
    try {
        const response = await theatreService.updateTheatre(
            req.params.id,
            req.body
        );

        if (response?.err) {
            return res
                .status(response.code)
                .json({ ...errorResponseBody, err: response.err });
        }

        return res.json({ ...successResponseBody, data: response });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ...errorResponseBody,
            err: 'Internal server error'
        });
    }
};

const updateMovies = async (req, res) => {
    try {
        const response = await theatreService.updateMoviesInTheatres(
            req.params.id,
            req.body.movieIds,
            req.body.insert
        );

        if (response?.err) {
            return res
                .status(response.code)
                .json({ ...errorResponseBody, err: response.err });
        }

        return res.json({ ...successResponseBody, data: response });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ...errorResponseBody,
            err: 'Internal server error'
        });
    }
};

const getMovies = async (req,res) => {
    try {
        
    } catch (error) {
        
    }
}

module.exports = {
    create,
    destroy,
    getTheatre,
    getTheatres,
    update,
    updateMovies
};
