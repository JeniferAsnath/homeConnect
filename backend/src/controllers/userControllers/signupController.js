const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser } = require('../../models/userModels/userModel.js');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const saltRounds = 10;

const signup = async (req, res) => {
  const { lastName, firstName, phoneNumber, email, password, userType } = req.body;

  try {
    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const findUser = await prisma.user.findUnique({
      where: {
        email: email,
      }
    });

    if (findUser) {
      return res.status(400).json({
        message: "Email is already taken",
      });
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        email: email,
        lastName: lastName,
        firstName: firstName,
        phoneNumber: phoneNumber,
        password: hashedPassword,
        userType: userType,
      },
    });

    const token = generateJWT(newUser.id, newUser.userType);
    res.status(201).json({ message: 'Utilisateur enregistré avec succès', token });
  } catch (error) {
    console.log(error);
    console.error('Erreur lors de la création de l\'utilisateur :', error);
    res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
  }
};

const generateJWT = (userId, userType) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  const token = jwt.sign({ userId, userType }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

module.exports = { signup };
