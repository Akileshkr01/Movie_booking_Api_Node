const jwt = require("jsonwebtoken");
const userService = require("../services/user.service");
const {
  successResponseBody,
  errorResponseBody
} = require("../utils/");

/**
 * Signup controller
 */
const signup = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);

    return res.status(201).json({
      ...successResponseBody,
      message: "Successfully registered a user",
      data: user
    });

  } catch (error) {
    return res.status(error.statusCode || 400).json({
      ...errorResponseBody,
      message: error.message || "Signup failed",
      err: error.details || {}
    });
  }
};

/**
 * Signin controller
 */
const signin = async (req, res) => {
  try {
    const user = await userService.getUserByEmail(req.body.email);

    const isValidPassword = await user.isValidPassword(req.body.password);
    if (!isValidPassword) {
      return res.status(401).json({
        ...errorResponseBody,
        message: "Invalid password for the given email"
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.AUTH_KEY,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      ...successResponseBody,
      message: "Successfully logged in",
      data: {
        email: user.email,
        role: user.userRole,
        status: user.userStatus,
        token
      }
    });

  } catch (error) {
    return res.status(error.statusCode || 500).json({
      ...errorResponseBody,
      message: error.message || "Internal Server Error",
      err: error.details || {}
    });
  }
};

/**
 * Reset password controller
 */
const resetPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        ...errorResponseBody,
        message: "Old password and new password are required"
      });
    }

    const user = await userService.getUserById(req.user.id);

    const isOldPasswordCorrect = await user.isValidPassword(oldPassword);
    if (!isOldPasswordCorrect) {
      return res.status(403).json({
        ...errorResponseBody,
        message: "Invalid old password"
      });
    }

    user.password = newPassword;
    await user.save();

    return res.status(200).json({
      ...successResponseBody,
      message: "Successfully updated the password",
      data: {
        id: user._id,
        email: user.email
      }
    });

  } catch (error) {
    return res.status(500).json({
      ...errorResponseBody,
      message: "Internal Server Error"
    });
  }
};

module.exports = {
  signup,
  signin,
  resetPassword
};
