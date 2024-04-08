const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const secretKey = process.env.JWT_SECRET;

const HTTP_STATUS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  INTERNAL_SERVER_ERROR: 500,
};

const ERROR_MESSAGES = {
  MISSING_TOKEN: 'Token non fourni.',
  INVALID_TOKEN: 'Token invalide ou expiré.',
  EXPIRED_TOKEN: 'Token expiré.',
  SERVER_ERROR: 'Erreur interne du serveur.',
};

async function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: ERROR_MESSAGES.MISSING_TOKEN });
    }

    const blacklistedToken = await prisma.blacklistedToken.findUnique({
      where: { token: token },
    });

    if (blacklistedToken) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: ERROR_MESSAGES.INVALID_TOKEN });
    }

    jwt.verify(token.split(' ')[1], secretKey, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: ERROR_MESSAGES.EXPIRED_TOKEN });
        } else {
          return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: ERROR_MESSAGES.INVALID_TOKEN });
        }
      }
      req.user_id = decoded.user_id; // Stockez l'ID de l'utilisateur dans req pour une utilisation ultérieure
      next();
    });
  } catch (error) {
    console.error('Erreur lors de la vérification du token :', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: ERROR_MESSAGES.SERVER_ERROR });
  }
}

module.exports = {verifyToken};
