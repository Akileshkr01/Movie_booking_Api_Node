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
    INTERNAL_SERVER_ERROR : 500,
    CREATED: 201,
    UNAUTHORIZED: 401,
    NOT_FOUND : 404,
    
}
module.exports = {
    USER_ROLE,
    USER_STATUS
};
