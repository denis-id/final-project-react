import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useMenuContext } from "./MenuContext";

const FilterContext = createContext();

export function FilterProvider({ children }) {
const {menus, category} = useMenuContext()
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const { language, translations } = useLanguage(); 
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid"); 
  const [isLoading, setIsLoading] = useState(false);
  const menuPerPage = 6;

  const categories = useMemo(() => 
    [translations[language]?.filterAll || "All", ...new Set(category.map((p) => p.name))],
    [language, translations, menus]
  );

  const [filteredAndSortedMenu, setFilteredAndSortedMenu] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      let result = [...menus];

      if (selectedCategory !== translations[language]?.filterAll && selectedCategory !== "All") {
        result = result.filter((p) => p.category_name === selectedCategory);
      }
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Price range filter
    if (priceRange.min !== "") {
      result = result.filter((p) => p.price >= Number(priceRange.min));
    }
    if (priceRange.max !== "") {
      result = result.filter((p) => p.price <= Number(priceRange.max));
    }

    // Sorting
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    setFilteredAndSortedMenu(result);
    setIsLoading(false);
    }, 500); 

    return () => clearTimeout(timer);
  }, [menus, selectedCategory, sortBy, searchQuery, priceRange, translations, language]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedMenu.length / menuPerPage);
  const paginatedMenu = filteredAndSortedMenu.slice(
    (currentPage - 1) * menuPerPage,
    currentPage * menuPerPage
  );

  const clearFilters = () => {
    setSelectedCategory("All");
    setSortBy("featured");
    setSearchQuery("");
    setPriceRange({ min: "", max: "" });
    setCurrentPage(1);
  };

  return (
    <FilterContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        sortBy,
        setSortBy,
        searchQuery,
        setSearchQuery,
        priceRange,
        setPriceRange,
        currentPage,
        setCurrentPage,
        categories,
        filteredAndSortedMenu,
        paginatedMenu,
        totalPages,
        clearFilters,
        menuPerPage,
        viewMode,
        setViewMode,
        isLoading,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export const useFilter = () => useContext(FilterContext);
