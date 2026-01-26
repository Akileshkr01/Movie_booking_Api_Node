const USER_STATUS = {
    APPROVED: 'Approved',
    PENDING: 'Pending',
    BLOCKED: 'Blocked'
};

const USER_ROLE = {
    CUSTOMER: 'CUSTOMER',
    ADMIN: 'ADMIN',
    CLIENT: 'CLIENT'
};


const STATUS_CODES = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500
};

const BOOKING_STATUS = {
    cancelled:"CANCELLED",
    successfull:"SUCCESSFULL",
    processing: "IN_PROCESS"
};

const PAYMENT_STATUS ={
    failed: "FAILED",
    success:""
}
module.exports = {
    USER_ROLE,
    USER_STATUS,
    BOOKING_STATUS,
    STATUS: STATUS_CODES
};
