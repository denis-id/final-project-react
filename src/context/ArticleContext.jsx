import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

// Create a context for articles
const ArticleContext = React.createContext();

// Define the initial state for articles
const initialState = {
  loading: true,
  error: null,
  articles: [],
  article: {},
};

// Define the ArticleProvider component
export const ArticleProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  const [article, setArticle] = useState ({});
  const [articles, setArticles] = useState ({});
  const [loading, setLoading] = useState (false);

  const fetchArticles = async () => {
    try {
      const response = await axios.get(`${process.env.API_URL}/api/article`);
      setArticles(response.data);
      setLoading(false); 
     } catch (err) {
        console.error(err);
      }
    }

      const fetchArticleById = async (id) => {
        try {
          const response = await axios.get(`${process.env.API_URL}/api/article/${id}`);
          setArticle(response.data);
      } catch(err) {
        console.error(err);
      }
      }

  // Fetch articles when the component mounts
  useEffect(() => {
    fetchArticles();
  }, []);

  // Return the ArticleContext.Provider with the state and functions
  return (
    <ArticleContext.Provider value={{ ...state, loading, fetchArticles, article, articles, fetchArticleById }}>
      {children}
    </ArticleContext.Provider>
  );
};

// Define a hook to use the ArticleContext
export const useArticleContext = () => {
  return useContext(ArticleContext);
};