import React, { useContext } from "react";

const ArticleContext = React.createContext();

export const ArticleProvider = ({ children }) => {
  // Buat state yang diperlukan untuk menampung data fetching

  // Fungsi untuk melakukan fetch data

  const fetchArticles = async () => {
    try {
      // Fetch data articles
    } catch (err) {
      console.log(err);
    }
  };

  const fetchArticleById = async () => {
    try {
      // Fetch data article by ID
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ArticleContext.Provider value={{}}>{children}</ArticleContext.Provider>
  );
};
// make sure use
export const useArticleContext = () => {
  return useContext(ArticleContext);
};
