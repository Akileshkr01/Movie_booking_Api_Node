const paymentService = require('../services/payment.service');
const {BOOKING_STATUS , STATUS} = require('../utils/constants');
const {errorResponseBody , successResponseBody} = require('../utils/responseBody');

const create = async (req, res) => {
    try{
        const response = await paymentService.createPayment(req.body);
        if(response.status == BOOKING_STATUS.expired){
            errorResponseBody.err = 'The payment took more than 5 minutes to get processed , hence you booking ';
            errorResponseBody.data = response;
            return res.status(STATUS.GONE).json(errorResponseBody);
        }
        if(response.status == BOOKING_STATUS.cancelled){
            errorResponseBody.err = 'The payment failed due to some reason , booking was not successfull , please';
            errorResponseBody.data =  response;
            return res.status(STATUS.PAYMENT_REQUIRED).json(errorResponseBody);
        }
        successResponseBody.data = response;
        successResponseBody.message = 'Booking completed successfully';
        return res.status(STATUS.OK).json(successResponseBody);
    } catch(error){
        if(error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}


const getPaymentsDetailsById = async (req,res) => {
    try{
        const response = await paymentService.getPaymentById(req.params.id);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetched the booking and payment details";
        return res.status(STATUS.OK)
    }
}
module.exports = {
    create
}