import React, { createContext, useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || "/";
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const login = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.API_URL}/api/auth/customer/sign-in`,
        JSON.stringify(form), // Send dataUser as JSON
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      navigation(redirectPath, { replace: true });
      localStorage.setItem("user", JSON.stringify(data));
      navigation(-1);
      setUser(user);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigation(-1);
  };

  const register = async () => {
    try {
      // Register logic here
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, logout, form, setForm }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
