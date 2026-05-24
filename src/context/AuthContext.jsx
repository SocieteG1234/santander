// context/AuthContext.jsx
import React, { createContext, useContext, useState } from "react";
import { loginUser } from "../services/UserService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  const login = (code, password) => {
    const result = loginUser(code, password);
    if (result.success) {
      setCurrentUser(result.user);
    }
    return result;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}