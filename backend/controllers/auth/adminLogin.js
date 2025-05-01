const User = require("../../models/User.model");
const { adminLoginValidation } = require("../../services/adminLoginValidation");

const loginAdmin = async (req, res, next) => {
  try {
    const loginValues = await adminLoginValidation.validateAsync(req.body);
    const { email, password } = loginValues;

    const admin = await User.findOne({ email });
    if (!admin) {
      return res.status(400).json({
        message: "Admin not found",
        success: false,
      });
    }

    if (admin.password === password) {
      return res.status(200).json({
        message: "Admin logged in successfully",
        success: true,
        admin: {
          username: admin.username,
          email: admin.email,
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

module.exports = loginAdmin;
