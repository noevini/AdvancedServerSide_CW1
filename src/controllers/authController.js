const authService = require("../services/authService");

const authController = {
  register: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          error: "Email and password are required",
        });
      }

      const result = await authService.registerUser(email, password);

      return res.status(201).json({
        message: "User registered successfully",
        user: result.user,
        verification_token: result.verification_token,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          error: "Email and password are required",
        });
      }

      const result = await authService.loginUser(email, password);

      return res.status(200).json({
        message: "Login successful",
        token: result.token,
        user: result.user,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  },

  verifyEmail: async (req, res) => {
    try {
      const { token } = req.body;

      if (!token) {
        return res.status(400).json({
          error: "Verification token is required",
        });
      }

      const result = await authService.verifyEmail(token);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  },

  requestPasswordReset: async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          error: "Email is required",
        });
      }

      const result = await authService.requestPasswordReset(email);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { token, new_password } = req.body;

      if (!token || !new_password) {
        return res.status(400).json({
          error: "Token and new password are required",
        });
      }

      const result = await authService.resetPassword(token, new_password);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  },

  logout: async (req, res) => {
    try {
      const result = await authService.logoutUser();

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  },

  me: async (req, res) => {
    return res.status(200).json({
      message: "Authenticated user",
      user: req.user,
    });
  },
};

module.exports = authController;
