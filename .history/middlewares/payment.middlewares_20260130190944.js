const {STATUS} = require('../utils/constants');
const  {errorResponseBody} = require('../utils/responseBody');
const ObjectId = require('mongoose').Types.ObjectId;

const verifyPaymentCreateRequest = async (req , res , next) => {
    // validate booking id presence
    if(!req.body.bookingId){
        errorResponseBody.err = 'No booking id received ';
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    // validate correct booking id 
    if(!ObjectId.isValid(req.body.bookingId)){
        errorResponseBody.err = 'Invalid booking id '
    }






    next();

}

module.exports ={
    verifyPaymentCreateRequest
}