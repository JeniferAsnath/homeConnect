// import * as Notifications from 'expo-notifications';

// const requestNotificationPermissions = async () => {
//   const { status } = await Notifications.requestPermissionsAsync({
//     android: PermissionsAndroid.PERMISSIONS.NOTIFICATION_ACCESS,
//     ios: {
//       alert: true,
//       badge: true,
//       sound: true,
//     },
//   });
//   if (status !== 'granted') {
//     console.error('Notification permission NOT granted!');
//   }
// };

// // Fonction pour enregistrer le bailleur pour les notifications
// const registerForPushNotifications = async () => {
//   try {
//     // Demander la permission à l'utilisateur pour les notifications
//     const { status } = await Notifications.requestPermissionsAsync();
    
//     // Vérifier si la permission a été accordée
//     if (status !== 'granted') {
//       console.log('Permission de notification refusée');
//       return;
//     }
    
//     // Récupérer le token d'inscription pour les notifications
//     const token = (await Notifications.getExpoPushTokenAsync()).data;

//     // Enregistrer le token d'inscription dans votre base de données
//     // Vous devez implémenter cette partie en fonction de votre backend

//     console.log('Token d\'inscription:', token);
//   } catch (error) {
//     console.error('Erreur lors de l\'inscription aux notifications :', error);
//   }
// };

// // Appeler la fonction pour enregistrer les notifications lorsque le bailleur publie une offre
// registerForPushNotifications();
