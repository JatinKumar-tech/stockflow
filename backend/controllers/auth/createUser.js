const User = require("../../models/User.model");
const { createUserValidation } = require("../../services/createUserValidation");

const createUser = async (req, res, next) => {
  const createValues = await createUserValidation.validateAsync(req.body);
  const { username, email, password, role } = createValues;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const user = await User.create({
      username,
      email,
      password,
      role,
    });
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: user,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


module.exports = createUser