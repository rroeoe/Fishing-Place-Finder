import React, { useEffect, useState } from "react";
import {
  getAverageRating,
  getFavorites,
  getFishingplaces,
  getReviews,
  getFormattedFavorites,
} from "../../Services/Firestore";
import { useAuth } from "../../Services/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Alerts from "../../Components/Alerts/Alerts"
import { successAlert, errorAlert } from "../../Components/Alerts/Alerts";
import { useNavigate, Link } from "react-router-dom";

const Testground = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();


  function handleFunction(){
    navigate("/map")
  }

  return (
    <div>
    <button onClick={handleFunction}>Testclick</button>
    <Link to="/map">asdf</Link>
    </div>
  );
};

export default Testground;
