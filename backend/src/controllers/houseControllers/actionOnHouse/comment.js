// commentController.js

const Comment = require('../models/Comment');

// Fonction pour récupérer les commentaires d'une maison
const getCommentsForHouse = async (req, res) => {
  const { houseId } = req.params;

  try {
    const comments = await Comment.find({ houseId });
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};

// Fonction pour ajouter un commentaire à une maison
const addCommentToHouse = async (req, res) => {
  const { houseId } = req.params;
  const { userId, content } = req.body;

  try {
    const newComment = await Comment.create({
      houseId,
      userId,
      content,
      date: new Date()
    });
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Failed to add comment' });
  }
};

module.exports = {
  getCommentsForHouse,
  addCommentToHouse
};
