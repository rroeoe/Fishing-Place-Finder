import React, { useEffect, useState } from "react";
import {
  getAverageRating,
  getFavorites,
  getFishingplaces,
  getReviews,
} from "../../Services/Firestore";
import { useAuth } from "../../Services/AuthContext";

const Test2 = () => {
  const [state, setState] = useState([]);
  
  useEffect(() => {
    getAverageRating(setState)
  }, []);





  
  return (
    <div>
    <p>{JSON.stringify(state)}</p>
    <button onClick={() => console.log(state)}>asdf</button>


    </div>
  );
};

export default Test2;
