import { useState, useEffect } from "react";
import { Frown, Heart, ShoppingCart, Sun, Moon } from 'lucide-react';
import { useLanguage } from "../context/LanguageContext";
import kohiMenu from "../assets/images/kohiMenu.png";
import MenuCard from "../components/MenuCard";
import { useFilter } from "../context/FilterContext";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import BackToTop from "../components/BackToTop";
import ChatWhatsApp from "../components/ChatWhatsApp";
import { Search, SlidersHorizontal, X, ChevronLeft, ChevronRight, Grid, List } from "lucide-react";

// Komponen FilterSidebar untuk Desktop
const FilterSidebar = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories,
  priceRange,
  setPriceRange,
  sortBy,
  setSortBy,
  clearFilters,
  setCurrentPage,
}) => {

  const { language, translations } = useLanguage();

  return (
    <div className="w-64 space-y-6">
      <div className="relative flex-1 md:w-64">
        <input
          type="text"
          placeholder="Search menu..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full text-black pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
        />
        <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
      </div>
      <div> 
        <h3 className="font-semibold mb-3">
        {translations[language].menuCategories}
          </h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentPage(1);
              }}
              className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                selectedCategory === category
                  ? "bg-black text-white"
                  : "hover:bg-red-800"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-3">
        {translations[language].priceRange}
          </h3>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={priceRange.min}
            onChange={(e) => {
              setPriceRange((prev) => ({
                ...prev,
                min: parseFloat(e.target.value) || 0,
              }));
              setCurrentPage(1);
            }}
            className="w-full text-black px-3 py-2 border rounded-md focus:ring-2 focus:ring-black focus:outline-none"
          />
          <input
            type="number"
            placeholder="Max"
            value={priceRange.max}
            onChange={(e) => {
              setPriceRange((prev) => ({
                ...prev,
                max: parseFloat(e.target.value) || Infinity,
              }));
              setCurrentPage(1);
            }}
            className="w-full text-black px-3 py-2 border rounded-md focus:ring-2 focus:ring-black focus:outline-none"
          />
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-3">
        {translations[language].menuSortBy}
          </h3>
        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full text-gray-600 px-3 py-2 border rounded-md focus:ring-2 focus:ring-black focus:outline-none"
        >
          <option value="featured">{translations[language].menuFeatured}</option>
          <option value="price-asc">{translations[language].menuPriceLowToHigh}</option>
          <option value="price-desc">{translations[language].menuPriceHighToLow}</option>
          <option value="name-asc">{translations[language].menuNameAtoZ}</option>
          <option value="name-desc">{translations[language].menuNameZtoA}</option>
        </select>
      </div>
      <button
        onClick={clearFilters}
        className="block w-full text-red-700 text-left px-3 py-2 rounded-md transition-colors"
        aria-label="Clear all filters"
      >
       {translations[language].menuClearFilters}
      </button>
    </div>
  );
};

// Komponen FilterModal untuk Mobile
const FilterModal = ({
  isFilterMenuOpen,
  setIsFilterMenuOpen,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories,
  priceRange,
  setPriceRange,
  sortBy,
  setSortBy,
  clearFilters,
  setCurrentPage,
}) => {

  const { language, translations } = useLanguage();

  return (
    <div className="fixed inset-0 text-black bg-black bg-opacity-50 z-50 md:hidden">
      <div className="absolute right-0 text-black top-0 h-full w-80 bg-white p-6 overflow-y-auto">
        <div className="flex text-black justify-between items-center mb-6">
          <h3 className="text-xl text-black font-bold">Filters</h3>
          <button
            onClick={() => setIsFilterMenuOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full"
            aria-label="Close filters"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-6">
          <FilterSidebar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            sortBy={sortBy}
            setSortBy={setSortBy}
            clearFilters={clearFilters}
            setCurrentPage={setCurrentPage}
          />
          <button
            onClick={() => setIsFilterMenuOpen(false)}
            className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800"
          >
           {translations[language].menuApplyFilters}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Menu() {
  const { language, translations } = useLanguage();
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favorites")) || []);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
  
  const {
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
    paginatedMenu,
    totalPages,
    clearFilters,
    viewMode,
    setViewMode,
  } = useFilter();

  // Menutup modal saat lebar layar diubah ke desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsFilterMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
}, [favorites]);

useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.body.classList.toggle("dark", darkMode);
}, [darkMode]);

const toggleFavorite = (id) => {
    setFavorites((prev) => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
};

  return (
    <div className={darkMode ? "dark bg-gray-900 text-white" : "bg-white text-black"}>
      <ChatWhatsApp />
      <BackToTop />
      <Hero  
        title="KOHI Coffeé Menu"
        description={translations[language].knowCoffee}
        />
      <div className="max-w-7xl mx-auto px-4 py-16">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">
          {translations[language].ourMenu}
            </h1>
          <img
              src={kohiMenu}
              alt=""
              className="w-20 h-20 rounded-full object-cover"
            />
          <div className="w-full md:w-auto flex gap-4">
            <button
              onClick={() => setViewMode("grid")}
              className="hidden md:flex w-10 h-10 items-center justify-center rounded-md border transition-colors duration-300 ease-in-out hover:bg-gray-100 hover:text-black"
              aria-label="Grid view"
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className="hidden md:flex w-10 h-10 items-center justify-center rounded-md border transition-colors duration-300 ease-in-out hover:bg-gray-100 hover:text-black"
              aria-label="List view"
            >
              <List className="w-5 h-5" />
            </button>
            <button 
            onClick={() => setDarkMode(!darkMode)} 
            className="p-2 rounded-md border hover:bg-gray-200 dark:hover:bg-gray-700">
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsFilterMenuOpen(true)}
              className="md:hidden bg-black text-white p-2 rounded-lg"
              aria-label="Open filters"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden md:block">
            <FilterSidebar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categories={categories}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              sortBy={sortBy}
              setSortBy={setSortBy}
              clearFilters={clearFilters}
              setCurrentPage={setCurrentPage}
            />
          </div>

          {/* Filters Modal - Mobile */}
          {isFilterMenuOpen && (
            <FilterModal
              isFilterMenuOpen={isFilterMenuOpen}
              setIsFilterMenuOpen={setIsFilterMenuOpen}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categories={categories}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              sortBy={sortBy}
              setSortBy={setSortBy}
              clearFilters={clearFilters}
              setCurrentPage={setCurrentPage}
            />
          )}

          {/* Menu Grid and Pagination */}
          <div className="flex-1">
            {paginatedMenu.length === 0 ? (
              <div className="text-center py-12">
                <Frown className="" 
                 /> 
                <p className="text-xl text-black-600">           
                {translations[language].menuNotFoundDesc}
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-xl text-red-500 hover:underline"
                  aria-label="Clear all filters"
                >
                  {translations[language].menuClearFilters}
                </button>
              </div>
            ) : (
              <>
              <div
  className={
    viewMode === "grid"
      ? "grid grid-cols-1 md:grid-cols-3 gap-8"
      : "flex flex-col md:flex-col gap-8"
  }
>
  {paginatedMenu
    .sort((a, b) => b.bought - a.bought) // Sort by most bought
    .map((menu) => (
      <motion.div
        key={menu.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <MenuCard key={menu.id} menu={menu} viewMode={viewMode}>
          {/* Rating Stars */}
          <div className="flex items-center mt-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <span key={index} className={`text-lg ${index < menu.rating ? "text-yellow-500" : "text-gray-300"}`}>
                ★
              </span>
            ))}
            <span className="ml-2 text-sm text-gray-500">({menu.rating})</span>
          </div>

          {/* Most Popular Badge */}
          {menu.bought > 50 && ( 
            <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-sm rounded-md">
              Popular
            </span>
          )}

          {/* Favorite & Cart Buttons */}
          <div className="flex justify-between items-center mt-2">
            <button onClick={() => toggleFavorite(menu.id)}>
              <Heart
                className={`w-5 h-5 transition-colors duration-300 ${
                  favorites.includes(menu.id) ? "text-red-500 fill-current" : "text-gray-400"
                }`}
              />
            </button>
            <button className="p-2 bg-black text-white rounded-md">
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
            </MenuCard>
            </motion.div>
          ))}
          </div>             
          
                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="mt-12 flex justify-center items-center gap-4">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <div className="flex gap-2">
                      {[...Array(totalPages)].map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentPage(index + 1)}
                          className={`w-8 h-8 rounded-full ${
                            currentPage === index + 1
                              ? "bg-black text-white"
                              : "hover:bg-gray-100"
                          }`}
                          aria-label={`Go to page ${index + 1}`}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Next page"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
