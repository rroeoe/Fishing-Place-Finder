import { db } from "./Firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export async function getReviews(setState) {
  const searchQuery = query(collection(db, "reviews"));
  const data = onSnapshot(searchQuery, (querySnapshot) => {
    const formattedData = querySnapshot.docs.map((doc) => ({
      documentId: doc.id,
      ...doc.data(),
    }));
    setState(formattedData);
  });
}

export async function getFavorites(currentUser, setState) {
  const searchQuery = query(
    collection(db, "favorites"),
    where("userId", "==", currentUser.uid)
  );
  const data = onSnapshot(searchQuery, (querySnapshot) => {
    const formattedData = querySnapshot.docs.map((doc) => ({
      documentId: doc.id,
      ...doc.data(),
    }));
    setState(formattedData);
  });
}

export async function getFishingplaces(setState) {
  const searchQuery = query(collection(db, "fishingplaces"));
  const data = await getDocs(searchQuery);
  const formattedData = data.docs.map((doc) => ({
    documentId: doc.id,
    ...doc.data(),
  }));
  setState(formattedData);
}

export function addFavorite(userId, fishingplace, createdAt) {
  addDoc(collection(db, "favorites"), {
    userId,
    fishingplace,
    createdAt,
  });
}

export function deleteFavorite(id) {
  deleteDoc(doc(db, "favorites", id));
}

export async function getDataOfCurrentUser(uid, setState) {
  const searchQuery = query(
    collection(db, "users"),
    where("userId", "==", uid)
  );
  const data = await getDocs(searchQuery);
  const formattedData = data.docs.map((doc) => ({ ...doc.data() }));
  setState(formattedData);
}

export async function getAverageRating(setState){

  let formattedData = []

  const searchQuery = query(collection(db, "reviews"));
  const data = onSnapshot(searchQuery, (querySnapshot) => {
    formattedData = querySnapshot.docs.map((doc) => ({
      documentId: doc.id,
      ...doc.data(),
    }));

    const processedData = formattedData.reduce((c, { fishingplace, rating }) => {
      c[fishingplace] = c[fishingplace] || {
        fishingplace,
        rating: 0,
        count: 0,
      };
      c[fishingplace].count += 1;
      c[fishingplace].rating += rating;
      return c;
    }, {});

    setState(Object.values(processedData).map((item) => ({
      fishingplace: item.fishingplace,
      averageRating: Math.round((item.rating / item.count) * 10) / 10,
    })))
  });
}

export async function getFormattedFavorites(currentUser, setState){
  const searchQuery = query(
    collection(db, "favorites"),
    where("userId", "==", currentUser.uid)
  );
  const data = onSnapshot(searchQuery, (querySnapshot) => {
    const formattedData = querySnapshot.docs.map((doc) => ({
      documentId: doc.id,
      ...doc.data(),
    }));
    const favoritesFormatted = formattedData.map((item) => ({
      favorite: true,
      fishingplace: item.fishingplace,
    }));
    setState(favoritesFormatted)
  });
}

