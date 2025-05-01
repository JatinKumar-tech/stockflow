const User = require("../../models/User.model");
const { registerValidation } = require("../../services/validation_schema");

const login = async (req, res, next) => {
  try {
    // Validate input using the Joi schema
    const loginValues = await registerValidation.validateAsync(req.body);
    console.log(loginValues);
    const { email, password } = loginValues;

    // Check if the user exists
    const userVerification = await User.findOne({ email });
    
    if (!userVerification) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    console.log(userVerification);

    // Check if password matches
    if (userVerification.password === password) {
      return res.status(200).json({
        message: "Logged in successfully",
        success: true,
        user: {
          username: userVerification.username, // Send the username
          email: userVerification.email,       // Send the email
        },
      });
    } else {
      return res.status(400).json({
        message: "Invalid credentials",
        success: false,
      });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = login;
