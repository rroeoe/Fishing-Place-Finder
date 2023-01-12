import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Details from "./Pages/Details/Details";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { theme } from "./Services/Theme";
import Error from "./Pages/Error/Error";
import Favorites from "./Pages/Favorites/Favorites";
import Login from "./Pages/Login/Login";
import Profile from "./Pages/Profile/Profile";
import Signup from "./Pages/Signup/Signup";
import Header from "./Layouts/Header";
import { AuthProvider } from "./Services/AuthContext";
import PrivateRoute from "./Routes/PrivateRoute";
import ResetPassword from "./Pages/ResetPassword/ResetPassword"
import UpdateEmail from "./Pages/Profile/UpdateEmail";
import UpdatePassword from "./Pages/Profile/UpdatePassword";
import UpdateProfile from "./Pages/Profile/UpdateProfile";
import Footer from "./Layouts/Footer"
import { DataContextProvider } from "./Services/DataContext";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Map from "./Pages/Map/Map";
import { useLoadScript } from "@react-google-maps/api";

function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAP_API_KEY
  });
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
      <DataContextProvider>
      <Header />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path=":name" element={<Details />}></Route>
          <Route exact path="/favorites" element={<Favorites />}></Route>
          <Route exact path="/map" element={isLoaded ? <Map /> : <Error />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/signup" element={<Signup />}></Route>
          <Route exact path="/forgot-password" element={<ResetPassword />}></Route>
          <Route exact path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>}></Route>
          <Route exact path="/update-password" element={<PrivateRoute><UpdatePassword /></PrivateRoute>}></Route>
          <Route exact path="/update-email" element={<PrivateRoute><UpdateEmail /></PrivateRoute>}></Route>
          <Route exact path="/update-profile" element={<PrivateRoute><UpdateProfile /></PrivateRoute>}></Route>
          <Route exact path="/*" element={<Error />}></Route>
        </Routes>
        <Footer />
        <ToastContainer position="bottom-right" newestOnTop autoClose={3000} closeOnClick draggable rtl={false} />
        </DataContextProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
