import React, { useContext } from "react";

const ArticleContext = React.createContext();

export const ArticleProvider = ({ children }) => {
  // Buat state yang diperlukan untuk menampung data fetching

  // Fungsi untuk melakukan fetch data

  
  return (
    <ArticleContext.Provider value={{}}>{children}</ArticleContext.Provider>
  );
};
// make sure use
export const useArticleContext = () => {
  return useContext(ArticleContext);
};
