const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userRepository = require("../repositories/userRepository");
const emailVerificationTokenRepository = require("../repositories/emailVerificationTokenRepository");
const passwordResetTokenRepository = require("../repositories/passwordresetrepository");

// Validates password strength — min 8 chars, uppercase, number, special character
const validatePassword = (password) => {
  if (!password || password.length < 8) {
    throw new Error("Password must be at least 8 characters long");
  }
  if (!/[A-Z]/.test(password)) {
    throw new Error("Password must contain at least one uppercase letter");
  }
  if (!/[0-9]/.test(password)) {
    throw new Error("Password must contain at least one number");
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    throw new Error("Password must contain at least one special character");
  }
};

const authService = {
  registerUser: async (email, password) => {
    const universityDomain = "@westminster.ac.uk";

    if (!email || !email.endsWith(universityDomain)) {
      throw new Error("A valid university email is required");
    }

    // Validate password complexity before hashing
    validatePassword(password);

    const existingUser = await userRepository.findByEmail(email);

    if (existingUser) {
      throw new Error("Email already registered");
    }

    // Hash password with bcrypt using 10 salt rounds
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userRepository.createUser(email, hashedPassword);

    // Generate a cryptographically secure single-use verification token
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

    // Return same error for both cases to prevent user enumeration attacks
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    // Prevent login if email has not been verified
    if (!user.is_verified) {
      throw new Error("Email not verified");
    }

    // Sign JWT with user ID and email — expires in 1 hour
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

    // Prevent token reuse
    if (storedToken.is_used) {
      throw new Error("Verification token already used");
    }

    if (new Date(storedToken.expires_at) < new Date()) {
      throw new Error("Verification token has expired");
    }

    await userRepository.markEmailAsVerified(storedToken.user_id);

    // Mark token as used so it cannot be used again
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

    // Generate a cryptographically secure single-use reset token
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

    // Prevent token reuse
    if (storedToken.is_used) {
      throw new Error("Reset token already used");
    }

    if (new Date(storedToken.expires_at) < new Date()) {
      throw new Error("Reset token has expired");
    }

    // Validate new password complexity before hashing
    validatePassword(newPassword);

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await userRepository.updatePassword(storedToken.user_id, hashedPassword);

    // Mark token as used so it cannot be used again
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
