// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

// const CommentsScreen = ({ houseId }) => {
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState('');

//   useEffect(() => {
//     // Récupérer les commentaires de la maison depuis le backend
//     fetchComments();
//   }, []);

//   const fetchComments = async () => {
//     // Appel à votre API pour récupérer les commentaires de la maison
//     // Remplacez l'URL par l'URL de votre backend
//     const response = await fetch(`https://your-backend-url/api/houses/${houseId}/comments`);
//     const data = await response.json();
//     setComments(data);
//   };

//   const handleAddComment = async () => {
//     // Envoyer le nouveau commentaire au backend pour enregistrement
//     // Remplacez l'URL par l'URL de votre backend
//     await fetch(`https://your-backend-url/api/houses/${houseId}/comments`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ content: newComment }),
//     });

//     // Rafraîchir la liste des commentaires après l'ajout
//     fetchComments();

//     // Effacer le champ de saisie du commentaire
//     setNewComment('');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Commentaires</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Ajouter un commentaire..."
//         value={newComment}
//         onChangeText={setNewComment}
//       />
//       <Button title="Ajouter" onPress={handleAddComment} />
//       <FlatList
//         data={comments}
//         renderItem={({ item }) => (
//           <View style={styles.comment}>
//             <Text>{item.content}</Text>
//             <Text>{item.date}</Text>
//           </View>
//         )}
//         keyExtractor={(item) => item.id.toString()}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//   },
//   comment: {
//     borderBottomWidth: 1,
//     borderBottomColor: 'lightgray',
//     paddingVertical: 10,
//   },
// });

// export default CommentsScreen;
