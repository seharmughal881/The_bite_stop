// src/components/Pizzas.jsx
"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { productsService } from "@/services/productsService"; // Import the API service

// Sort options - ADDED DISCOUNT FILTER OPTIONS
const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
  { value: "newest", label: "Newest First" },
  { value: "discount-high", label: "Discount: High to Low" },
  { value: "discount-low", label: "Discount: Low to High" },
];

// Filter options for discounts
const discountFilterOptions = [
  { value: "all", label: "All Discounts" },
  { value: "discounted", label: "Discounted Only" },
  { value: "no-discount", label: "No Discount" },
  { value: "10", label: "10% or more" },
  { value: "20", label: "20% or more" },
  { value: "30", label: "30% or more" },
];

// Modern animation configs for 2025
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const cardHover = {
  rest: {
    scale: 1,
    y: 0,
  },
  hover: {
    scale: 1.03,
    y: -10,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 300,
    },
  },
};

const Pizzas = () => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState("featured");
  const [discountFilter, setDiscountFilter] = useState("all");
  const [filteredPizzas, setFilteredPizzas] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef(null);

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch pizzas from API
  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        setLoading(true);
        const response = await productsService.getAllPizzas();
        const pizzaData = Array.isArray(response) ? response : response.products || [];
        setPizzas(pizzaData);
        setError(null);
      } catch (err) {
        console.error("Error fetching pizzas:", err);
        setError("Failed to load pizzas. Please try again later.");
        setPizzas([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPizzas();
  }, []);

  // Apply sorting and filtering
  useEffect(() => {
    let filtered = [...pizzas];

    // Apply discount filter
    if (discountFilter !== "all") {
      filtered = filtered.filter((pizza) => {
        const hasDiscount = pizza.discount && pizza.discount > 0;
        
        switch (discountFilter) {
          case "discounted":
            return hasDiscount;
          case "no-discount":
            return !hasDiscount;
          case "10":
          case "20":
          case "30":
            return hasDiscount && parseFloat(pizza.discount) >= parseInt(discountFilter);
          default:
            return true;
        }
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortOption) {
        case "price-low":
          return parseFloat(a.price || 0) - parseFloat(b.price || 0);
        case "price-high":
          return parseFloat(b.price || 0) - parseFloat(a.price || 0);
        case "name-asc":
          return (a.title || "").localeCompare(b.title || "");
        case "name-desc":
          return (b.title || "").localeCompare(a.title || "");
        case "newest":
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        case "discount-high":
          return (parseFloat(b.discount || 0) - parseFloat(a.discount || 0));
        case "discount-low":
          return (parseFloat(a.discount || 0) - parseFloat(b.discount || 0));
        default: // featured
          return 0; // Keep original order
      }
    });

    setFilteredPizzas(filtered);
  }, [pizzas, sortOption, discountFilter]);

  const calculateDiscountedPrice = (price, discount) => {
    if (!discount) return price;
    const discountAmount = (parseFloat(price) * parseFloat(discount)) / 100;
    return parseFloat(price - discountAmount).toFixed(0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading delicious pizzas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">⚠️ {error}</div>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-red-800 mb-4">
            🍕 Delicious Pizzas
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Freshly baked pizzas with premium ingredients. From classic Margherita to specialty creations!
          </p>
        </motion.div>

        {/* Filter and Sort Controls */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <label className="text-gray-700 font-medium">Sort by:</label>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Discount Filter Dropdown */}
            <div className="relative" ref={filterRef}>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white flex items-center gap-2"
              >
                <span>Discount: {discountFilterOptions.find(opt => opt.value === discountFilter)?.label}</span>
                <svg className={`w-4 h-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10"
                  >
                    {discountFilterOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setDiscountFilter(option.value);
                          setIsFilterOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-red-50 transition-colors ${
                          discountFilter === option.value ? 'bg-red-100 text-red-700' : 'text-gray-700'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Results Count */}
            <div className="text-gray-600">
              Showing {filteredPizzas.length} of {pizzas.length} pizzas
            </div>
          </div>
        </motion.div>

        {/* Pizzas Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredPizzas.map((pizza) => (
            <motion.div
              key={pizza._id || pizza.id}
              variants={cardHover}
              whileHover="hover"
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <Link href={`/products/${pizza._id || pizza.id}`}>
                <div className="relative">
                  {/* Pizza Image */}
                  <div className="h-48 bg-gradient-to-br from-red-100 to-orange-100 flex items-center justify-center">
                    {pizza.imageUrl ? (
                      <img
                        src={pizza.imageUrl}
                        alt={pizza.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.error('Image load error:', pizza.imageUrl);
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                        onLoad={(e) => {
                          console.log('Image loaded successfully:', pizza.title);
                        }}
                      />
                    ) : null}
                    <div className="text-6xl" style={{ display: pizza.imageUrl ? 'none' : 'flex' }}>🍕</div>
                  </div>

                  {/* Discount Badge */}
                  {pizza.discount && pizza.discount > 0 && (
                    <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full text-sm font-bold">
                      {pizza.discount}% OFF
                    </div>
                  )}

                  {/* Pizza Details */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {pizza.title}
                    </h3>
                    
                    <div className="text-sm text-gray-600 mb-3">
                      {pizza.specs?.flavor && (
                        <span className="inline-block bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs mr-2">
                          {pizza.specs.flavor}
                        </span>
                      )}
                      {pizza.specs?.weight && (
                        <span className="text-xs text-gray-500">
                          {pizza.specs.weight}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        {pizza.discount && pizza.discount > 0 ? (
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-red-600">
                              PKR {calculateDiscountedPrice(pizza.price, pizza.discount)}
                            </span>
                            <span className="text-sm text-gray-400 line-through">
                              PKR {pizza.price}
                            </span>
                          </div>
                        ) : (
                          <span className="text-lg font-bold text-gray-800">
                            PKR {pizza.price}
                          </span>
                        )}
                      </div>
                      <button className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition-colors text-sm">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* No Pizzas Found */}
        {filteredPizzas.length === 0 && !loading && !error && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🍕</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No pizzas found</h3>
            <p className="text-gray-500">Try adjusting your filters or check back later for new arrivals!</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Pizzas;
