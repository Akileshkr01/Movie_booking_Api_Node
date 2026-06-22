const errorResponseBody = {
    err: {},
    data: {},
    message: "Something went wrong",
    success: false
};

const successResponseBody = {
    err: {},
    data: {},
    message: "Successfully processed the request",
    success: true
};
module.exports = {
    errorResponseBody,
    successResponseBody
};