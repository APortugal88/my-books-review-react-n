import axios from "axios";

const API_URL = "https://reactnd-books-api.udacity.com";
const TOKEN = "my-random-token"; 

const headers = {
  "Authorization": `Bearer ${TOKEN}`,
  "Content-Type": "application/json"
};

export const getBooks = async () => {
  const response = await axios.get(`${API_URL}/books`, { headers });
  return response.data.books;
};
