const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { signup } = require("../controllers/userControllers/signupController");

const createVisitor = async (req, res) => {
  const { userId } = req.body;
  try {
    if (userType === "visitor") {
      const visitor = await prisma.visitor.create({
        data: {
          user: {
            connect: {
              id: newUser.id,
            },
          },
        },
      });
      return visitor
    }
    res.status(201).json(visitor);
  } catch (error) {
    console.error("Erreur lors de la création du visitor :", error);
    res.status(500).send("Erreur lors de la création du visitor.");
  }
};

module.exports = { createVisitor };
