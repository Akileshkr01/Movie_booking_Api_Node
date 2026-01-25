const jwt = require("jsonwebtoken");
const userService = require("../services/user.service");

/**
 * Signup controller
 */
const signup = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);

    return res.status(201).json({
      success: true,
      message: "Successfully registered a user",
      data: user
    });

  } catch (error) {
    return res.status(error.statusCode || 400).json({
      success: false,
      message: error.message || "Something went wrong",
      err: error.details || error.message,
      data: {}
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
        success: false,
        err: "Invalid password for the given email",
        data: {}
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.AUTH_KEY,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      success: true,
      message: "Successfully logged in",
      data: {
        email: user.email,
        role: user.userRole,
        status: user.userStatus,
        token
      }
    });

  } catch (error) {
    return res.status(error.code || 500).json({
      success: false,
      err: error.err || "Internal Server Error",
      data: {}
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
        success: false,
        err: "Old password and new password are required",
        data: {}
      });
    }

    // req.user is attached by isAuthenticated middleware
    const user = await userService.getUserById(req.user.id);

    const isOldPasswordCorrect = await user.isValidPassword(oldPassword);
    if (!isOldPasswordCorrect) {
      return res.status(403).json({
        success: false,
        err: "Invalid old password",
        data: {}
      });
    }

    user.password = newPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Successfully updated the password",
      data: {
        id: user._id,
        email: user.email
      }
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      err: "Internal Server Error",
      data: {}
    });
  }
};

module.exports = {
  signup,
  signin,
  resetPassword
};
