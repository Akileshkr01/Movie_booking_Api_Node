const {STATUS} = require('../utils/constants');
const {errorResponseBody} = require('../utils/responseBody');
const ObjectId = require('mongoose').Types.ObjectId;
const theatreService = require('../services/theatre.service');

const validateBookingCreateRequest = async(req,res,next) => {
    //validate the theatre id presence

    if(!req.body.theatreId){
        errorResponseBody.err = "No theatre id provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    // validate correct theatre id format 
    if(!ObjectId.isValid(req.body.theatreId)){
        errorResponseBody.err ="Invalid theatreid provided";
        return res.status(STATUS.BAD_REQUEST).json()
    }
}