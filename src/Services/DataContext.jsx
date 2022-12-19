import React, { useContext, useState, useEffect, createContext } from "react";
import {
    getFishingplaces,
    getAverageRating,
    getFormattedFavorites
} from "./Firestore"
import { useAuth } from "./AuthContext"

const DataContext = createContext();

export function DataContextProvider({ children }) {
  const [data, setData] = useState([]);
  const [fishingplaces, setFishingplaces] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [averageRating, setAverageRating] = useState([])
  const { currentUser } = useAuth();

  useEffect(() => {
    getFishingplaces(setFishingplaces);
    getAverageRating(setAverageRating);
    if (currentUser) {
      getFormattedFavorites(currentUser, setFavorites);
    } else {
      setFavorites([]);
    }
  }, [currentUser]);

  useEffect(() => {
    let merged = [];

    merged = fishingplaces.map((item) => {
      const favorite = favorites.find(
        (itmInner) => itmInner.fishingplace === item.name
      );

      if (!favorite) {
        return {
          ...item,
          favorite: false,
        };
      }

      return {
        ...item,
        ...favorite,
      };
    });

    let merged2 = [];

    for (let i = 0; i < merged.length; i++) {
      merged2.push({
        ...merged[i],
        ...averageRating.find(
          (itmInner) => itmInner.fishingplace == merged[i].name
        ),
      });
    }
    setData(merged2);
  }, [averageRating, favorites]);
 
  return (
    <DataContext.Provider
      value={{
        data
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}

