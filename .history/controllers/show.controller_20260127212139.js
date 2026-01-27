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


const get
module.exports = {
    create
};
