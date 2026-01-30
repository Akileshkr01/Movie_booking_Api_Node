const {STATUS} = require('../utils/constants');
const  {errorResponseBody} = require('../utils/responseBody');
const ObjectId = require('mongoose').Types.ObjectId;

const verifyPaymentCreateRequest = async (req , res , next) => {
    // validate booking id presence
    if(!req.body.bookingId){
        errorResponseBody.err = 'No booking id received ';
        return res.status()
    }







    next();

}

module.exports ={
    verifyPaymentCreateRequest
}