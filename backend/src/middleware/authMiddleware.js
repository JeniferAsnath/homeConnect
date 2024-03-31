const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const secretKey = process.env.JWT_SECRET;

async function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token non fourni.' });
  }

  // Vérifier si le token est dans la liste noire (table blacklisted_tokens)
  const blacklistedToken = await prisma.blacklistedToken.findUnique({
    where: {
      token: token,
    },
  });

  if (blacklistedToken) {
    return res.status(401).json({ message: 'Token invalide ou expiré.' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expiré.' });
      } else {
        return res.status(401).json({ message: 'Token invalide.' });
      }
    }
    req.user = decoded;
    next();
  });
}

module.exports = { verifyToken };
