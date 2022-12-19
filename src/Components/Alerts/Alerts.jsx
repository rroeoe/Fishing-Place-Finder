import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import "./Alerts.css"

export const successAlert = (message) => {
  toast.success(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
  });
};

export const errorAlert = (message) => {
  toast.error(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
  });
};