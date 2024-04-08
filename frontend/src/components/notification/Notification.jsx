// import React, { useEffect } from 'react';
// import * as Notifications from 'expo-notifications';

// const getPushNotificationToken = async () => {
//   const { expoToken } = await Notifications.getExpoPushTokenAsync();
//   console.log('Push Notification Token:', expoToken);
//   // Use this token to send notifications to this device from your server
// };

// getPushNotificationToken(); // Call this function whenever needed (e.g., on app launch)

// Notifications.setNotificationHandler(notification => {
//   console.log('Notification received in foreground:', notification);
//   // Handle notification data (e.g., display an alert)
// });

// const registerForPushNotifications = async () => {
//   try {
//     // Demander la permission à l'utilisateur
//     const { status } = await Notifications.requestPermissionsAsync();
//     if (status !== 'granted') {
//       console.log('Permission de notification refusée');
//       return;
//     }
    
//     // Récupérer le token d'inscription
//     const token = (await Notifications.getExpoPushTokenAsync()).data;

//     // Enregistrer le token d'inscription dans votre base de données
//     // Code pour enregistrer le token dans la base de données (à implémenter par vous-même)
//     console.log('Token d\'inscription:', token);
//   } catch (error) {
//     console.error('Erreur lors de l\'inscription aux notifications :', error);
//   }
// };

// const NotificationsComponent = () => {
//   useEffect(() => {
//     // Appeler cette fonction lorsque le bailleur publie une offre
//     registerForPushNotifications();
//   }, []);

//   return null; // Composant vide car il n'a pas besoin de rendu
// };

// export default NotificationsComponent;
