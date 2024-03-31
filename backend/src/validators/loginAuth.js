const jwt = require('jsonwebtoken');

const generateJWT = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Remplacez 'your_secret_key' par votre clé secrète
  return token;
};

module.exports = { generateJWT };