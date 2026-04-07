"use client";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { productsService } from "@/services/productsService";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiClock,
  FiCalendar,
  FiImage,
  FiAlertCircle,
} from "react-icons/fi";

// Function to get a color based on flavor
const getFlavorColor = (flavor) => {
  const colorMap = {
    Chocolate: "#db1356",
    "Red Velvet": "#d4587a",
    Vanilla: "#ffc8d6",
    Lemon: "#ffcdd7",
    "Salted Caramel": "#e6759a",
    "Dark Chocolate": "#d4587a",
    "Strawberry & Cream": "#ffc8d6",
    "Cookies & Cream": "#e6759a",
  };
  return colorMap[flavor] || "#db1356";
};

// Function to get text color based on background color
const getTextColor = (bgColor) => {
  const hex = bgColor.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#490835" : "#ffc8d6";
};

// Modern animation configs
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

const pulse = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
  tap: { scale: 0.95 },
};

const whatsappButtonAnimation = {
  rest: {
    scale: 1,
    boxShadow: "0 10px 25px -5px rgba(219, 19, 86, 0.4)",
  },
  hover: {
    scale: 1.05,
    boxShadow: "0 20px 40px -10px rgba(219, 19, 86, 0.6)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
  tap: { scale: 0.95 },
};

export default function ProductDetail() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [productCategory, setProductCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const productId = params.id;

        // Try to fetch from all fast food categories
        let foundProduct = null;
        let category = "";

        try {
          // Try pizzas first
          const pizzasResponse = await productsService.getAllPizzas();
          const pizzas = Array.isArray(pizzasResponse)
            ? pizzasResponse
            : pizzasResponse.products || [];
          foundProduct = pizzas.find(
            (p) => p._id === productId || p.id === productId
          );
          if (foundProduct) category = "pizzas";
        } catch (e) {
          console.log("Not found in pizzas");
        }

        if (!foundProduct) {
          try {
            // Try shawarmas
            const shawarmasResponse = await productsService.getAllShawarmas();
            const shawarmas = Array.isArray(shawarmasResponse)
              ? shawarmasResponse
              : shawarmasResponse.products || [];
            foundProduct = shawarmas.find(
              (p) => p._id === productId || p.id === productId
            );
            if (foundProduct) category = "shawarmas";
          } catch (e) {
            console.log("Not found in shawarmas");
          }
        }

        if (!foundProduct) {
          try {
            // Try burgers
            const burgersResponse = await productsService.getAllBurgers();
            const burgers = Array.isArray(burgersResponse)
              ? burgersResponse
              : burgersResponse.products || [];
            foundProduct = burgers.find(
              (p) => p._id === productId || p.id === productId
            );
            if (foundProduct) category = "burgers";
          } catch (e) {
            console.log("Not found in burgers");
          }
        }

        if (!foundProduct) {
          try {
            // Try all fast food
            const allFastFoodResponse = await productsService.getAllFastFood();
            const allFastFood = Array.isArray(allFastFoodResponse)
              ? allFastFoodResponse
              : allFastFoodResponse.products || [];
            foundProduct = allFastFood.find(
              (p) => p._id === productId || p.id === productId
            );
            if (foundProduct) category = "allfastfood";
          } catch (e) {
            console.log("Not found in all fast food");
          }
        }

        if (!foundProduct) {
          setError("Product not found");
          setLoading(false);
          return;
        }

        setProduct(foundProduct);
        setProductCategory(category);

        // Set default date to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setSelectedDate(tomorrow.toISOString().split("T")[0]);

        // Set default time to 2:00 PM
        setSelectedTime("14:00");
      } catch (err) {
        console.error("Error loading product:", err);
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [params.id]);

  const handleThumbnailClick = (index) => {
    setActiveImage(index);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const getBackLink = () => {
    switch (productCategory) {
      case "pizzas":
        return "/all-pizzas-creation";
      case "shawarmas":
        return "/all-shawarmas-creation";
      case "burgers":
        return "/all-burgers-creation";
      case "allfastfood":
        return "/all-fastfood-products";
      default:
        return "/";
    }
  };

  // Generate images array from product data
  const getProductImages = () => {
    if (!product) return [];

    const images = [];

    // Add main image
    if (product.imageUrl) {
      images.push(product.imageUrl);
    }

    // Add additional images if they exist
    if (product.images && Array.isArray(product.images)) {
      images.push(
        ...product.images.filter((img) => img && img !== product.imageUrl)
      );
    } else if (
      product.additionalImages &&
      Array.isArray(product.additionalImages)
    ) {
      images.push(
        ...product.additionalImages.filter(
          (img) => img && img !== product.imageUrl
        )
      );
    }

    return images.length > 0
      ? images
      : [
          // Fallback image if no images are available
          "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        ];
  };

  const images = getProductImages();

  const features = product?.features || [
    "Premium quality ingredients",
    "Made with passion and care",
    "Freshly prepared daily",
    ...(product?.specs?.size ? [`Size: ${product.specs.size}`] : []),
    ...(product?.specs?.type ? [`Type: ${product.specs.type.join(", ")}`] : []),
    ...(product?.specs?.ingredients ? [`Main ingredients: ${product.specs.ingredients}`] : []),
  ];

  const discountPercentage = product?.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const backLink = getBackLink();
  const flavorColor = product
    ? getFlavorColor(product.specs?.flavor)
    : "#db1356";
  const textColor = getTextColor(flavorColor);

  // WhatsApp message generator with all details
  const generateWhatsAppMessage = () => {
    if (!product) return "";

    const message = `Hello! I would like to order the following product:

*Product Details:*
� *${product.title}*
📦 Category: ${product.category}
🔢 Quantity: ${quantity}
💰 Total Price: PKR ${product.price * quantity}${
      product.originalPrice
        ? ` (Originally PKR ${product.originalPrice * quantity}, Save ${discountPercentage}%)`
        : ""
    }
📅 Preferred Date: ${selectedDate}
⏰ Preferred Time: ${selectedTime}

*Product Description:*
${product.description}

*Specifications:*
${product.specs?.size ? `• Size: ${product.specs.size}` : ""}
${product.specs?.type ? `• Type: ${product.specs.type.join(", ")}` : ""}
${product.specs?.ingredients ? `• Main ingredients: ${product.specs.ingredients}` : ""}

Please confirm availability and let me know about payment options. Thank you!`;

    return encodeURIComponent(message);
  };

  const whatsappLink = `https://wa.me/+923434189464?text=${generateWhatsAppMessage()}`;

  // Generate time options
  const timeOptions = [];
  for (let hour = 9; hour <= 18; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
      timeOptions.push(timeString);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#fff5f8] to-[#ffeef3]">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#db1356]"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#fff5f8] to-[#ffeef3]">
        <div className="text-center">
          <FiAlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            {error || "The requested product could not be found."}
          </p>
          <Link
            href="/"
            className="bg-[#db1356] text-white px-6 py-3 rounded-lg hover:bg-[#d4587a] transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff5f8] to-[#ffeef3]">
      {/* Back Button */}
      <div className="fixed top-4 left-4 z-50">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link
            href={backLink}
            className="flex 2xl:mt-0 md:mt-34 mt-22 items-center text-[#db1356] hover:text-[#d4587a] transition-all duration-300 group bg-white/80 backdrop-blur-sm px-4 py-3 rounded-full w-fit shadow-lg hover:shadow-xl"
          >
            <FiArrowLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
            <span className="font-medium text-sm md:text-base">
              Back to Collection
            </span>
          </Link>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 mb-12 md:mb-16">
          {/* Image Gallery */}
          <motion.div
            className="space-y-4 md:space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Main Image */}
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-gradient-to-br bg-[#ffd9e2] shadow-xl md:shadow-2xl">
              {product.discountPercentage > 0 && (
                <motion.div
                  className="absolute top-4 md:top-6 left-4 md:left-6 text-xs md:text-sm font-bold px-3 md:px-4 py-1 md:py-2 rounded-full z-10 shadow-lg"
                  style={{
                    backgroundColor: flavorColor,
                    color: textColor,
                  }}
                  initial={{ scale: 0, rotate: -15 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.4, type: "spring" }}
                >
                  {product.discountPercentage}% OFF
                </motion.div>
              )}

              <div className="aspect-square flex items-center justify-center p-6 md:p-12">
                <AnimatePresence mode="wait">
                  {imageError ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center text-gray-400"
                    >
                      <FiImage className="w-12 h-12 md:w-16 md:h-16 mb-2 md:mb-4" />
                      <p className="text-xs md:text-sm">Image not available</p>
                    </motion.div>
                  ) : (
                    <motion.img
                      key={activeImage}
                      src={images[activeImage]}
                      alt={`Product image ${activeImage + 1}`}
                      className="w-full h-full object-contain"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      onError={handleImageError}
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Thumbnail Navigation */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3 md:gap-4">
                {images.map((img, idx) => (
                  <motion.button
                    key={idx}
                    className={`aspect-square rounded-xl md:rounded-2xl overflow-hidden bg-white p-1 md:p-2 transition-all duration-300 ${
                      activeImage === idx
                        ? "ring-2 md:ring-3 ring-[#db1356] shadow-md md:shadow-lg"
                        : "ring-1 ring-[#ffcdd7] hover:ring-2 hover:ring-[#db1356]"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleThumbnailClick(idx)}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                        if (e.target.nextSibling) {
                          e.target.nextSibling.style.display = "flex";
                        }
                      }}
                    />
                    <div className="hidden w-full h-full items-center justify-center bg-gray-100 text-gray-400">
                      <FiImage className="w-4 h-4 md:w-6 md:h-6" />
                    </div>
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            className="space-y-6 md:space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-[#490835] font-serif tracking-tight mb-3">
                {product.title}
              </h1>
              {product.specs?.flavor && (
                <motion.span
                  className="inline-block text-sm md:text-base font-semibold px-3 md:px-4 py-1 md:py-2 rounded-full shadow-sm"
                  style={{
                    backgroundColor: flavorColor,
                    color: textColor,
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                  {product.specs.flavor}
                </motion.span>
              )}
            </div>

            {/* Price Section */}
            <div className="flex items-center flex-wrap gap-3 md:gap-4 py-4 md:py-6">
              <span className="text-2xl md:text-4xl font-bold text-[#490835]">
                PKR {product.price}
              </span>
              {product.originalPrice &&
                product.originalPrice > product.price && (
                  <>
                    <span className="text-lg md:text-xl text-[#db1356] line-through">
                      PKR {product.originalPrice}
                    </span>
                    <span className="bg-[#db1356] text-white text-xs md:text-sm font-medium px-3 md:px-4 py-1 md:py-2 rounded-full">
                      Save {discountPercentage}%
                    </span>
                  </>
                )}
            </div>

            {/* Product Description */}
            <div>
              <p className="text-[#db1356] text-base md:text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Delivery/Pickup Options */}
            <div className="bg-white/80 backdrop-blur-sm p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-lg md:shadow-xl">
              <h2 className="text-xl md:text-2xl font-bold text-[#490835] font-serif mb-4 md:mb-6">
                Order Details
              </h2>

              {/* Quantity Selector */}
              <div className="mb-4 md:mb-6">
                <label className="flex items-center text-[#db1356] font-medium mb-2 md:mb-3 text-sm md:text-base">
                  🔢 Quantity
                </label>
                <div className="flex items-center gap-2 md:gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 font-bold text-lg md:text-xl transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 md:w-20 text-center p-2 md:p-3 rounded-lg border border-red-200 focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg md:text-xl font-semibold"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-green-100 hover:bg-green-200 text-green-600 font-bold text-lg md:text-xl transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-4 md:mb-6">
                <div>
                  <label className="flex items-center text-[#db1356] font-medium mb-2 md:mb-3 text-sm md:text-base">
                    <FiCalendar className="mr-2 w-4 h-4 md:w-5 md:h-5" />{" "}
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full p-3 md:p-4 rounded-xl md:rounded-2xl border-none bg-[#ffd9e2] focus:ring-2 focus:ring-[#db1356] focus:bg-white shadow-sm text-sm md:text-base"
                  />
                </div>

                <div>
                  <label className="flex items-center text-[#db1356] font-medium mb-2 md:mb-3 text-sm md:text-base">
                    <FiClock className="mr-2 w-4 h-4 md:w-5 md:h-5" /> Preferred
                    Time
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full p-3 md:p-4 rounded-xl md:rounded-2xl border-none bg-[#ffd9e2] focus:ring-2 focus:ring-[#db1356] focus:bg-white shadow-sm text-sm md:text-base"
                  >
                    {timeOptions.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* WhatsApp Order Button with theme color animation */}
              <motion.a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 md:gap-3 bg-gradient-to-r bg-[#db1356ef]  text-white py-3 md:py-5 px-5 md:px-8 rounded-xl md:rounded-2xl font-semibold text-base md:text-lg relative overflow-hidden group"
                variants={whatsappButtonAnimation}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                {/* Animated ring effect */}
                <motion.div
                  className="absolute inset-0 rounded-xl md:rounded-2xl ring-2 ring-[#db1356]/30"
                  initial={{ scale: 1, opacity: 0 }}
                  whileHover={{
                    scale: 1.1,
                    opacity: 1,
                    transition: { repeat: Infinity, duration: 1.5 },
                  }}
                />

                {/* WhatsApp icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 md:w-7 md:h-7 relative z-10"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.150-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.150-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.130-.606.134-.133.298-.347.446-.520.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.520-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.520.074-.792.372-.272.297-1.040 1.016-1.040 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.200 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.360.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.570-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.510-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.640 0 5.122 1.030 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .160 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.864 3.488" />
                </svg>
                <span className="relative z-10">Add to Cart & Order via WhatsApp</span>

                {/* Subtle background animation */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#d4587a] to-[#db1356] opacity-0 group-hover:opacity-100 rounded-xl md:rounded-2xl"
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Combined Specifications and Features Section - Centered below the product */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {/* Product Specifications */}
          {product.specs && (
            <div className="bg-white/80 backdrop-blur-sm p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-lg md:shadow-xl">
              <h2 className="text-xl md:text-2xl font-bold text-[#490835] font-serif mb-4 md:mb-6">
                Specifications
              </h2>
              <div className="space-y-3 md:space-y-4">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div
                    key={key}
                    className="bg-[#ffd9e2] p-3 md:p-5 rounded-xl md:rounded-2xl transition-all hover:bg-white"
                  >
                    <h4 className="text-xs md:text-sm font-medium text-[#db1356] uppercase tracking-wide">
                      {key}
                    </h4>
                    <p className="mt-1 md:mt-2 text-[#490835] font-medium text-sm md:text-base">
                      {Array.isArray(value) ? value.join(", ") : value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Product Features */}
          <div className="bg-white/80 backdrop-blur-sm p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-lg md:shadow-xl">
            <h2 className="text-xl md:text-2xl font-bold text-[#490835] font-serif mb-4 md:mb-6">
              Why You'll Love It
            </h2>
            <ul className="space-y-3 md:space-y-4">
              {features.map((feature, idx) => (
                <motion.li
                  key={idx}
                  className="flex items-start space-x-3 md:space-x-4 bg-[#ffd9e2] p-3 md:p-5 rounded-xl md:rounded-2xl transition-all hover:bg-white"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <FiCheckCircle className="w-5 h-5 md:w-6 md:h-6 text-[#db1356] mt-0.5 flex-shrink-0" />
                  <span className="text-[#490835] text-sm md:text-lg">
                    {feature}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
