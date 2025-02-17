import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { getBooks } from "../api/booksApi";

const LibraryScreen = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks().then(setBooks).catch(console.error);
  }, []);

  return (
    <View>
      <Text>Lista de libros</Text>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
    </View>
  );
};

export default LibraryScreen;
