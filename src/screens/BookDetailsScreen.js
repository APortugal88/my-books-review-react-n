import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList } from "react-native";
import { addReview, getReviews } from "../api/reviewsApi";

const BookDetailsScreen = ({ route }) => {
  const { bookId } = route.params;
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews(bookId).then(setReviews);
  }, []);

  const submitReview = async () => {
    await addReview(bookId, review);
    setReview("");
    getReviews(bookId).then(setReviews);
  };

  return (
    <View>
      <Text>Reseñas</Text>
      <FlatList data={reviews} renderItem={({ item }) => <Text>{item.review}</Text>} />
      <TextInput placeholder="Escribe una reseña" value={review} onChangeText={setReview} />
      <Button title="Enviar" onPress={submitReview} />
    </View>
  );
};

export default BookDetailsScreen;
