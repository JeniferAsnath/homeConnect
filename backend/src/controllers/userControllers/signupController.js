const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const prisma = new PrismaClient();

const signupSchema = Joi.object({
  lastName: Joi.string().required(),
  firstName: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string().valid("bailleur", "visiteur").required(),
});

const signup = async (req, res) => {
  try {
    // Validation des données de la requête
    const { error } = signupSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { lastName, firstName, phoneNumber, email, password, role } = req.body;

    // Vérifiez si l'e-mail est déjà utilisé
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already taken" });
    }

    // Hash du mot de passe
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Création de l'utilisateur
    const newUser = await prisma.user.create({
      data: {
        email,
        lastName,
        firstName,
        phoneNumber,
        password: hashedPassword,
        role,
      },
    });

    let additionalData;
    if (role === "bailleur") {
      const bailleur = await prisma.bailleur.create({
        data: {
          id : newUser.id,
          userId: newUser.id,
          name: `${firstName} ${lastName}`,
          houses: { connect: [] },
        },
      });
      additionalData = { bailleurId: bailleur.id };
    } else if (role === "visiteur") {
      const visiteur = await prisma.visiteur.create({
        data: {
          id : newUser.id,
          userId: newUser.id,
          name: `${firstName} ${lastName}`,
        },
      });
      additionalData = { visiteurId: visiteur.id };
    }

    // Générer le jeton JWT et renvoyer la réponse
    const token = jwt.sign({  ...additionalData, userId: newUser.id, role, }, process.env.JWT_SECRET, {
      expiresIn: "365d"
    });
  
    newUser.token = token;

    res.status(201).json({ message: "Utilisateur enregistré avec succès", token, newUser });
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    res.status(500).json({ error: "Erreur lors de la création de l'utilisateur" });
  }
};

module.exports = { signup };
