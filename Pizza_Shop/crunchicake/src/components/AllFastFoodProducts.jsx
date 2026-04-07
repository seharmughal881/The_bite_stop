// src/components/AllFastFoodProducts.jsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { productsService } from "@/services/productsService";

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

const AllFastFoodProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Fetch all fast food products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productsService.getAllFastFood();
        const productData = Array.isArray(response) ? response : response.products || [];
        setProducts(productData);
        setError(null);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products by category
  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  // Get unique categories - hardcoded for fast food only
  const categories = ["all", "Pizzas", "Shawarmas", "Burgers"];

  const calculateDiscountedPrice = (price, discount) => {
    if (!discount) return price;
    const discountAmount = (parseFloat(price) * parseFloat(discount)) / 100;
    return parseFloat(price - discountAmount).toFixed(0);
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Pizzas": return "🍕";
      case "Shawarmas": return "🥙";
      case "Burgers": return "🍔";
      default: return "🍽️";
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Pizzas": return "from-red-50 to-orange-50";
      case "Shawarmas": return "from-orange-50 to-yellow-50";
      case "Burgers": return "from-yellow-50 to-amber-50";
      default: return "from-gray-50 to-gray-100";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading all fast food items...</p>
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
            🍽️ All Fast Food Items
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Complete menu of pizzas, shawarmas, and burgers. Everything you need for a perfect meal!
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-8"
        >
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-red-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="mr-2">
                  {category === "all" ? "🍽️" : getCategoryIcon(category)}
                </span>
                {category === "all" ? "All Items" : category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product._id || product.id}
              variants={cardHover}
              whileHover="hover"
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <Link href={`/products/${product._id || product.id}`}>
                <div className="relative">
                  {/* Product Image */}
                  <div className="h-48 bg-gradient-to-br from-red-100 to-orange-100 flex items-center justify-center">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.error('Image load error:', product.imageUrl);
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                        onLoad={(e) => {
                          console.log('Image loaded successfully:', product.title);
                        }}
                      />
                    ) : null}
                    <div className="text-6xl" style={{ display: product.imageUrl ? 'none' : 'flex' }}>
                      {getCategoryIcon(product.category)}
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-xs font-bold">
                    {getCategoryIcon(product.category)} {product.category}
                  </div>

                  {/* Discount Badge */}
                  {product.discount && product.discount > 0 && (
                    <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full text-sm font-bold">
                      {product.discount}% OFF
                    </div>
                  )}

                  {/* Product Details */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {product.title}
                    </h3>
                    
                    <div className="text-sm text-gray-600 mb-3">
                      {product.specs?.flavor && (
                        <span className="inline-block bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs mr-2">
                          {product.specs.flavor}
                        </span>
                      )}
                      {product.specs?.weight && (
                        <span className="text-xs text-gray-500">
                          {product.specs.weight}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        {product.discount && product.discount > 0 ? (
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-red-600">
                              PKR {calculateDiscountedPrice(product.price, product.discount)}
                            </span>
                            <span className="text-sm text-gray-400 line-through">
                              PKR {product.price}
                            </span>
                          </div>
                        ) : (
                          <span className="text-lg font-bold text-gray-800">
                            PKR {product.price}
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

        {/* No Products Found */}
        {filteredProducts.length === 0 && !loading && !error && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-500">Try selecting a different category or check back later for new arrivals!</p>
          </motion.div>
        )}

        {/* Stats Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="text-4xl mb-2">🍕</div>
            <h3 className="text-2xl font-bold text-red-600 mb-2">
              {products.filter(p => p.category === "Pizzas").length}
            </h3>
            <p className="text-gray-600">Pizzas Available</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="text-4xl mb-2">🥙</div>
            <h3 className="text-2xl font-bold text-orange-600 mb-2">
              {products.filter(p => p.category === "Shawarmas").length}
            </h3>
            <p className="text-gray-600">Shawarmas Available</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="text-4xl mb-2">🍔</div>
            <h3 className="text-2xl font-bold text-yellow-600 mb-2">
              {products.filter(p => p.category === "Burgers").length}
            </h3>
            <p className="text-gray-600">Burgers Available</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AllFastFoodProducts;
