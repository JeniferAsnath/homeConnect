const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findUserByIdentity, findUserById } = require("../../models/userModels/userModel.js");
const secretKey = process.env.JWT_SECRET;

const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  FORBIDDEN: 403,
  INTERNAL_SERVER_ERROR: 500,
};

const ERROR_MESSAGES = {
  MISSING_FIELDS: "Identity and password are required fields.",
  USER_NOT_FOUND: "User not found.",
  INVALID_PASSWORD: "Invalid password.",
  SERVER_ERROR: "Internal Server Error",
};

const login = async (req, res) => {
  const { identity, password } = req.body;

  if (!identity || !password) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: ERROR_MESSAGES.MISSING_FIELDS });
  }

  try {
    let user = await findUserByIdentity(identity);

    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({ message: ERROR_MESSAGES.INVALID_PASSWORD });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, secretKey, { expiresIn: "365d" });
    res.status(HTTP_STATUS.OK).json({ role: user.role, token });

  } catch (error) {
    console.error("Error logging in:", error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: ERROR_MESSAGES.SERVER_ERROR });
  }
};

const profile = async (req, res) => {
  const token = req.headers.authorization;

  try {
    if (!token) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Token is missing." });
    }

    // Extrait le token de l'en-tête
    const tokenParts = token.split(" ");
    const tokenValue = tokenParts[1]; // Supposant que le token est au format "Bearer <token>"

    // Vérification du token
    const decodedToken = jwt.verify(tokenValue, secretKey);
    const userId = decodedToken.userId;

    // Récupération des informations de l'utilisateur à partir de l'ID
    const user = await findUserById(userId);

    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
    }

    res.status(HTTP_STATUS.OK).send(`Welcome to your profile, ${user.username}!`);

  } catch (error) {
    console.error("Error retrieving user information:", error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: ERROR_MESSAGES.SERVER_ERROR });
  }
};

module.exports = { login, profile };
