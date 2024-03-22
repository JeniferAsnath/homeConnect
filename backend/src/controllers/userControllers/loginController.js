const bcrypt = require('bcrypt');
const { findUserByIdentity } = require('../../models/userModels/userModel.js');
const { generateJWT } = require('../../validators/loginAuth.js'); 

const login = async (req, res) => {
  const { identity, password } = req.body;
  
  if (!identity || !password) {
    return res.status(400).json({ message: "Identity and password are required fields." });
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

    const token = generateJWT(user.id);

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { login };
