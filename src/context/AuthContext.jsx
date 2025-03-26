import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || "/";
  const [recentUser, setRecentuser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async () => {
    setLoading(true);
    setError(null);
    console.log("Login attempt with:", form);
    console.log("Sending request to:", `${process.env.REACT_APP_API_URL}/api/login`);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/login`,
        form,
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("Login successful:", response.data);

      const data = response.data;
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      navigate(redirectPath, { replace: true });
      setRecentuser(response.data.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const register = async () => {
    setLoading(true);
    setError(null);
    console.log("Register attempt with:", form);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/register`,
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Registration successful:", response.data);

      const data = response.data;
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      navigate(redirectPath, { replace: true });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, recentUser, form, setForm }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
