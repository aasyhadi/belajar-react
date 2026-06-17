import { createContext, useContext, useState } from "react";
import authService from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    name: localStorage.getItem("userName"),
    role: localStorage.getItem("role"),
    token: localStorage.getItem("token"),
  });

  const login = async (email, password) => {
    await authService.login(email, password);

    setUser({
      name: localStorage.getItem("userName"),
      role: localStorage.getItem("role"),
      token: localStorage.getItem("token"),
    });
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);