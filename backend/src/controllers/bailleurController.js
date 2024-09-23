const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { signup } = require("../controllers/userControllers/signupController");

const createBailleur = async (req, res) => {
  const { userId } = req.body;
  try {
    if (userType === "bailleur") {
      const bailleur = await prisma.bailleur.create({
        data: {
          user: {
            connect: {
              id: newUser.id,
            },
          },
        },
      });
    return bailleur
    }
    res.status(201).json(bailleur);
  } catch (error) {
    console.error("Erreur lors de la création du bailleur :", error);
    res.status(500).send("Erreur lors de la création du bailleur.");
  }
};

// app.get("/bailleurs", async (req, res) => {
//   try {
//     const bailleurs = await prisma.bailleur.findMany({
//       include: { user: true },
//     });
//     res.json(bailleurs);
//   } catch (error) {
//     console.error("Erreur lors de la récupération des bailleurs :", error);
//     res.status(500).send("Erreur lors de la récupération des bailleurs.");
//   }
// });

// app.get("/bailleurs/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const bailleur = await prisma.bailleur.findUnique({
//       where: { id: parseInt(id) },
//       include: { user: true },
//     });
//     if (!bailleur) {
//       return res.status(404).send("Bailleur non trouvé.");
//     }
//     res.json(bailleur);
//   } catch (error) {
//     console.error("Erreur lors de la récupération du bailleur :", error);
//     res.status(500).send("Erreur lors de la récupération du bailleur.");
//   }
// });

// app.put("/bailleurs/:id", async (req, res) => {
//   const { id } = req.params;
//   const { userId } = req.body;
//   try {
//     const updatedBailleur = await prisma.bailleur.update({
//       where: { id: parseInt(id) },
//       data: {
//         userId: userId,
//       },
//     });
//     res.json(updatedBailleur);
//   } catch (error) {
//     console.error("Erreur lors de la mise à jour du bailleur :", error);
//     res.status(500).send("Erreur lors de la mise à jour du bailleur.");
//   }
// });

// app.delete("/bailleurs/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     await prisma.bailleur.delete({
//       where: { id: parseInt(id) },
//     });
//     res.send("Bailleur supprimé avec succès.");
//   } catch (error) {
//     console.error("Erreur lors de la suppression du bailleur :", error);
//     res.status(500).send("Erreur lors de la suppression du bailleur.");
//   }
// });

module.exports = { createBailleur };
