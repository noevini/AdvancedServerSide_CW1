const Tokens = require("csrf");

const tokens = new Tokens();

// Generates a new CSRF secret and token pair
const generateToken = () => {
  const secret = tokens.secretSync();
  const token = tokens.create(secret);
  return { secret, token };
};

// Verifies a CSRF token against the stored secret
const verifyToken = (secret, token) => {
  return tokens.verify(secret, token);
};

module.exports = { generateToken, verifyToken };
