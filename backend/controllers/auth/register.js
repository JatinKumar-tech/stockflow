const User = require("../../models/User.model");
const { registerValidation } = require("../../services/validation_schema");
const sendMail = require("../../utilis/nodeMailer");
const register = async (req, res, next) => {
  try {
    const loginValues = await registerValidation.validateAsync(req.body);
    console.log(loginValues);
    const { username, password, email } = loginValues;

    const userVerification = await User.findOne({ email });
    console.log(userVerification);
    if (userVerification) {
      return res.status(400).json({
        message: "User Already exist",
        success: false,
      });
    } else {
      const newUser = new User({
        username,
        password,
        email,
      });
      console.log(newUser);
      await newUser.save();
      await sendMail(
        newUser.email,
        `Welcome to Stock Flow, ${newUser.username}!`,
        `
            <body style="margin:0;padding:0;font-family:Arial,sans-serif;background-color:#f4f4f4;">
              <table width="100%" cellpadding="0" cellspacing="0" style="padding: 20px;">
                <tr>
                  <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                      <tr>
                        <td style="background-color: #1e3a8a; color: white; text-align: center; padding: 20px;">
                          <h2 style="margin: 0;">Welcome to Stock Flow</h2>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 30px; color: #333;">
                          <p style="font-size: 16px;">Hello <strong>${newUser.username}</strong>,</p>
                          <p style="font-size: 16px;">Thank you for registering on <strong>Stock Flow</strong>. We're excited to have you on board!</p>
          
                          <p style="font-size: 16px;">Here are your account details:</p>
                          <table cellpadding="8" cellspacing="0" width="100%" style="background-color: #f1f5f9; border: 1px solid #d1d5db; border-radius: 6px; margin: 20px 0;">
                            <tr>
                              <td><strong>Email:</strong></td>
                              <td>${newUser.email}</td>
                            </tr>
                            <tr>
                               <td><strong>password:</strong></td>
                              <td>${newUser.password}</td>
                            </tr>
                          </table>
          
                         
          
                          <p style="text-align: center; margin: 30px 0;">
                            <a href="https://stockflow.in/login" style="display: inline-block; background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                              Login to Stock Flow
                            </a>
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="text-align: center; background-color: #1e3a8a; color: white; padding: 15px; font-size: 13px;">
                          &copy; 2025 Stock Flow Inc. | Patiala, Punjab | support@stockflow.in
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
            `
      );

      res.status(200).json({
        message: "User registered successfully",
        success: true,
        data: loginValues,
      });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = register;
