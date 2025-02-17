import { db } from "../config/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

// Guardar reseña
export const addReview = async (bookId, review) => {
  try {
    await addDoc(collection(db, "reviews"), { bookId, review, createdAt: new Date() });
    console.log("Reseña guardada");
  } catch (error) {
    console.error("Error al guardar la reseña:", error.message);
  }
};

// Obtener reseñas
export const getReviews = async (bookId) => {
  const querySnapshot = await getDocs(collection(db, "reviews"));
  return querySnapshot.docs.map(doc => doc.data()).filter(review => review.bookId === bookId);
};
