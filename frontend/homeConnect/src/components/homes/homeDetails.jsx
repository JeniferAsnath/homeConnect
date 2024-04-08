import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import axios from 'axios';
import CommentsScreen from './actionOnHomeViews/commentHouse';
import ReservationForm from '../../screens/visiteur/ReservationForm';

const HouseDetailsScreen = ({ route }) => {
  const { houseId } = route.params;

  const [houseDetails, setHouseDetails] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [satisfactionScore, setSatisfactionScore] = useState(0);
  const [views, setViews] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [comment, setComment] = useState('');
  const [showReservationForm, setShowReservationForm] = useState(false);

  useEffect(() => {
    fetchHouseDetails();
    fetchViews();
  }, []);

  const fetchHouseDetails = async () => {
    try {
      const response = await axios.get(`https://api.example.com/houses/${houseId}`);
      setHouseDetails(response.data);
    } catch (error) {
      console.error('Error fetching house details:', error);
    }
  };

  const fetchViews = async () => {
    try {
      const response = await axios.post(`https://api.example.com/houses/${houseId}/views`);
      setViews(response.data.views);
    } catch (error) {
      console.error('Error fetching views:', error);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % houseDetails.images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex(
      (currentImageIndex + houseDetails.images.length - 1) %
        houseDetails.images.length
    );
  };

  const recordView = async () => {
    try {
      await axios.post(`https://api.example.com/houses/${houseId}/record-view`);
      setViews(views + 1);
    } catch (error) {
      console.error('Error recording view:', error);
    }
  };

  const recordSatisfactionScore = async (score) => {
    try {
      await axios.post(`https://api.example.com/houses/${houseId}/record-satisfaction`, { score });
      setSatisfactionScore(score);
    } catch (error) {
      console.error('Error recording satisfaction score:', error);
    }
  };

  const handlePostComment = async () => {
    try {
      await axios.post(`https://api.example.com/houses/${houseId}/comments`, { comment });
      Alert.alert('Success', 'Comment posted successfully!');
      setComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
      Alert.alert('Error', 'Failed to post comment. Please try again later.');
    }
  };

  const showDatePicker = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: new Date(),
        mode: 'spinner',
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        const selectedDate = new Date(year, month, day);
        setSelectedDate(selectedDate);
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  };

  if (!houseDetails) {
    return <Text>Loading house details...</Text>;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: houseDetails.images[currentImageIndex] }} style={styles.image} />
      <View style={styles.buttonContainer}>
        <Button title="Previous" onPress={previousImage} />
        <Button title="Next" onPress={nextImage} />
      </View>
      <Text>{houseDetails.title}</Text>

      <Text>Rent : {houseDetails.rent}</Text>
      <Text>Address : {houseDetails.address}</Text>
      <Text>Views: {views}</Text>

      <Text>{houseDetails.description}</Text>

      <Text>Intersection : {houseDetails.intersection}</Text>
      <StarRating
        starSize={30}
        disabled={false}
        maxStars={5}
        rating={satisfactionScore}
        selectedStar={recordSatisfactionScore}
      />
      <TextInput
        style={styles.input}
        value={comment}
        onChangeText={setComment}
        placeholder="Enter your comment"
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handlePostComment}>
        <Text style={styles.buttonText}>Post Comment</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={showDatePicker}>
        <Text>Select Visit Date</Text>
      </TouchableOpacity>
      {selectedDate && (
        <Text>Selected Date: {selectedDate.toDateString()}</Text>
      )}
      <TouchableOpacity onPress={() => setShowReservationForm(true)}>
        <Text>Reserve Visit</Text>
      </TouchableOpacity>
      {showReservationForm && (
        <ReservationForm
          houseId={houseId}
          onSubmit={() => {
            setShowReservationForm(false);
            // Update other state or perform other actions after submission
          }}
          onCancel={() => setShowReservationForm(false)}
        />
      )}
      <CommentsScreen houseId={houseId} />
      <StarRating
        disabled={false}
        maxStars={5}
        rating={satisfactionScore}
        selectedStar={recordSatisfactionScore}
      />
      <Button title="Rate" onPress={() => handleRate(3)} />
      <Button title="Like" onPress={() => handleToggleLike(true)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  input: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
  },
});

export default HouseDetailsScreen;
