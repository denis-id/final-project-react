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

  // get all articles
  const getArticle = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/articles`);
      setArticles(response.data);
    } catch (err) {
      console.error("Error geting articles:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // get a single article by ID
  const getArticleById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/articles/${id}`);
      setArticle(response.data);
    } catch (err) {
      console.error("Error geting article:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // get articles on mount
  useEffect(() => {
    getArticle();
  }, []);

  return (
    <ArticleContext.Provider
      value={{ 
        articles, 
        article, 
        loading, 
        error, 
        getArticle, 
        getArticleById, 
        translations, 
        language 
      }}
    >
      {children}
    </ArticleContext.Provider>
  );
};

// Hook to use the ArticleContext
export const useArticleContext = () => {
  return useContext(ArticleContext);
};