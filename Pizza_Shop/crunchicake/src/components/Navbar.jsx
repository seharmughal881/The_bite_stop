"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  GiPizzaSlice,
  GiDonerKebab,
  GiHamburger,
  GiPaintBrush,
  GiChocolateBar,
} from "react-icons/gi";
import { IoIceCream, IoSearch, IoClose } from "react-icons/io5";
import { productsService } from "@/services/productsService";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close search suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
      if (
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(event.target) &&
        showMobileSearch
      ) {
        setShowMobileSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMobileSearch]);

  // Search functionality
  useEffect(() => {
    const searchProducts = async () => {
      if (searchQuery.length < 2) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const [pizzas, shawarmas, burgers, fastfood] = await Promise.all([
          productsService.getAllPizzas(),
          productsService.getAllShawarmas(),
          productsService.getAllBurgers(),
          productsService.getAllFastFood(),
        ]);

        // Combine all products and remove duplicates
        const allProducts = [
          ...(Array.isArray(pizzas) ? pizzas : pizzas.products || []),
          ...(Array.isArray(shawarmas) ? shawarmas : shawarmas.products || []),
          ...(Array.isArray(burgers) ? burgers : burgers.products || []),
          ...(Array.isArray(fastfood) ? fastfood : fastfood.products || []),
        ];

        // Remove duplicates based on _id
        const uniqueProducts = allProducts.filter(
          (product, index, self) =>
            index === self.findIndex((p) => p._id === product._id)
        );

        // Filter products based on search query
        const filtered = uniqueProducts.filter(
          (product) =>
            product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            product.specs?.flavor
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase())
        );

        setSearchResults(filtered.slice(0, 5)); // Show top 5 unique results
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(searchProducts, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() && searchResults.length > 0) {
      // Redirect to first result or search page
      window.location.href = `/products/${
        searchResults[0]._id || searchResults[0].id
      }`;
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Pizzas":
        return <GiPizzaSlice className="text-lg text-[#db1356]" />;
      case "Shawarmas":
        return <GiDonerKebab className="text-lg text-[#d4587a]" />;
      case "Burgers":
        return <GiHamburger className="text-lg text-[#e6759a]" />;
      default:
        return <GiPizzaSlice className="text-lg text-[#490835]" />;
    }
  };

  // Menu items data
  const menuItems = [
    { name: "Home", href: "/" },
    {
      name: "Menu",
      href: "#",
      dropdown: true,
      items: [
        {
          name: "Burgers",
          href: "/all-burgers-creation",
          icon: <GiHamburger className="text-xl" />,
        },
        {
          name: "Pizzas",
          href: "/all-pizzas-creation",
          icon: <GiPizzaSlice className="text-xl" />,
        },
        {
          name: "Shawarmas",
          href: "/all-shawarmas-creation",
          icon: <GiDonerKebab className="text-xl" />,
        },
        {
          name: "All Fast Food",
          href: "/all-fastfood-products",
          icon: <GiPizzaSlice className="text-xl" />,
        },
        {
          name: "Custom Pizza",
          href: "/custom-pizza",
          icon: <GiPaintBrush className="text-xl" />,
        },
      ],
    },
    { name: "About Us", href: "/about-us" },
    { name: "Products", href: "/all-fastfood-products" },
  ];

  const containerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <>
      {/* Enhanced Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden md:h-40 h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center h-40 opacity-60"
          style={{
            backgroundImage:
              "url('https://images.unsplash.co/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1980&q=80')",
          }}
        ></div>

        {/* Decorative pink elements */}
        <motion.div
          className="absolute bottom-10 left-10 w-32 h-32 opacity-20 rotate-12"
          animate={{
            rotate: [12, 25, 12],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path
              d="M30,30 Q50,10 70,30 Q90,50 70,70 Q50,90 30,70 Q10,50 30,30 Z"
              fill="#db1356"
            />
          </svg>
        </motion.div>

        <motion.div
          className="absolute top-1/3 right-10 w-24 h-24 opacity-15 -rotate-6"
          animate={{
            rotate: [-6, 6, -6],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="40" fill="#d4587a" />
          </svg>
        </motion.div>
      </div>

      <motion.nav
        className={`fixed top-4 left-4 right-4 mx-auto max-w-7xl z-60 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/20"
            : "bg-white/85 backdrop-blur-lg rounded-3xl border border-white/30"
        }`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          boxShadow: isScrolled
            ? "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.2)"
            : "0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          border: "1px solid rgba(219, 19, 86, 0.3)",
          boxShadow: "0 0 10px rgba(219, 19, 86, 0.5)",
        }}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          {/* Increased navbar height by changing h-16 to h-20 */}
          <div className="flex justify-between items-center h-18">
            {/* Left side - Search icon for mobile, search bar for desktop */}
            <motion.div
              className="flex-shrink-0 flex items-center w-1/4"
              variants={itemVariants}
            >
              {/* Desktop search */}
              <div
                className="hidden md:block relative w-full max-w-xs group"
                ref={searchRef}
              >
                <form onSubmit={handleSearchSubmit} className="relative">
                  <motion.div
                    className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    animate={searchFocused ? { x: 2 } : { x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.svg
                      className="h-5 w-5 text-[#db3250] group-hover:text-[#db1356]"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      animate={searchFocused ? { scale: 1.1 } : { scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </motion.svg>
                  </motion.div>
                  <motion.input
                    type="text"
                    placeholder="Search for Fast Food Products.."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => {
                      setSearchFocused(true);
                      setShowSuggestions(true);
                    }}
                    onBlur={() => setSearchFocused(false)}
                    className="block w-full pl-10 pr-3 py-2 border-[#db3250] border rounded-full focus:ring-2 focus:ring-[#db1356] focus:border-transparent bg-[#fadee3] text-[#db3250] transition-all duration-300 hover:bg-gray-100 focus:bg-white"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ffc8d6]/20 to-[#ffcdd7]/20 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: searchFocused ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Search suggestions dropdown */}
                  <AnimatePresence>
                    {showSuggestions && searchQuery.length > 1 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden z-50"
                      >
                        {isLoading ? (
                          <div className="p-4 text-center text-[#4a0e33]">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#db1356] mx-auto"></div>
                            <p className="mt-2 text-sm">Searching...</p>
                          </div>
                        ) : searchResults.length > 0 ? (
                          <div className="max-h-60 overflow-y-auto">
                            {searchResults.map((product, index) => (
                              <Link
                                key={`${product._id || product.id}-${index}`}
                                href={`/products/${product._id || product.id}`}
                                className="flex items-center p-3 hover:bg-gradient-to-r hover:from-[#ffc8d6] hover:to-[#ffcdd7] transition-all duration-200 group"
                                onClick={() => setShowSuggestions(false)}
                              >
                                <div className="flex-shrink-0 mr-3">
                                  {getCategoryIcon(product.category)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-[#4a0e33] truncate group-hover:text-[#db1356]">
                                    {product.title}
                                  </p>
                                  <p className="text-xs text-[#4a0e33] truncate">
                                    {product.category} • PKR {product.price}
                                  </p>
                                </div>
                                <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <svg
                                    className="h-4 w-4 text-[#db1356]"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 5l7 7-7 7"
                                    />
                                  </svg>
                                </div>
                              </Link>
                            ))}
                          </div>
                        ) : searchQuery.length > 1 ? (
                          <div className="p-4 text-center text-gray-500">
                            <p className="text-sm">
                              No products found for "{searchQuery}"
                            </p>
                          </div>
                        ) : null}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>

              {/* Mobile search icon */}
              <motion.button
                className="md:hidden p-2 rounded-xl text-[#db3250] hover:text-[#db1356] hover:bg-[#ffc8d6] focus:outline-none focus:ring-2 focus:ring-[#db1356] transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowMobileSearch(!showMobileSearch)}
                type="button"
              >
                {showMobileSearch ? (
                  <IoClose className="h-6 w-6" />
                ) : (
                  <IoSearch className="h-6 w-6" />
                )}
              </motion.button>
            </motion.div>

            {/* Center - Enhanced Logo */}
            <motion.div
              className="flex-shrink-0 flex items-center justify-center w-2/4"
              variants={itemVariants}
            >
              <Link href="/" className="flex items-center space-x-2">
                <motion.div
                  whileHover={{
                    scale: 1.08,
                    transition: { duration: 0.3 },
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center relative"
                >
                  <motion.div
                    className="flex items-center justify-center text-red-800 font-bold text-2xl font-serif"
                    whileHover={{
                      filter: "drop-shadow(0 5px 10px rgba(220, 38, 38, 0.3))",
                    }}
                  >
                    <span className="text-3xl mr-2">🍕</span>
                    Fast Food Lahore
                  </motion.div>
                </motion.div>
              </Link>
            </motion.div>

            {/* Right side - Enhanced Navigation items */}
            <motion.div
              className="hidden md:flex items-center justify-end space-x-8 w-1/4"
              variants={itemVariants}
            >
              {menuItems.slice(2).map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <Link
                    href={item.href}
                    className="relative text-gray-700 hover:text-[#db1356] font-medium transition-all duration-300 group"
                  >
                    <span className="relative z-10">{item.name}</span>
                    <motion.div
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#ffc8d6] to-[#ffcdd7] group-hover:w-full transition-all duration-300"
                      whileHover={{ scaleY: 2 }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#ffc8d6] to-[#ffcdd7] opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    />
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced Mobile menu button */}
            <motion.div
              className="md:hidden flex items-center"
              variants={itemVariants}
            >
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-xl text-gray-700 hover:text-[#db1356] hover:bg-[#ffc8d6] focus:outline-none focus:ring-2 focus:ring-[#db1356] transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
              >
                <span className="sr-only">Open main menu</span>
                <motion.div
                  animate={isMenuOpen ? { rotate: 180 } : { rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {!isMenuOpen ? (
                    <motion.svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </motion.svg>
                  ) : (
                    <motion.svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </motion.svg>
                  )}
                </motion.div>
              </motion.button>
            </motion.div>
          </div>

          {/* Mobile search field */}
          <AnimatePresence>
            {showMobileSearch && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden pb-3"
                ref={mobileSearchRef}
              >
                <form onSubmit={handleSearchSubmit} className="relative">
                  <motion.div
                    className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    animate={searchFocused ? { x: 2 } : { x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <IoSearch className="h-5 w-5 text-[#4a0e33]" />
                  </motion.div>
                  <input
                    type="text"
                    placeholder="Search for pizzas, shawarmas, burgers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => {
                      setSearchFocused(true);
                      setShowSuggestions(true);
                    }}
                    onBlur={() => setSearchFocused(false)}
                    className="block mt-2 w-full pl-10 pr-3 py-2 border border-transparent rounded-full focus:ring-2 focus:ring-[#db1356] focus:border-transparent bg-[#fadee3] text-gray-800 placeholder-[#db3250] transition-all duration-300"
                  />

                  {/* Search suggestions dropdown for mobile */}
                  <AnimatePresence>
                    {showSuggestions && searchQuery.length > 1 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden z-50"
                      >
                        {isLoading ? (
                          <div className="p-4 text-center text-[#4a0e33]">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#db1356] mx-auto"></div>
                            <p className="mt-2 text-sm">Searching...</p>
                          </div>
                        ) : searchResults.length > 0 ? (
                          <div className="max-h-60 overflow-y-auto">
                            {searchResults.map((product, index) => (
                              <Link
                                key={`${product._id || product.id}-${index}`}
                                href={`/products/${product._id || product.id}`}
                                className="flex items-center p-3 hover:bg-gradient-to-r hover:from-[#ffc8d6] hover:to-[#ffcdd7] transition-all duration-200 group"
                                onClick={() => {
                                  setShowSuggestions(false);
                                  setShowMobileSearch(false);
                                }}
                              >
                                <div className="flex-shrink-0 mr-3">
                                  {getCategoryIcon(product.category)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-[#4a0e33] truncate group-hover:text-[#db1356]">
                                    {product.title}
                                  </p>
                                  <p className="text-xs text-[#4a0e33] truncate">
                                    {product.category} • PKR {product.price}
                                  </p>
                                </div>
                                <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <svg
                                    className="h-4 w-4 text-[#db1356]"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 5l7 7-7 7"
                                    />
                                  </svg>
                                </div>
                              </Link>
                            ))}
                          </div>
                        ) : searchQuery.length > 1 ? (
                          <div className="p-4 text-center text-gray-500">
                            <p className="text-sm">
                              No products found for "{searchQuery}"
                            </p>
                          </div>
                        ) : null}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enhanced Desktop Menu dropdown */}
          <div className="hidden md:flex justify-center items-center py-3">
            {menuItems.slice(0, 2).map((item, index) => (
              <motion.div
                key={item.name}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                {item.dropdown ? (
                  <div
                    className="mx-6 py-2"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    <motion.button
                      className="text-gray-700 hover:text-[#db1356] font-medium transition-all duration-300 flex items-center group relative"
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                      type="button"
                    >
                      <span className="relative z-10">{item.name}</span>
                      <motion.svg
                        className="ml-2 h-4 w-4 transition-transform duration-300"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        animate={
                          isDropdownOpen ? { rotate: 180 } : { rotate: 0 }
                        }
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 极 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </motion.svg>
                      <motion.div
                        className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#ffc8d6] to-[#ffcdd7] opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                        whileHover={{ scale: 1.05 }}
                      />
                    </motion.button>

                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 20, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 20, scale: 0.95 }}
                          transition={{
                            duration: 0.3,
                            ease: [0.25, 0.46, 0.45, 0.94],
                          }}
                          className="absolute top-12 left-1/2 transform -translate-x-1/2 mt-4 w-105 px-2 z-50"
                        >
                          <div className="rounded-2xl shadow-2xl ring-1 ring-black/5 overflow-hidden bg-white/95 backdrop-blur-xl border border-white/20">
                            <motion.div
                              className="relative grid gap-2 px-6 py-6 grid-cols-5"
                              initial="hidden"
                              animate="visible"
                              variants={{
                                visible: {
                                  transition: {
                                    staggerChildren: 0.05,
                                  },
                                },
                              }}
                            >
                              {item.items.map((subItem, subIndex) => (
                                <motion.div
                                  key={subItem.name}
                                  variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 },
                                  }}
                                >
                                  <Link
                                    href={subItem.href}
                                    className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-gradient-to-br hover:from-[#ffc8d6] hover:to-[#ffcdd7] transition-all duration-300 group relative overflow-hidden"
                                  >
                                    <motion.div
                                      className="h-14 w-14 rounded-full bg-gradient-to-br from-[#极fc8d6] to-[#ffcdd7] flex items-center justify-center mb-3 group-hover:shadow-lg transition-shadow duration-300"
                                      whileHover={{
                                        scale: 1.1,
                                        rotate: [0, -10, 10, 0],
                                      }}
                                      transition={{ duration: 0.4 }}
                                    >
                                      <span className="text-[#db1356]">
                                        {subItem.icon}
                                      </span>
                                    </motion.div>
                                    <span className="text-sm font-medium text-gray-900 group-hover:text-[#db1356] transition-colors duration-300">
                                      {subItem.name}
                                    </span>
                                    <motion.div
                                      className="absolute inset-0 bg-gradient-to-br from-[#ffc8d6]/20 to-[#ffcdd7]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                      initial={{
                                        scale: 0,
                                        borderRadius: "100%",
                                      }}
                                      whileHover={{
                                        scale: 1,
                                        borderRadius: "12px",
                                        transition: { duration: 0.4 },
                                      }}
                                    />
                                  </Link>
                                </motion.div>
                              ))}
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.div
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href={item.href}
                      className="mx-6 py-2 text-gray-700 hover:text-[#db1356] font-medium transition-all duration-300 relative group"
                    >
                      <span className="relative z-10">{item.name}</span>
                      <motion.div
                        className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#ffc8d6] to-[#ffcdd7] group-hover:w-full transition-all duration-300"
                        whileHover={{ scaleY: 2 }}
                      />
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enhanced Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden overflow-hidden"
              initial={{ opacity: 0, height: 0, scale: 0.95 }}
              animate={{ opacity: 1, height: "auto", scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.95 }}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <motion.div
                className="px-4 pt-4 pb-6 space-y-2 bg-white/95 backdrop-blur-xl rounded-b-2xl shadow-2xl border-t border-white/20"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.08,
                    },
                  },
                }}
              >
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                  >
                    {item.dropdown ? (
                      <div className="mt-2">
                        <motion.button
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className="w-full text-left block px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:text-[#db1356] hover:bg-gradient-to-r hover:from-[#ffc8d6] hover:to-[#ffcdd7]  items-center justify-between transition-all duration-300 group"
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          type="button"
                        >
                          <span>{item.name}</span>
                          <motion.svg
                            className="h-5 w-5 transition-transform duration-300"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            animate={
                              isDropdownOpen ? { rotate: 180 } : { rotate: 0 }
                            }
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </motion.svg>
                        </motion.button>

                        <AnimatePresence>
                          {isDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="pl-8 mt-3 space-y-2"
                            >
                              {item.items.map((subItem, subIndex) => (
                                <motion.div
                                  key={subItem.name}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: subIndex * 0.05 }}
                                >
                                  <Link
                                    href={subItem.href}
                                    className="flex items-center px-4 py-3 rounded-xl text-base font-medium text-gray-600 hover:text-[#db1356] hover:bg-gradient-to-r hover:from-[#ffc8d6] hover:to-[#ffcdd7] transition-all duration-300 group"
                                    onClick={() => setIsMenuOpen(false)}
                                  >
                                    <span className="mr-3 text-[#db1356]">
                                      {subItem.icon}
                                    </span>
                                    <span>{subItem.name}</span>
                                    <motion.div
                                      className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                      initial={{ x: -10 }}
                                      whileHover={{ x: 0 }}
                                    >
                                      <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M9 5l7 7-7 7"
                                        />
                                      </svg>
                                    </motion.div>
                                  </Link>
                                </motion.div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <motion.div
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link
                          href={item.href}
                          className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:text-[#db1356] hover:bg-gradient-to-r hover:from-[#ffc8d6] hover:to-[#ffcdd7] transition-all duration-300 relative group"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <span className="relative z-10">{item.name}</span>
                          <motion.div
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-0 bg-gradient-to-b from-[#ffc8d6] to-[#ffcdd7] group-hover:h-8 transition-all duration-300"
                            whileHover={{ scaleX: 2 }}
                          />
                        </Link>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Enhanced spacer with gradient - increased height to match new navbar height */}
      <div className="h-28 bg-gradient-to-b from-transparent to-white/10"></div>
    </>
  );
}
