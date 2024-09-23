// houseController.js

exports.rateHouse = async (req, res) => {
    const { houseId } = req.params;
    const { rating } = req.body;
  
    try {
      // Vérifier si la maison existe
      const existingHouse = await prisma.house.findUnique({ where: { id: houseId } });
      if (!existingHouse) {
        return res.status(404).json({ error: 'House not found' });
      }
  
      // Enregistrer la note dans la base de données
      await prisma.rating.create({
        data: {
          houseId: parseInt(houseId),
          value: rating,
        },
      });
  
      res.status(201).json({ message: 'Rating submitted successfully' });
    } catch (error) {
      console.error('Error rating house:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  