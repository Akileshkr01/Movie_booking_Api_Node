const { USER_ROLE, USER_STATUS, STATUS } = require('../utils/constants');
const { errorResponseBody } = require('../utils/responseBody');

const validateUpdateUserRequest = (req, res, next) => {
    const { userRole, userStatus } = req.body;

    // At least one field must be present
    if (!userRole && !userStatus) {
        return res.status(STATUS.BAD_REQUEST).json({
            ...errorResponseBody,
            err: "Malformed request, please send at least one parameter"
        });
    }

    // Validate userRole if provided
    if (userRole && !Object.values(USER_ROLE).includes(userRole)) {
        return res.status(STATUS.BAD_REQUEST).json({
            ...errorResponseBody,
            err: `Invalid userRole. Allowed values are: ${Object.values(USER_ROLE).join(', ')}`
        });
    }

    // Validate userStatus if provided
    if (userStatus && !Object.values(USER_STATUS).includes(userStatus)) {
        return res.status(STATUS.BAD_REQUEST).json({
            ...errorResponseBody,
            err: `Invalid userStatus. Allowed values are: ${Object.values(USER_STATUS).join(', ')}`
        });
    }

    next();
};

module.exports = {
    validateUpdateUserRequest
};
