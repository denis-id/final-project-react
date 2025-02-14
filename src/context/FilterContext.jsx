import { createContext, useContext, useState, useMemo } from "react";
import { menu } from "../data/menu";

const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const menuPerPage = 6;

  const categories = useMemo(
    () => ["All", ...new Set(menu.map((p) => p.category))],
    []
  );

  const filteredAndSortedMenu = useMemo(() => {
    let result = [...menu];

    // Category filter
    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
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

    return result;
  }, [menu, selectedCategory, sortBy, searchQuery, priceRange]);

  // Pagination
  const totalPages = Math.ceil(
    filteredAndSortedMenu.length / menuPerPage
  );
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
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export const useFilter = () => useContext(FilterContext);
