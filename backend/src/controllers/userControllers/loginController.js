const bcrypt = require("bcrypt");
const { findUserByIdentity } = require("../../models/userModels/userModel.js");
const { generateJWT } = require("../../validators/loginAuth.js");
const { verifyToken } = require('../../middleware/authMiddleware.js');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;


const login = async (req, res) => {
  const { identity, password } = req.body;

  if (!identity || !password) {
    return res
      .status(400)
      .json({ message: "Identity and password are required fields." });
  }

  try {
    let user = await findUserByIdentity(identity);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(403).json({ message: "Invalid password." });
    }


    const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '365d' }); 
    req.session.userId = user.id;   
    res.status(200).json({ userType: user.userType, token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const profile = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).send('Session invalide.');
    }
    
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });
    if (!user) {
      return res.status(404).send('Utilisateur non trouvé.');
    }
    res.send(`Bienvenue sur votre profil, ${user.username}!`);
  } catch (error) {
    console.error('Erreur lors de la récupération des informations utilisateur :', error);
    res.status(500).send('Erreur lors de la récupération des informations utilisateur.');
  }
};

module.exports = { login, profile };
