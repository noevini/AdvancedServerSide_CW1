const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userRepository = require("../repositories/userRepository");
const emailVerificationTokenRepository = require("../repositories/emailVerificationTokenRepository");
const passwordResetTokenRepository = require("../repositories/passwordresetrepository");

const authService = {
  registerUser: async (email, password) => {
    const universityDomain = "@westminster.ac.uk";

    if (!email || !email.endsWith(universityDomain)) {
      throw new Error("A valid university email is required");
    }

    if (!password || password.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }

    const existingUser = await userRepository.findByEmail(email);

    if (existingUser) {
      throw new Error("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userRepository.createUser(email, hashedPassword);

    const verificationToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();

    await emailVerificationTokenRepository.createToken(
      newUser.id,
      verificationToken,
      expiresAt,
    );

    return {
      user: newUser,
      verification_token: verificationToken,
    };
  },

  loginUser: async (email, password) => {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    if (!user.is_verified) {
      throw new Error("Email not verified");
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        is_verified: user.is_verified,
      },
    };
  },

  verifyEmail: async (token) => {
    const storedToken =
      await emailVerificationTokenRepository.findByToken(token);

    if (!storedToken) {
      throw new Error("Invalid verification token");
    }

    if (storedToken.is_used) {
      throw new Error("Verification token already used");
    }

    if (new Date(storedToken.expires_at) < new Date()) {
      throw new Error("Verification token has expired");
    }

    await userRepository.markEmailAsVerified(storedToken.user_id);
    await emailVerificationTokenRepository.markAsUsed(storedToken.id);

    return {
      message: "Email verified successfully",
    };
  },

  requestPasswordReset: async (email) => {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();

    await passwordResetTokenRepository.createToken(
      user.id,
      resetToken,
      expiresAt,
    );

    return {
      message: "Password reset token generated successfully",
      reset_token: resetToken,
    };
  },

  resetPassword: async (token, newPassword) => {
    const storedToken = await passwordResetTokenRepository.findByToken(token);

    if (!storedToken) {
      throw new Error("Invalid reset token");
    }

    if (storedToken.is_used) {
      throw new Error("Reset token already used");
    }

    if (new Date(storedToken.expires_at) < new Date()) {
      throw new Error("Reset token has expired");
    }

    if (!newPassword || newPassword.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await userRepository.updatePassword(storedToken.user_id, hashedPassword);
    await passwordResetTokenRepository.markAsUsed(storedToken.id);

    return {
      message: "Password reset successfully",
    };
  },

  logoutUser: async () => {
    return {
      message: "Logout successful",
    };
  },
};

module.exports = authService;
