const jwt = require('jsonwebtoken');

const generateJWT = (userId) => {
  const token = jwt.sign({ userId }, 'your_secret_key', { expiresIn: '1h' }); // Remplacez 'your_secret_key' par votre clé secrète
  return token;
};

module.exports = { generateJWT };