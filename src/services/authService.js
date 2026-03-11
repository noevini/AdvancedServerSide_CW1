const bcrypt = require("bcrypt");
const userRepository = require("../repositories/userRepository");

const authService = {
  registerUser: async (email, password) => {
    const existingUser = await userRepository.findByEmail(email);

    if (existingUser) {
      throw new Error("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userRepository.createUser(email, hashedPassword);

    return newUser;
  },
};

module.exports = authService;
