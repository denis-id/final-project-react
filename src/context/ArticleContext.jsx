import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import { useLanguage } from "./LanguageContext"; 

// Create a context for articles
const ArticleContext = createContext();

export const ArticleProvider = ({ children }) => {
  const { language, translations } = useLanguage(); 
  const [articles, setArticles] = useState([]); 
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.API_URL || "http://localhost:5000"; 

  // Fetch all articles
  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/article`);
      setArticles(response.data);
    } catch (err) {
      console.error("Error fetching articles:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single article by ID
  const fetchArticleById = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/article/${id}`);
      setArticle(response.data);
    } catch (err) {
      console.error("Error fetching article:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch articles on mount
  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <ArticleContext.Provider
      value={{ articles, article, loading, error, fetchArticles, fetchArticleById, translations, language }}
    >
      {children}
    </ArticleContext.Provider>
  );
};

// Hook to use the ArticleContext
export const useArticleContext = () => {
  return useContext(ArticleContext);
};
