const Show = require('../models/show.model');
const { STATUS } = require('../utils/constants');

const createShow = async (data) => {
    try {
        const theatre = await Theatre.findById(data.theatreId);
        if(!theatre){
            throw{
                err:'No theatre found',
                code:STATUS.NOT_FOUND
            }
        }
        if()

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

module.exports = {
    createShow
};
