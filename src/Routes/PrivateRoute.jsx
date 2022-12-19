import React from "react"

//React router
import { Navigate } from "react-router-dom"

//Auth context
import { useAuth } from "../Services/AuthContext"

export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth()

  return currentUser ? children : <Navigate to="/login" />;
}