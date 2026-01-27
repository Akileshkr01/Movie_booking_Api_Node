const showService = require('../services/show.service');
const { successResponseBody, errorResponseBody } = require('../utils/responseBody');
const { STATUS } = require('../utils/constants');

const create = async (req, res) => {
    try {
        const response = await showService.createShow(req.body);

        return res.status(STATUS.CREATED).json({
            ...successResponseBody,
            message: "Successfully created the show",
            data: response
        });
    } catch (error) {
        if (error.err) {
            return res.status(error.code).json({
                ...errorResponseBody,
                err: error.err
            });
        }

        return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
            ...errorResponseBody,
            err: error
        });
    }
};


const getShow = async (req, res) => {
    try {
        const response = await showService.getShows(req.query);

        return res.status(STATUS.OK).json({
            ...successResponseBody,
            message: "Successfully fetched the movie shows",
            data: response
        });

    } catch (error) {
        return res.status(error.code || STATUS.INTERNAL_SERVER_ERROR).json({
            ...errorResponseBody,
            err: error.message || "Something went wrong"
        });
    }
};

const destroy = async (req,res) => {
    try {
        const response = await showService.deleteShow(req.params.id);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully deleted the show";
        return res.status(STATUS.OK).json()
    } catch (error) {
        
    }
}

module.exports = {
    create,
    getShow
};
