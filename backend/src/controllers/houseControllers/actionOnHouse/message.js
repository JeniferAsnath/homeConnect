// messageController.js

const Message = require('../models/Message');

// Fonction pour récupérer les messages entre deux utilisateurs
const getMessagesBetweenUsers = async (req, res) => {
  const { senderId, receiverId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId }
      ]
    });
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

// Fonction pour envoyer un nouveau message
const sendMessage = async (req, res) => {
  const { senderId, receiverId, content } = req.body;

  try {
    const newMessage = await Message.create({
      senderId,
      receiverId,
      content,
      date: new Date()
    });
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
};

module.exports = {
  getMessagesBetweenUsers,
  sendMessage
};
