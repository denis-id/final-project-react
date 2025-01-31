import { useState, useEffect } from "react";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
  Grid,
  List,
} from "lucide-react";
import ProductCard from "../components/ProductCard";
import { useFilter } from "../context/FilterContext";
import Hero from "../components/Hero";

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
  return (
    <div className="w-64 space-y-6">
      <div className="relative flex-1 md:w-64">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
        />
        <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
      </div>
      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
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
                  : "hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
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
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-black focus:outline-none"
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
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-black focus:outline-none"
          />
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-3">Sort By</h3>
        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-black focus:outline-none"
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>
      </div>
      <button
        onClick={clearFilters}
        className="w-full px-4 py-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-md transition-colors"
        aria-label="Clear all filters"
      >
        Clear All Filters
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
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
      <div className="absolute right-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Filters</h3>
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
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Products() {
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
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
    paginatedProducts,
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

  return (
    <div>
      <Hero
        title={"Our Products"}
        description={"Check out our latest collection of fashion products."}
        image={
          "https://img.freepik.com/free-photo/arrangement-different-traveling-elements_23-2148884922.jpg?t=st=1738137007~exp=1738140607~hmac=b4a9afa17b0eb4c59bf04222b0190ca142248d140a30d8a2ee4d5b6922b8e34a&w=996"
        }
      />

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header and Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Our Products</h1>
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

          {/* Products Grid and Pagination */}
          <div className="flex-1">
            {paginatedProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">
                  No products found matching your criteria.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-black hover:underline"
                  aria-label="Clear all filters"
                >
                  Clear all filters
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
                  {paginatedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      viewMode={viewMode}
                    />
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
