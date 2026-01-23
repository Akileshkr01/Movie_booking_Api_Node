
const validateUpdateUserRequest = (req, res, next) => {
    const { userRole, userStatus } = req.body;

    // validate presence of at least one field
    if (
        (!userRole || userRole.trim() === "") &&
        (!userStatus || userStatus.trim() === "")
    ) {
        return res.status(400).json({
            success: false,
            err: "Malformed request, please send at least one parameter",
            data: {}
        });
    }

    return next();
};

module.exports = {
    validateUpdateUserRequest
};
