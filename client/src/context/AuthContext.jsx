import { createContext, useState, useEffect, useContext } from "react";
import axios from "../api/axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      if (token) {
        try {
          
          const storedUser = localStorage.getItem("user");
          if (storedUser) {
             setUser(JSON.parse(storedUser));
          }
        } catch (error) {
          console.error("Auth verification failed", error);
          logout();
        }
      }
      setLoading(false);
    };

    verifyUser();
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await axios.post("/auth/login", { email, password });
      const { token, ...userData } = response.data;
      
      setToken(token);
      setUser(userData);
      
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      
      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return { 
        success: false, 
        message: error.response?.data?.message || "Login failed" 
      };
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await axios.post("/auth/register", { username, email, password });
      const { token, ...userData } = response.data;
      
      setToken(token);
      setUser(userData);
      
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      
      return { success: true };
    } catch (error) {
       console.error("Register error:", error);
      return { 
        success: false, 
        message: error.response?.data?.message || "Registration failed" 
      };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    isAuthenticated: !!token,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
