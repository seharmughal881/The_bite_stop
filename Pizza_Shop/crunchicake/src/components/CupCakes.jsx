// src/components/CupCakes.jsx
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

const imageHover = {
  rest: { scale: 1 },
  hover: { scale: 1.08 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.07 } },
};

// Function to get a color based on flavor
const getFlavorColor = (flavor) => {
  const colorMap = {
    Chocolate: "#7B3F00",
    "Red Velvet": "#C41E3A",
    Vanilla: "#F3E5AB",
    Lemon: "#FFF44F",
    "Salted Caramel": "#D2B48C",
    "Dark Chocolate": "#5A2F00",
    "Strawberry & Cream": "#FFD1DC",
    "Cookies & Cream": "#8B4513",
  };
  return colorMap[flavor] || "#7B3F00";
};

// Function to get text color based on background color
const getTextColor = (bgColor) => {
  const hex = bgColor.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#3D2B1F" : "#FAF3E8";
};

// Function to calculate discount percentage
const calculateDiscountPercentage = (originalPrice, currentPrice) => {
  if (!originalPrice || originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

export default function NewCupcakesSection() {
  const containerRef = useRef(null);
  const sortDropdownRef = useRef(null);
  const discountDropdownRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [discountFilter, setDiscountFilter] = useState("all");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isDiscountOpen, setIsDiscountOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [uniqueFlavors, setUniqueFlavors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load products from API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch cupcakes from API
        const response = await productsService.getAllCupcakes();

        // Check if response has products array or if it's the direct array
        const cupcakesData = response.products || response;

        if (!Array.isArray(cupcakesData)) {
          throw new Error("Invalid data format received from API");
        }

        // Extract unique flavors from the products
        const flavors = [
          ...new Set(
            cupcakesData.map((product) => product.specs?.flavor).filter(Boolean)
          ),
        ];
        setUniqueFlavors(flavors);

        // Enhance products with images array and calculate discount percentages
        const enhancedProducts = cupcakesData.map((product) => ({
          ...product,
          images: product.images || [product.imageUrl],
          discountPercentage: calculateDiscountPercentage(
            product.originalPrice,
            product.price
          ),
        }));

        setProducts(enhancedProducts);
      } catch (error) {
        console.error("Error loading cupcakes:", error);
        setError("Failed to load cupcakes. Please try again later.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target) &&
        discountDropdownRef.current &&
        !discountDropdownRef.current.contains(event.target)
      ) {
        setIsSortOpen(false);
        setIsDiscountOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Carousel scroll logic with progress tracking
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const checkScroll = () => {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );

      // Calculate scroll progress (0 to 1)
      const progress =
        container.scrollLeft / (container.scrollWidth - container.clientWidth);
      setScrollProgress(progress);
    };

    container.addEventListener("scroll", checkScroll);
    checkScroll();

    return () => container.removeEventListener("scroll", checkScroll);
  }, [products]);

  const scroll = (direction) => {
    const container = containerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    container.scrollTo({
      left:
        direction === "left"
          ? container.scrollLeft - scrollAmount
          : container.scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  };

  // Filter products by flavor AND discount
  const filteredProducts = products.filter((product) => {
    // Flavor filter
    const flavorMatch =
      activeFilter === "all" || product.specs?.flavor === activeFilter;

    // Discount filter
    let discountMatch = true;
    if (discountFilter === "discounted") {
      discountMatch = product.discountPercentage > 0;
    } else if (discountFilter === "no-discount") {
      discountMatch = product.discountPercentage === 0;
    } else if (discountFilter !== "all") {
      const minDiscount = parseInt(discountFilter);
      discountMatch = product.discountPercentage >= minDiscount;
    }

    return flavorMatch && discountMatch;
  });

  // Sort products based on selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name-asc":
        return a.title.localeCompare(b.title);
      case "name-desc":
        return b.title.localeCompare(a.title);
      case "newest":
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      case "discount-high":
        return b.discountPercentage - a.discountPercentage;
      case "discount-low":
        return a.discountPercentage - b.discountPercentage;
      case "featured":
      default:
        return a._id.localeCompare(b._id);
    }
  });

  if (loading) {
    const skeletons = Array.from({ length: 5 }); // Show 5 placeholder cards

    return (
      <div className="mt-[300px] flex overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar gap-8 mx-12 py-6">
        {skeletons.map((_, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[320px] snap-start rounded-2xl overflow-hidden"
          >
            <div className="animate-pulse bg-gradient-to-b from-gray-200 to-gray-100 rounded-2xl h-full shadow-xl border-gray-200 overflow-hidden relative">
              {/* Image placeholder */}
              <div className="h-64 w-full bg-gray-300"></div>

              {/* Content placeholder */}
              <div className="p-6">
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6 mb-4"></div>
                <div className="flex items-center gap-4">
                  <div className="h-6 w-24 bg-gray-300 rounded"></div>
                  <div className="h-4 w-16 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    );
  }

  if (error) {
    return (
      <div className="mx-auto py-8 px-6 md:px-10 relative overflow-hidden">
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <p className="text-red-500 text-lg mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#db1356] text-white px-4 py-2 rounded-full hover:bg-[#d4587a] transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto py-8 px-6 md:px-10 relative overflow-hidden">
      {/* Cupcake-themed background */}
      <div
        className="absolute inset-0 -z-10 overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{
            backgroundImage:
              "url('https://images.unsplash.om/photo-1614707267537-b85aaf00c4b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1980&q=80')",
          }}
        ></div>

        {/* Decorative cupcake elements */}
        <div className="absolute bottom-10 left-10 w-32 h-32 opacity-20 rotate-12">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path
              d="M30,30 Q50,10 70,30 Q90,50 70,70 Q50,90 30,70 Q10,50 30,30 Z"
              fill="#db1356"
            />
          </svg>
        </div>
        <div className="absolute top-1/3 right-10 w-24 h-24 opacity-15 -rotate-6">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="40" fill="#d4587a" />
          </svg>
        </div>
        {/* Advanced Animated Pink Particles */}
        {/* Particle 1: Up/Down with slight rotation */}
        <motion.div
          className="absolute top-1/4 left-1/5 w-8 h-8 opacity-25"
          animate={{
            y: [0, -25, 0, -15, 0],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{
            x: 40,
            y: -30,
            transition: { duration: 0.8 },
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <ellipse cx="50" cy="50" rx="40" ry="20" fill="#db1356" />
          </svg>
        </motion.div>

        {/* Particle 2: Down/Up with scale change */}
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-6 h-6 opacity-20"
          animate={{
            y: [0, 20, 0, 10, 0],
            scale: [1, 1.2, 1, 0.9, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            delay: 1,
            ease: "easeInOut",
          }}
          whileHover={{
            x: -35,
            y: 25,
            scale: 1.5,
            transition: { duration: 0.7 },
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <ellipse cx="50" cy="50" rx="20" ry="40" fill="#d4587a" />
          </svg>
        </motion.div>

        {/* Particle 3: Left/Right movement */}
        <motion.div
          className="absolute top-1/5 right-1/6 w-5 h-5 opacity-30"
          animate={{
            x: [0, 15, 0, -10, 0],
            y: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            delay: 0.5,
            ease: "easeInOut",
          }}
          whileHover={{
            x: 25,
            y: -20,
            rotate: 45,
            transition: { duration: 0.6 },
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <rect x="25" y="25" width="50" height="50" rx="10" fill="#e6759a" />
          </svg>
        </motion.div>

        {/* Particle 4: Diagonal movement */}
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-7 h-7 opacity-25"
          animate={{
            x: [0, 12, 0, -8, 0],
            y: [0, -15, 0, 10, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            delay: 1.5,
            ease: "easeInOut",
          }}
          whileHover={{
            x: -30,
            y: 35,
            scale: 1.4,
            transition: { duration: 0.9 },
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon points="50,15 85,85 15,85" fill="#d4587a" />
          </svg>
        </motion.div>

        {/* Particle 5: Bouncing effect */}
        <motion.div
          className="absolute top-2/3 left-1/4 w-4 h-4 opacity-35"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeOut",
          }}
          whileHover={{
            y: -40,
            x: 15,
            transition: { duration: 0.5 },
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="40" fill="#db1356" />
          </svg>
        </motion.div>

        {/* Particle 6: Circular/Orbital motion */}
        <motion.div
          className="absolute top-1/2 right-1/2 w-5 h-5 opacity-20"
          animate={{
            x: [0, 10, 0, -10, 0],
            y: [0, -10, 0, 10, 0],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
          whileHover={{
            x: 50,
            y: -50,
            rotate: 180,
            transition: { duration: 1.2 },
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path
              d="M50,10 A40,40 0 1,1 50,90 A40,40 0 1,1 50,10 Z"
              fill="#e6759a"
            />
          </svg>
        </motion.div>

        {/* Particle 7: Pulsing with vertical movement */}
        <motion.div
          className="absolute bottom-1/5 right-1/5 w-6 h-6 opacity-30"
          animate={{
            y: [0, -18, 0],
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            delay: 2,
            ease: "easeInOut",
          }}
          whileHover={{
            y: 30,
            x: -25,
            scale: 1.8,
            transition: { duration: 0.8 },
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <ellipse cx="50" cy="50" rx="35" ry="25" fill="#d4587a" />
          </svg>
        </motion.div>

        {/* Particle 8: Random-like movement */}
        <motion.div
          className="absolute top-3/4 left-1/6 w-5 h-5 opacity-25"
          animate={{
            x: [0, 8, -5, 12, 0],
            y: [0, -12, 8, -5, 0],
            rotate: [0, 45, -30, 0],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            delay: 0.8,
            ease: "easeInOut",
          }}
          whileHover={{
            x: -35,
            y: -25,
            rotate: -90,
            transition: { duration: 0.7 },
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <rect x="20" y="20" width="60" height="60" rx="15" fill="#db1356" />
          </svg>
        </motion.div>

        {/* Particle 9: Swirling motion */}
        <motion.div
          className="absolute top-1/6 right-1/5 w-6 h-6 opacity-20"
          animate={{
            x: [0, 15, 0, -10, 0],
            y: [0, 10, 0, -15, 0],
            rotate: [0, 180, 360, 180, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            delay: 0.3,
            ease: "easeInOut",
          }}
          whileHover={{
            x: 45,
            y: 35,
            scale: 1.6,
            transition: { duration: 0.9 },
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="40" fill="#e6759a" />
          </svg>
        </motion.div>

        {/* Particle 10: Zigzag movement */}
        <motion.div
          className="absolute bottom-1/6 left-1/4 w-4 h-4 opacity-30"
          animate={{
            x: [0, 10, -5, 15, 0],
            y: [0, -15, 10, -5, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            delay: 1.2,
            ease: "easeInOut",
          }}
          whileHover={{
            x: -40,
            y: -30,
            rotate: 120,
            transition: { duration: 0.6 },
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <rect x="30" y="30" width="40" height="40" rx="8" fill="#d4587a" />
          </svg>
        </motion.div>

        {/* Particle 11: Slow drift */}
        <motion.div
          className="absolute top-3/5 left-1/2 w-7 h-7 opacity-15"
          animate={{
            x: [0, 20, 0, -15, 0],
            y: [0, -10, 0, 15, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            delay: 0.7,
            ease: "easeInOut",
          }}
          whileHover={{
            x: 30,
            y: 40,
            scale: 1.7,
            transition: { duration: 1.1 },
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <ellipse cx="50" cy="50" rx="30" ry="45" fill="#db1356" />
          </svg>
        </motion.div>

        {/* Particle 12: Quick bounce */}
        <motion.div
          className="absolute bottom-2/5 right-1/3 w-5 h-5 opacity-25"
          animate={{
            y: [0, -25, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: 0.9,
            ease: "easeOut",
          }}
          whileHover={{
            y: -50,
            x: -20,
            transition: { duration: 0.4 },
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon points="50,10 80,70 20,70" fill="#e6759a" />
          </svg>
        </motion.div>

        {/* Particle 13: Gentle sway */}
        <motion.div
          className="absolute top-1/3 left-2/3 w-6 h-6 opacity-20"
          animate={{
            x: [0, 12, 0, -8, 0],
            rotate: [0, 10, 0, -10, 0],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            delay: 1.8,
            ease: "easeInOut",
          }}
          whileHover={{
            x: -45,
            y: 25,
            rotate: 45,
            transition: { duration: 0.8 },
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="35" fill="#d4587a" />
          </svg>
        </motion.div>

        {/* Particle 14: Pulsing circle */}
        <motion.div
          className="absolute bottom-1/2 right-1/6 w-4 h-4 opacity-35"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: 0.5,
            ease: "easeInOut",
          }}
          whileHover={{
            x: 35,
            y: -35,
            scale: 2.0,
            transition: { duration: 0.7 },
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="40" fill="#db1356" />
          </svg>
        </motion.div>

        {/* Particle 15: Diagonal drift */}
        <motion.div
          className="absolute top-2/3 right-2/5 w-5 h-5 opacity-30"
          animate={{
            x: [0, 15, 0, -10, 0],
            y: [0, 15, 0, -10, 0],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            delay: 1.4,
            ease: "easeInOut",
          }}
          whileHover={{
            x: -30,
            y: 45,
            rotate: -60,
            transition: { duration: 1.0 },
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <rect x="25" y="25" width="50" height="50" rx="12" fill="#e6759a" />
          </svg>
        </motion.div>

        {/* Particle 16: Slow rotation */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-6 h-6 opacity-25"
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          whileHover={{
            x: 40,
            y: 40,
            scale: 1.8,
            transition: { duration: 1.2 },
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <ellipse cx="50" cy="50" rx="35" ry="25" fill="#d4587a" />
          </svg>
        </motion.div>

        {/* Additional particles for more dynamic effect */}
        {/* Particle 17: Floating crumb */}
        <motion.div
          className="absolute top-1/8 left-1/3 w-3 h-3 opacity-40"
          animate={{
            y: [0, -12, 0, 8, 0],
            x: [0, 6, 0, -4, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: 2.1,
            ease: "easeInOut",
          }}
          whileHover={{
            scale: 2,
            y: -25,
            transition: { duration: 0.4 },
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="#e6759a" />
          </svg>
        </motion.div>

        {/* Particle 18: Drifting square */}
        <motion.div
          className="absolute bottom-1/6 right-1/8 w-5 h-5 opacity-25"
          animate={{
            x: [0, -18, 0, 12, 0],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            delay: 0.6,
            ease: "easeInOut",
          }}
          whileHover={{
            x: -40,
            y: -30,
            scale: 1.5,
            transition: { duration: 0.8 },
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <rect x="20" y="20" width="60" height="60" rx="20" fill="#db1356" />
          </svg>
        </motion.div>

        {/* Particle 19: Wobbling oval */}
        <motion.div
          className="absolute top-1/2 left-1/8 w-6 h-6 opacity-20"
          animate={{
            y: [0, 8, 0, -12, 0],
            scale: [1, 0.8, 1, 1.2, 1],
            rotate: [0, 15, 0, -15, 0],
          }}
          transition={{
            duration: 8.5,
            repeat: Infinity,
            delay: 1.7,
            ease: "easeInOut",
          }}
          whileHover={{
            x: 35,
            y: 20,
            scale: 1.6,
            transition: { duration: 0.7 },
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <ellipse cx="50" cy="50" rx="45" ry="25" fill="#d4587a" />
          </svg>
        </motion.div>

        {/* Particle 20: Spiraling dot */}
        <motion.div
          className="absolute bottom-3/5 left-3/5 w-4 h-4 opacity-35"
          animate={{
            x: [0, 10, 0, -8, 0],
            y: [0, -8, 0, 12, 0],
            scale: [1, 1.4, 1, 0.8, 1],
          }}
          transition={{
            duration: 7.5,
            repeat: Infinity,
            delay: 0.4,
            ease: "easeInOut",
          }}
          whileHover={{
            x: 25,
            y: -45,
            rotate: 180,
            transition: { duration: 0.9 },
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="40" fill="#e6759a" />
          </svg>
        </motion.div>
      </div>

      {/* Header section with enhanced animations */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12"
      >
        <div className="relative group mb-6 md:mb-0 text-center md:text-left">
          <motion.h2
            whileHover={{ scale: 1.03, x: 5 }}
            className="text-4xl md:text-5xl cursor-pointer font-bold text-[#490835] font-serif tracking-tight"
          >
            Delightful Cupcake Creations
          </motion.h2>
          <motion.div
            className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[#db1356] to-[#ffc8d6] rounded-full w-0 group-hover:w-full transition-all duration-700 origin-left"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
          />
          <motion.p
            className="text-[#490835] mt-3 text-lg opacity-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.7 }}
          >
            Individually crafted with premium ingredients and love
          </motion.p>
        </div>

        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Link
            href="/all-cupcakes-creation"
            className="flex items-center group transition-all duration-500"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.span
              whileHover={{ x: 3 }}
              className="text-[#490835] font-medium text-sm md:text-base group-hover:text-[#d4587a] transition-colors duration-300 bg-[#ffc8d6] px-4 py-2 rounded-full shadow-sm hover:shadow-md"
            >
              Explore All
            </motion.span>
            <motion.div
              animate={{ x: isHovered ? 8 : 4 }}
              transition={{ type: "spring", stiffness: 500 }}
              className="ml-2 text-[#490835] group-hover:text-[#d4587a] bg-[#ffc8d6] p-2 rounded-full shadow-sm hover:shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>

      {/* Filter and Sort controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
        {/* Filter tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {["all", ...uniqueFlavors].map((flavor) => (
            <button
              key={flavor}
              onClick={() => setActiveFilter(flavor)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === flavor
                ? "bg-[#db1356] text-[#ffc8d6] shadow-md"
                : "bg-[#ffc8d6] text-[#490835] hover:bg-[#ffcdd7]"
                }`}
            >
              {flavor === "all" ? "All Flavors" : flavor}
            </button>
          ))}
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4">
          {/* Discount filter dropdown */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            ref={discountDropdownRef}
          >
            <button
              onClick={() => setIsDiscountOpen(!isDiscountOpen)}
              className="flex items-center gap-2 bg-[#ffc8d6] text-[#490835] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#ffcdd7] transition-colors duration-300"
            >
              <span>
                Discount:{" "}
                {
                  discountFilterOptions.find(
                    (opt) => opt.value === discountFilter
                  )?.label
                }
              </span>
              <motion.svg
                animate={{ rotate: isDiscountOpen ? 180 : 0 }}
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </motion.svg>
            </button>

            <AnimatePresence>
              {isDiscountOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-[#ffc8d6] rounded-lg shadow-lg z-20 overflow-hidden"
                >
                  {discountFilterOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setDiscountFilter(option.value);
                        setIsDiscountOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${discountFilter === option.value
                        ? "bg-[#db1356] text-[#ffc8d6]"
                        : "text-[#db1356] hover:bg-[#fcb2c1]"
                        }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Sort dropdown */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            ref={sortDropdownRef}
          >
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-2 bg-[#ffc8d6] text-[#490835] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#ffcdd7] transition-colors duration-300"
            >
              <span>
                Sort by:{" "}
                {sortOptions.find((opt) => opt.value === sortBy)?.label}
              </span>
              <motion.svg
                animate={{ rotate: isSortOpen ? 180 : 0 }}
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </motion.svg>
            </button>

            <AnimatePresence>
              {isSortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-[#ffcdd7] rounded-lg shadow-lg z-20 overflow-hidden"
                >
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setIsSortOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${sortBy === option.value
                        ? "bg-[#db1356] text-[#ffc8d6]"
                        : "text-[#db1356] hover:bg-[#fcb2c1]"
                        }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Scroll progress indicator */}
      <motion.div
        className="h-1.5 bg-[#ffcdd7] rounded-full mb-10 overflow-hidden"
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-[#db1356] to-[#d4587a]"
          initial={{ width: 0 }}
          animate={{ width: `${scrollProgress * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      <div className="relative cursor-pointer">
        {showLeftArrow && (
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#490835] rounded-full p-4 shadow-2xl hover:shadow-3xl focus:outline-none transition-all duration-300 hover:scale-110 active:scale-95 backdrop-blur-sm"
            aria-label="Scroll left"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[#ffc8d6]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </motion.button>
        )}

        <div
          ref={containerRef}
          className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar gap-8 px-2 py-6"
        >
          {sortedProducts.map((product, index) => {
            const flavorColor = getFlavorColor(product.specs?.flavor);
            const textColor = getTextColor(flavorColor);

            return (
              <Link
                key={product._id || product.id}
                href={`/products/${product._id || product.id}`}
                className="flex-shrink-0 w-[320px] snap-start rounded-2xl overflow-hidden no-underline group"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <motion.div
                  variants={cardHover}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  className="bg-gradient-to-b from-[#ffcbd8] to-[#f9e3e9] rounded-2xl h-full shadow-xl border-[#ffcdd7] overflow-hidden relative"
                  style={{
                    boxShadow: "0 20px 50px -20px rgba(255, 167, 189, 0.4)",
                  }}
                >
                  {/* Premium decorative elements */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#db1356] to-[#d4587a]"></div>

                  <div className="relative overflow-hidden rounded-t-2xl">
                    <motion.div
                      variants={imageHover}
                      initial="rest"
                      whileHover="hover"
                      className="overflow-hidden"
                    >
                      <motion.img
                        src={
                          product.images && product.images.length > 0
                            ? product.images[0]
                            : product.imageUrl || "/placeholder-cupcake.jpg"
                        }
                        alt={product.title}
                        className="w-full h-64 object-cover"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        onError={(e) => {
                          e.target.src = "/placeholder-cupcake.jpg";
                        }}
                      />
                    </motion.div>

                    {/* Flavor badge */}
                    {product.specs?.flavor && (
                      <motion.div
                        className="absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-10"
                        style={{
                          backgroundColor: flavorColor,
                          color: textColor,
                        }}
                        initial={{ scale: 0, rotate: -15 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: index * 0.1, type: "spring" }}
                        whileHover={{ scale: 1.1, y: -2 }}
                      >
                        {product.specs.flavor}
                      </motion.div>
                    )}

                    {/* Discount badge */}
                    {product.discountPercentage > 0 && (
                      <motion.div
                        className="absolute top-4 right-4 bg-gradient-to-r from-[#e6759a] to-[#d4587a] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-10"
                        initial={{ scale: 0, rotate: 15 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: index * 0.1, type: "spring" }}
                        whileHover={{ scale: 1.1, y: -2 }}
                      >
                        {product.discountPercentage}% OFF
                      </motion.div>
                    )}
                  </div>

                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-[#490835] line-clamp-1 mb-3 group-hover:text-[#220f16] transition-colors font-serif">
                      {product.title}
                    </h2>

                    <p className="text-sm text-[#49083594] line-clamp-2 mb-4 h-10">
                      {product.description ||
                        "Individually crafted with premium ingredients and love"}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-[#490835]">
                          PKR {product.price}
                        </span>
                        {product.originalPrice &&
                          product.originalPrice > product.price && (
                            <span className="text-sm text-[#49083594] line-through">
                              PKR {product.originalPrice}
                            </span>
                          )}
                      </div>

                      {/* Discount percentage badge */}
                      {product.discountPercentage > 0 && (
                        <span className="text-xs font-bold bg-[#490835] text-white px-2 py-1 rounded-full">
                          Save {product.discountPercentage}%
                        </span>
                      )}
                    </div>

                    {/* Hover reveal details */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-b from-[#8b3a5c]/95 to-[#6b2943]/95 opacity-0 pointer-events-none flex items-center justify-center p-5"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-white text-center"
                      >
                        <p className="text-sm font-light mb-2">
                          Click to explore this creation
                        </p>
                        <motion.div
                          className="w-10 h-1 bg-[#f7fafc] rounded-full mx-auto mt-2"
                          initial={{ width: 0 }}
                          whileHover={{ width: 40 }}
                          transition={{ delay: 0.2 }}
                        />
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>

        {showRightArrow && (
          <motion.button
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#490835] rounded-full p-4 shadow-2xl hover:shadow-3xl focus:outline-none transition-all duration-300 hover:scale-110 active:scale-95 backdrop-blur-sm"
            aria-label="Scroll right"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[#ffc8d6]"
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
          </motion.button>
        )}
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

export function AllCupcakesProducts() {
  const [visibleProducts, setVisibleProducts] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [discountFilter, setDiscountFilter] = useState("all");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isDiscountOpen, setIsDiscountOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [uniqueFlavors, setUniqueFlavors] = useState([]);
  const [error, setError] = useState(null);
  const sortDropdownRef = useRef(null);
  const discountDropdownRef = useRef(null);

  // Load products from API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setError(null);

        // Fetch cupcakes from API
        const response = await productsService.getAllCupcakes();

        // Check if response has products array or if it's the direct array
        const cupcakesData = response.products || response;

        if (!Array.isArray(cupcakesData)) {
          throw new Error("Invalid data format received from API");
        }

        // Extract unique flavors from the products
        const flavors = [
          ...new Set(
            cupcakesData.map((product) => product.specs?.flavor).filter(Boolean)
          ),
        ];
        setUniqueFlavors(flavors);

        // Enhance products with images array and calculate discount percentages
        const enhancedProducts = cupcakesData.map((product) => ({
          ...product,
          images: product.images || [product.imageUrl],
          discountPercentage: calculateDiscountPercentage(
            product.originalPrice,
            product.price
          ),
        }));

        setProducts(enhancedProducts);
      } catch (error) {
        console.error("Error loading cupcakes:", error);
        setError("Failed to load cupcakes. Please try again later.");
        setProducts([]);
      }
    };

    loadProducts();
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target) &&
        discountDropdownRef.current &&
        !discountDropdownRef.current.contains(event.target)
      ) {
        setIsSortOpen(false);
        setIsDiscountOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const loadMoreProducts = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleProducts((prev) => prev + 12);
      setIsLoading(false);
    }, 1000);
  };

  // Filter products by flavor AND discount
  const filteredProducts = products.filter((product) => {
    // Flavor filter
    const flavorMatch =
      activeFilter === "all" || product.specs?.flavor === activeFilter;

    // Discount filter
    let discountMatch = true;
    if (discountFilter === "discounted") {
      discountMatch = product.discountPercentage > 0;
    } else if (discountFilter === "no-discount") {
      discountMatch = product.discountPercentage === 0;
    } else if (discountFilter !== "all") {
      const minDiscount = parseInt(discountFilter);
      discountMatch = product.discountPercentage >= minDiscount;
    }

    return flavorMatch && discountMatch;
  });

  // Sort products based on selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name-asc":
        return a.title.localeCompare(b.title);
      case "name-desc":
        return b.title.localeCompare(a.title);
      case "newest":
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      case "discount-high":
        return b.discountPercentage - a.discountPercentage;
      case "discount-low":
        return a.discountPercentage - b.discountPercentage;
      case "featured":
      default:
        return a._id.localeCompare(b._id);
    }
  });

  if (error) {
    return (
      <div className="mx-auto px-8 mt-15 py-12 relative">
        <div className="text-center py-20">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#db1356] text-white px-4 py-2 rounded-full hover:bg-[#d4587a] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto px-8 md:mt-15 mt-2 py-12 relative">
      {/* Cupcake-themed background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-90"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/phoo-1614707267537-b85aaf00c4b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1980&q=80')",
          }}
        ></div>
        <div className="absolute top-10 right-10 w-40 h-40 opacity-30">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path
              d="M30,30 Q50,10 70,30 Q90,50 70,70 Q50,90 30,70 Q10,50 30,30 Z"
              fill="#db1356"
            />
          </svg>
        </div>
        <div className="absolute bottom-10 left-10 w-32 h-32 opacity-30">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="40" fill="#d4587a" />
          </svg>
        </div>
        {/* Advanced Animated Pink Particles */}
        {/* Particle 1: Up/Down with slight rotation */}
        <motion.div
          className="absolute top-1/4 left-1/5 w-8 h-8 opacity-25"
          animate={{
            y: [0, -25, 0, -15, 0],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{
            x: 40,
            y: -30,
            transition: { duration: 0.8 },
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <ellipse cx="50" cy="50" rx="40" ry="20" fill="#db1356" />
          </svg>
        </motion.div>

        {/* Particle 2: Down/Up with scale change */}
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-6 h-6 opacity-20"
          animate={{
            y: [0, 20, 0, 10, 0],
            scale: [1, 1.2, 1, 0.9, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            delay: 1,
            ease: "easeInOut",
          }}
          whileHover={{
            x: -35,
            y: 25,
            scale: 1.5,
            transition: { duration: 0.7 },
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <ellipse cx="50" cy="50" rx="20" ry="40" fill="#d4587a" />
          </svg>
        </motion.div>

        {/* Particle 3: Left/Right movement */}
        <motion.div
          className="absolute top-1/5 right-1/6 w-5 h-5 opacity-30"
          animate={{
            x: [0, 15, 0, -10, 0],
            y: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            delay: 0.5,
            ease: "easeInOut",
          }}
          whileHover={{
            x: 25,
            y: -20,
            rotate: 45,
            transition: { duration: 0.6 },
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <rect x="25" y="25" width="50" height="50" rx="10" fill="#e6759a" />
          </svg>
        </motion.div>

        {/* Particle 4: Diagonal movement */}
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-7 h-7 opacity-25"
          animate={{
            x: [0, 12, 0, -8, 0],
            y: [0, -15, 0, 10, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            delay: 1.5,
            ease: "easeInOut",
          }}
          whileHover={{
            x: -30,
            y: 35,
            scale: 1.4,
            transition: { duration: 0.9 },
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon points="50,15 85,85 15,85" fill="#d4587a" />
          </svg>
        </motion.div>

        {/* Particle 5: Bouncing effect */}
        <motion.div
          className="absolute top-2/3 left-1/4 w-4 h-4 opacity-35"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeOut",
          }}
          whileHover={{
            y: -40,
            x: 15,
            transition: { duration: 0.5 },
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="40" fill="#db1356" />
          </svg>
        </motion.div>

        {/* Particle 6: Circular/Orbital motion */}
        <motion.div
          className="absolute top-1/2 right-1/2 w-5 h-5 opacity-20"
          animate={{
            x: [0, 10, 0, -10, 0],
            y: [0, -10, 0, 10, 0],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
          whileHover={{
            x: 50,
            y: -50,
            rotate: 180,
            transition: { duration: 1.2 },
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path
              d="M50,10 A40,40 0 1,1 50,90 A40,40 0 1,1 50,10 Z"
              fill="#e6759a"
            />
          </svg>
        </motion.div>

        {/* Particle 7: Pulsing with vertical movement */}
        <motion.div
          className="absolute bottom-1/5 right-1/5 w-6 h-6 opacity-30"
          animate={{
            y: [0, -18, 0],
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            delay: 2,
            ease: "easeInOut",
          }}
          whileHover={{
            y: 30,
            x: -25,
            scale: 1.8,
            transition: { duration: 0.8 },
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <ellipse cx="50" cy="50" rx="35" ry="25" fill="#d4587a" />
          </svg>
        </motion.div>

        {/* Particle 8: Random-like movement */}
        <motion.div
          className="absolute top-3/4 left-1/6 w-5 h-5 opacity-25"
          animate={{
            x: [0, 8, -5, 12, 0],
            y: [0, -12, 8, -5, 0],
            rotate: [0, 45, -30, 0],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            delay: 0.8,
            ease: "easeInOut",
          }}
          whileHover={{
            x: -35,
            y: -25,
            rotate: -90,
            transition: { duration: 0.7 },
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <rect x="20" y="20" width="60" height="60" rx="15" fill="#db1356" />
          </svg>
        </motion.div>

        {/* Particle 9: Swirling motion */}
        <motion.div
          className="absolute top-1/6 right-1/5 w-6 h-6 opacity-20"
          animate={{
            x: [0, 15, 0, -10, 0],
            y: [0, 10, 0, -15, 0],
            rotate: [0, 180, 360, 180, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            delay: 0.3,
            ease: "easeInOut",
          }}
          whileHover={{
            x: 45,
            y: 35,
            scale: 1.6,
            transition: { duration: 0.9 },
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="40" fill="#e6759a" />
          </svg>
        </motion.div>

        {/* Particle 10: Zigzag movement */}
        <motion.div
          className="absolute bottom-1/6 left-1/4 w-4 h-4 opacity-30"
          animate={{
            x: [0, 10, -5, 15, 0],
            y: [0, -15, 10, -5, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            delay: 1.2,
            ease: "easeInOut",
          }}
          whileHover={{
            x: -40,
            y: -30,
            rotate: 120,
            transition: { duration: 0.6 },
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <rect x="30" y="30" width="40" height="40" rx="8" fill="#d4587a" />
          </svg>
        </motion.div>

        {/* Particle 11: Slow drift */}
        <motion.div
          className="absolute top-3/5 left-1/2 w-7 h-7 opacity-15"
          animate={{
            x: [0, 20, 0, -15, 0],
            y: [0, -10, 0, 15, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            delay: 0.7,
            ease: "easeInOut",
          }}
          whileHover={{
            x: 30,
            y: 40,
            scale: 1.7,
            transition: { duration: 1.1 },
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <ellipse cx="50" cy="50" rx="30" ry="45" fill="#db1356" />
          </svg>
        </motion.div>

        {/* Particle 12: Quick bounce */}
        <motion.div
          className="absolute bottom-2/5 right-1/3 w-5 h-5 opacity-25"
          animate={{
            y: [0, -25, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: 0.9,
            ease: "easeOut",
          }}
          whileHover={{
            y: -50,
            x: -20,
            transition: { duration: 0.4 },
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon points="50,10 80,70 20,70" fill="#e6759a" />
          </svg>
        </motion.div>

        {/* Particle 13: Gentle sway */}
        <motion.div
          className="absolute top-1/3 left-2/3 w-6 h-6 opacity-20"
          animate={{
            x: [0, 12, 0, -8, 0],
            rotate: [0, 10, 0, -10, 0],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            delay: 1.8,
            ease: "easeInOut",
          }}
          whileHover={{
            x: -45,
            y: 25,
            rotate: 45,
            transition: { duration: 0.8 },
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="35" fill="#d4587a" />
          </svg>
        </motion.div>

        {/* Particle 14: Pulsing circle */}
        <motion.div
          className="absolute bottom-1/2 right-1/6 w-4 h-4 opacity-35"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: 0.5,
            ease: "easeInOut",
          }}
          whileHover={{
            x: 35,
            y: -35,
            scale: 2.0,
            transition: { duration: 0.7 },
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="40" fill="#db1356" />
          </svg>
        </motion.div>

        {/* Particle 15: Diagonal drift */}
        <motion.div
          className="absolute top-2/3 right-2/5 w-5 h-5 opacity-30"
          animate={{
            x: [0, 15, 0, -10, 0],
            y: [0, 15, 0, -10, 0],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            delay: 1.4,
            ease: "easeInOut",
          }}
          whileHover={{
            x: -30,
            y: 45,
            rotate: -60,
            transition: { duration: 1.0 },
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <rect x="25" y="25" width="50" height="50" rx="12" fill="#e6759a" />
          </svg>
        </motion.div>

        {/* Particle 16: Slow rotation */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-6 h-6 opacity-25"
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          whileHover={{
            x: 40,
            y: 40,
            scale: 1.8,
            transition: { duration: 1.2 },
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <ellipse cx="50" cy="50" rx="35" ry="25" fill="#d4587a" />
          </svg>
        </motion.div>

        {/* Additional particles for more dynamic effect */}
        {/* Particle 17: Floating crumb */}
        <motion.div
          className="absolute top-1/8 left-1/3 w-3 h-3 opacity-40"
          animate={{
            y: [0, -12, 0, 8, 0],
            x: [0, 6, 0, -4, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: 2.1,
            ease: "easeInOut",
          }}
          whileHover={{
            scale: 2,
            y: -25,
            transition: { duration: 0.4 },
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="#e6759a" />
          </svg>
        </motion.div>

        {/* Particle 18: Drifting square */}
        <motion.div
          className="absolute bottom-1/6 right-1/8 w-5 h-5 opacity-25"
          animate={{
            x: [0, -18, 0, 12, 0],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            delay: 0.6,
            ease: "easeInOut",
          }}
          whileHover={{
            x: -40,
            y: -30,
            scale: 1.5,
            transition: { duration: 0.8 },
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <rect x="20" y="20" width="60" height="60" rx="20" fill="#db1356" />
          </svg>
        </motion.div>

        {/* Particle 19: Wobbling oval */}
        <motion.div
          className="absolute top-1/2 left-1/8 w-6 h-6 opacity-20"
          animate={{
            y: [0, 8, 0, -12, 0],
            scale: [1, 0.8, 1, 1.2, 1],
            rotate: [0, 15, 0, -15, 0],
          }}
          transition={{
            duration: 8.5,
            repeat: Infinity,
            delay: 1.7,
            ease: "easeInOut",
          }}
          whileHover={{
            x: 35,
            y: 20,
            scale: 1.6,
            transition: { duration: 0.7 },
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <ellipse cx="50" cy="50" rx="45" ry="25" fill="#d4587a" />
          </svg>
        </motion.div>

        {/* Particle 20: Spiraling dot */}
        <motion.div
          className="absolute bottom-3/5 left-3/5 w-4 h-4 opacity-35"
          animate={{
            x: [0, 10, 0, -8, 0],
            y: [0, -8, 0, 12, 0],
            scale: [1, 1.4, 1, 0.8, 1],
          }}
          transition={{
            duration: 7.5,
            repeat: Infinity,
            delay: 0.4,
            ease: "easeInOut",
          }}
          whileHover={{
            x: 25,
            y: -45,
            rotate: 180,
            transition: { duration: 0.9 },
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="40" fill="#e6759a" />
          </svg>
        </motion.div>
      </div>

      <motion.div
        className="flex flex-col md:flex-row items-center justify-between mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Link
          href="/"
          className="flex items-center text-[#db1356] hover:text-[#d4587a] transition-colors duration-300 group bg-[#ffc8d6] px-4 py-2 rounded-full shadow-sm mb-4 md:mb-0"
        >
          <motion.svg
            whileHover={{ x: -5 }}
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2 transition-transform"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l-6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </motion.svg>
          Back to Home
        </Link>
        <motion.h2
          className="text-4xl font-bold text-[#490835] font-serif text-center"
          whileHover={{ scale: 1.02 }}
        >
          All Cupcake Creations
        </motion.h2>
        <div className="w-24 hidden md:block"></div>
      </motion.div>

      {/* Filter and Sort controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
        {/* Filter tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {["all", ...uniqueFlavors].map((flavor) => (
            <button
              key={flavor}
              onClick={() => setActiveFilter(flavor)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === flavor
                ? "bg-[#db1356] text-[#ffc8d6] shadow-md"
                : "bg-[#ffc8d6] text-[#490835] hover:bg-[#ffcdd7]"
                }`}
            >
              {flavor === "all" ? "All Flavors" : flavor}
            </button>
          ))}
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4">
          {/* Discount filter dropdown */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            ref={discountDropdownRef}
          >
            <button
              onClick={() => setIsDiscountOpen(!isDiscountOpen)}
              className="flex items-center gap-2 bg-[#ffc8d6] text-[#490835] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#ffcdd7] transition-colors duration-300"
            >
              <span>
                Discount:{" "}
                {
                  discountFilterOptions.find(
                    (opt) => opt.value === discountFilter
                  )?.label
                }
              </span>
              <motion.svg
                animate={{ rotate: isDiscountOpen ? 180 : 0 }}
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </motion.svg>
            </button>

            <AnimatePresence>
              {isDiscountOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-[#ffc8d6] rounded-lg shadow-lg z-20 overflow-hidden"
                >
                  {discountFilterOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setDiscountFilter(option.value);
                        setIsDiscountOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${discountFilter === option.value
                        ? "bg-[#db1356] text-[#ffc8d6]"
                        : "text-[#db1356] hover:bg-[#fcb2c1]"
                        }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Sort dropdown */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            ref={sortDropdownRef}
          >
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-2 bg-[#ffc8d6] text-[#490835] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#ffcdd7] transition-colors duration-300"
            >
              <span>
                Sort by:{" "}
                {sortOptions.find((opt) => opt.value === sortBy)?.label}
              </span>
              <motion.svg
                animate={{ rotate: isSortOpen ? 180 : 0 }}
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </motion.svg>
            </button>

            <AnimatePresence>
              {isSortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-[#ffcdd7] rounded-lg shadow-lg z-20 overflow-hidden"
                >
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setIsSortOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${sortBy === option.value
                        ? "bg-[#db1356] text-[#ffc8d6]"
                        : "text-[#db1356] hover:bg-[#fcb2c1]"
                        }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {sortedProducts.slice(0, visibleProducts).map((product) => {
          const flavorColor = getFlavorColor(product.specs?.flavor);
          const textColor = getTextColor(flavorColor);

          return (
            <Link
              key={product._id || product.id}
              href={`/products/${product._id || product.id}`}
              className="no-underline group"
            >
              <motion.div
                variants={fadeIn}
                whileHover="hover"
                initial="hidden"
                animate="visible"
                className="rounded-2xl overflow-hidden shadow-xl bg-gradient-to-b from-[#ffcbd8] to-[#f9e3e9] border-[#ffcdd7] h-full relative"
              >
                {/* Premium decorative elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#db1356] to-[#d4587a] z-10"></div>

                <div className="relative overflow-hidden">
                  <motion.div
                    className="overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.img
                      src={
                        product.images && product.images.length > 0
                          ? product.images[0]
                          : product.imageUrl || "/placeholder-cupcake.jpg"
                      }
                      alt={product.title}
                      className="w-full h-60 object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      onError={(e) => {
                        e.target.src = "/placeholder-cupcake.jpg";
                      }}
                    />
                  </motion.div>

                  {/* Flavor badge */}
                  {product.specs?.flavor && (
                    <motion.div
                      className="absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-10"
                      style={{
                        backgroundColor: flavorColor,
                        color: textColor,
                      }}
                      whileHover={{ scale: 1.1, y: -2 }}
                    >
                      {product.specs.flavor}
                    </motion.div>
                  )}

                  {/* Discount badge */}
                  {product.discountPercentage > 0 && (
                    <motion.div
                      className="absolute top-4 right-4 bg-gradient-to-r from-[#e6759a] to-[#d4587a] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-10"
                      whileHover={{ scale: 1.1, y: -2 }}
                    >
                      {product.discountPercentage}% OFF
                    </motion.div>
                  )}
                </div>

                <div className="p-5">
                  <h2 className="text-lg font-semibold text-[#490835] line-clamp-1 mb-2 group-hover:text-[#220f16] transition-colors font-serif">
                    {product.title}
                  </h2>

                  <p className="text-sm text-[#49083594] line-clamp-2 mb-4 h-10">
                    {product.description ||
                      "Individually crafted with premium ingredients and love"}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-[#490835]">
                        PKR {product.price}
                      </span>
                      {product.originalPrice &&
                        product.originalPrice > product.price && (
                          <span className="text-sm text-[#49083594] line-through">
                            PKR {product.originalPrice}
                          </span>
                        )}
                    </div>

                    {product.discountPercentage > 0 && (
                      <span className="text-xs font-bold bg-[#490835] text-white px-2 py-1 rounded-full">
                        Save {product.discountPercentage}%
                      </span>
                    )}
                  </div>

                  {/* Hover reveal details */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-[#8b3a5c]/95 to-[#6b2943]/95 opacity-0 pointer-events-none flex items-center justify-center p-5"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="text-white text-center"
                    >
                      <p className="text-sm font-light mb-2">
                        Click to explore this creation
                      </p>
                      <motion.div
                        className="w-10 h-1 bg-[#f7fafc] rounded-full mx-auto mt-2"
                        initial={{ width: 0 }}
                        whileHover={{ width: 40 }}
                        transition={{ delay: 0.2 }}
                      />
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </motion.div>

      {visibleProducts < sortedProducts.length && (
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.button
            onClick={loadMoreProducts}
            disabled={isLoading}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-[#db1356] to-[#d4587a] hover:from-[#d4587a] hover:to-[#e6759a] text-white font-medium py-3 px-8 rounded-full transition-all duration-300 flex items-center shadow-lg hover:shadow-xl"
          >
            {isLoading ? (
              <>
                <motion.svg
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="-ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </motion.svg>
                Loading...
              </>
            ) : (
              "Discover More"
            )}
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
