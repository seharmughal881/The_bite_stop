"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheck, FiPlus, FiMinus, FiShoppingCart } from "react-icons/fi";

// Animation configs
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

// Customization options
const FLAVOR_OPTIONS = [
  {
    id: "chocolate",
    name: "Chocolate",
    description: "Rich, decadent chocolate flavor",
    color: "#db1356",
  },
  {
    id: "vanilla",
    name: "Vanilla",
    description: "Classic vanilla bean flavor",
    color: "#ffc8d6",
  },
  {
    id: "red-velvet",
    name: "Red Velvet",
    description: "Velvety smooth with cream cheese notes",
    color: "#d4587a",
  },
  {
    id: "nutella",
    name: "Nutella",
    description: "Hazelnut chocolate delight",
    color: "#e6759a",
  },
  {
    id: "lotus",
    name: "Lotus Biscoff",
    description: "Caramelized biscuit flavor",
    color: "#ffcdd7",
  },
  {
    id: "caramel-crunch",
    name: "Caramel Crunch",
    description: "Buttery caramel with crunchy bits",
    color: "#ffc8d6",
  },
];

const FROSTING_OPTIONS = [
  { id: "buttercream", name: "Buttercream" },
  { id: "cream-cheese", name: "Cream Cheese" },
  { id: "whipped-cream", name: "Whipped Cream" },
  { id: "ganache", name: "Chocolate Ganache" },
  { id: "fondant", name: "Fondant" },
];

const FILLING_OPTIONS = [
  { id: "none", name: "No Filling" },
  { id: "chocolate-mousse", name: "Chocolate Mousse" },
  { id: "strawberry", name: "Strawberry Jam" },
  { id: "vanilla-custard", name: "Vanilla Custard" },
  { id: "caramel", name: "Salted Caramel" },
  { id: "raspberry", name: "Raspberry Coulis" },
];

const SIZE_OPTIONS = [
  { id: "small", name: "Small (6-8 servings)", servings: "6-8" },
  { id: "medium", name: "Medium (10-12 servings)", servings: "10-12" },
  { id: "large", name: "Large (15-20 servings)", servings: "15-20" },
  { id: "xlarge", name: "Extra Large (25-30 servings)", servings: "25-30" },
];

const THEME_OPTIONS = [
  { id: "birthday", name: "Birthday" },
  { id: "anniversary", name: "Anniversary" },
  { id: "wedding", name: "Wedding" },
  { id: "baby-shower", name: "Baby Shower" },
  { id: "gradution", name: "Graduation" },
  { id: "custom", name: "Custom Design" },
];

const DECORATION_OPTIONS = [
  { id: "fresh-flowers", name: "Fresh Flowers" },
  { id: "chocolate-drip", name: "Chocolate Drip" },
  { id: "fondant-figures", name: "Fondant Figures" },
  { id: "edible-images", name: "Edible Images" },
  { id: "macarons", name: "Macarons" },
  { id: "custom-message", name: "Custom Message" },
];

export default function CustomCakeBuilder() {
  const [activeStep, setActiveStep] = useState(0);
  const [customCake, setCustomCake] = useState({
    flavor: null,
    frosting: null,
    filling: null,
    size: null,
    theme: null,
    decorations: [],
    message: "",
  });

  const [quantity, setQuantity] = useState(1);

  const steps = [
    { id: "flavor", title: "Choose Flavor" },
    { id: "frosting", title: "Select Frosting" },
    { id: "filling", title: "Add Filling" },
    { id: "size", title: "Select Size" },
    { id: "theme", title: "Choose Theme" },
    { id: "decorations", title: "Add Decorations" },
    { id: "message", title: "Personal Message" },
    { id: "review", title: "Review Your Design" },
  ];

  const handleSelection = (category, item) => {
    if (category === "decorations") {
      // Toggle decorations
      const isSelected = customCake.decorations.some((d) => d.id === item.id);
      if (isSelected) {
        setCustomCake((prev) => ({
          ...prev,
          decorations: prev.decorations.filter((d) => d.id !== item.id),
        }));
      } else {
        setCustomCake((prev) => ({
          ...prev,
          decorations: [...prev.decorations, item],
        }));
      }
    } else {
      setCustomCake((prev) => ({ ...prev, [category]: item }));
      if (activeStep < steps.length - 2) {
        // Auto-advance except for last steps
        setTimeout(() => setActiveStep(activeStep + 1), 300);
      }
    }
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const generateWhatsAppMessage = () => {
    const message = `Hello! I would like to order a custom cake:

*Cake Design Details:*
🎂 *Custom Cake Order*
🍰 Flavor: ${customCake.flavor?.name || "Not selected"}
🧁 Frosting: ${customCake.frosting?.name || "Not selected"}
🥮 Filling: ${customCake.filling?.name || "None"}
📏 Size: ${customCake.size?.name || "Not selected"}
🎨 Theme: ${customCake.theme?.name || "Not selected"}
✨ Decorations: ${
      customCake.decorations.length > 0
        ? customCake.decorations.map((d) => d.name).join(", ")
        : "None"
    }
💌 Message: ${customCake.message || "None"}

*Quantity:* ${quantity}

Please contact me to discuss pricing and availability. Thank you!`;

    return encodeURIComponent(message);
  };

  const whatsappLink = `https://wa.me/+923024320210?text=${generateWhatsAppMessage()}`;

  const renderStepContent = () => {
    switch (activeStep) {
      case 0: // Flavor
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FLAVOR_OPTIONS.map((flavor) => (
              <motion.button
                key={flavor.id}
                className={`p-4 rounded-xl cursor-pointer border-2 transition-all duration-300 text-left ${
                  customCake.flavor?.id === flavor.id
                    ? "border-[#db1356] bg-[#ffc8d6]"
                    : "border-gray-200 hover:border-[#db1356]/50"
                }`}
                onClick={() => handleSelection("flavor", flavor)}
                whileHover="hover"
                whileTap="tap"
                variants={pulse}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-[#490835]">
                    {flavor.name}
                  </h3>
                  <div
                    className="w-5 h-5 rounded-full"
                    style={{ backgroundColor: flavor.color }}
                  />
                </div>
                <p className="text-sm text-[#db1356]">{flavor.description}</p>
              </motion.button>
            ))}
          </div>
        );

      case 1: // Frosting
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FROSTING_OPTIONS.map((frosting) => (
              <motion.button
                key={frosting.id}
                className={`p-4 rounded-xl cursor-pointer border-2 transition-all duration-300 text-left ${
                  customCake.frosting?.id === frosting.id
                    ? "border-[#db1356] bg-[#ffc8d6]"
                    : "border-gray-200 hover:border-[#db1356]/50"
                }`}
                onClick={() => handleSelection("frosting", frosting)}
                whileHover="hover"
                whileTap="tap"
                variants={pulse}
              >
                <h3 className="font-semibold text-[#490835]">
                  {frosting.name}
                </h3>
              </motion.button>
            ))}
          </div>
        );

      case 2: // Filling
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FILLING_OPTIONS.map((filling) => (
              <motion.button
                key={filling.id}
                className={`p-4 rounded-xl cursor-pointer border-2 transition-all duration-300 text-left ${
                  customCake.filling?.id === filling.id
                    ? "border-[#db1356] bg-[#ffc8d6]"
                    : "border-gray-200 hover:border-[#db1356]/50"
                }`}
                onClick={() => handleSelection("filling", filling)}
                whileHover="hover"
                whileTap="tap"
                variants={pulse}
              >
                <h3 className="font-semibold text-[#490835]">{filling.name}</h3>
              </motion.button>
            ))}
          </div>
        );

      case 3: // Size
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SIZE_OPTIONS.map((size) => (
              <motion.button
                key={size.id}
                className={`p-4 rounded-xl cursor-pointer border-2 transition-all duration-300 text-left ${
                  customCake.size?.id === size.id
                    ? "border-[#db1356] bg-[#ffc8d6]"
                    : "border-gray-200 hover:border-[#db1356]/50"
                }`}
                onClick={() => handleSelection("size", size)}
                whileHover="hover"
                whileTap="tap"
                variants={pulse}
              >
                <h3 className="font-semibold text-[#490835] mb-1">
                  {size.name}
                </h3>
                <p className="text-sm text-[#db1356]">
                  Serves {size.servings} people
                </p>
              </motion.button>
            ))}
          </div>
        );

      case 4: // Theme
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {THEME_OPTIONS.map((theme) => (
              <motion.button
                key={theme.id}
                className={`p-4 rounded-xl cursor-pointer border-2 transition-all duration-300 text-left ${
                  customCake.theme?.id === theme.id
                    ? "border-[#db1356] bg-[#ffc8d6]"
                    : "border-gray-200 hover:border-[#db1356]/50"
                }`}
                onClick={() => handleSelection("theme", theme)}
                whileHover="hover"
                whileTap="tap"
                variants={pulse}
              >
                <h3 className="font-semibold text-[#490835]">{theme.name}</h3>
              </motion.button>
            ))}
          </div>
        );

      case 5: // Decorations
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DECORATION_OPTIONS.map((decoration) => (
              <motion.button
                key={decoration.id}
                className={`p-4 rounded-xl cursor-pointer border-2 transition-all duration-300 text-left ${
                  customCake.decorations.some((d) => d.id === decoration.id)
                    ? "border-[#db1356] bg-[#ffc8d6]"
                    : "border-gray-200 hover:border-[#db1356]/50"
                }`}
                onClick={() => handleSelection("decorations", decoration)}
                whileHover="hover"
                whileTap="tap"
                variants={pulse}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-[#490835]">
                    {decoration.name}
                  </h3>
                  {customCake.decorations.some(
                    (d) => d.id === decoration.id
                  ) && <FiCheck className="text-[#db1356] w-5 h-5" />}
                </div>
              </motion.button>
            ))}
          </div>
        );

      case 6: // Message
        return (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-[#db1356]">
              Add a personal message (optional)
            </label>
            <textarea
              value={customCake.message}
              onChange={(e) =>
                setCustomCake((prev) => ({ ...prev, message: e.target.value }))
              }
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#db1356] focus:border-transparent"
              rows={3}
              placeholder="Happy Birthday! 🎂 or Congratulations! 🎉"
            />
            <button
              onClick={handleNext}
              className="bg-[#db1356] cursor-pointer text-white px-6 py-3 rounded-xl hover:bg-[#d4587a] transition-colors"
            >
              Review Your Design
            </button>
          </div>
        );

      case 7: // Review
        return (
          <div className="space-y-6">
            <div className="bg-[#ffc8d6] p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-[#490835] mb-4">
                Your Custom Cake Design
              </h3>

              <div className="space-y-3">
                {customCake.flavor && (
                  <div className="flex justify-between">
                    <span className="text-[#db1356]">Flavor:</span>
                    <span className="font-semibold text-[#490835]">
                      {customCake.flavor.name}
                    </span>
                  </div>
                )}

                {customCake.frosting && (
                  <div className="flex justify-between">
                    <span className="text-[#db1356]">Frosting:</span>
                    <span className="font-semibold text-[#490835]">
                      {customCake.frosting.name}
                    </span>
                  </div>
                )}

                {customCake.filling && customCake.filling.id !== "none" && (
                  <div className="flex justify-between">
                    <span className="text-[#db1356]">Filling:</span>
                    <span className="font-semibold text-[#490835]">
                      {customCake.filling.name}
                    </span>
                  </div>
                )}

                {customCake.size && (
                  <div className="flex justify-between">
                    <span className="text-[#db1356]">Size:</span>
                    <span className="font-semibold text-[#490835]">
                      {customCake.size.name}
                    </span>
                  </div>
                )}

                {customCake.theme && (
                  <div className="flex justify-between">
                    <span className="text-[#db1356]">Theme:</span>
                    <span className="font-semibold text-[#490835]">
                      {customCake.theme.name}
                    </span>
                  </div>
                )}

                {customCake.decorations.length > 0 && (
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-[#db1356]">Decorations:</span>
                    </div>
                    <ul className="ml-4 space-y-1">
                      {customCake.decorations.map((decoration) => (
                        <li
                          key={decoration.id}
                          className="flex justify-between"
                        >
                          <span className="text-[#490835]">
                            • {decoration.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {customCake.message && (
                  <div className="mt-4 pt-3 border-t border-[#ffcdd7]">
                    <div className="flex justify-between">
                      <span className="text-[#db1356]">Personal Message:</span>
                    </div>
                    <p className="font-semibold text-[#490835] mt-1">
                      "{customCake.message}"
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#ffcdd7]">
                <div className="flex items-center space-x-4">
                  <span className="text-[#db1356]">Quantity:</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-1 rounded-lg bg-[#ffcdd7] hover:bg-[#ffc8d6] text-[#490835]"
                    >
                      <FiMinus className="w-4 h-4" />
                    </button>
                    <span className="font-semibold w-8 text-center text-[#490835]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="p-1 rounded-lg bg-[#ffcdd7] hover:bg-[#ffc8d6] text-[#490835]"
                    >
                      <FiPlus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <motion.a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-gradient-to-r from-[#db1356] to-[#d4587a] text-white py-4 px-8 rounded-xl font-semibold text-lg hover:from-[#d4587a] hover:to-[#e6759a] transition-all duration-300"
              whileHover="hover"
              whileTap="tap"
              variants={pulse}
            >
              <FiShoppingCart className="w-6 h-6" />
              Order via WhatsApp
            </motion.a>

            <p className="text-center text-sm text-[#db1356]">
              We'll contact you to discuss pricing and confirm your order
              details.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="mx-auto py-12 px-6 md:px-10 relative overflow-hidden">
      {/* Pink-themed background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage:
              "url('https://images.unsplas.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1980&q=80')",
          }}
        ></div>
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

        {/* NEW PARTICLES - Added 8 more particles for enhanced effect */}

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
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-[#490835] font-serif mb-4">
          Design Your Dream Cake
        </h2>
        <p className="text-[#db1356] text-lg max-w-2xl mx-auto">
          Create a custom cake masterpiece with our easy builder. Choose your
          flavors, frosting, decorations, and more to create the perfect cake
          for any occasion.
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Progress Steps */}
        <div className="bg-[#fadfe4] p-6 border-b border-[#ffcdd7]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-[#490835]">
              {steps[activeStep].title}
            </h3>
            <span className="text-sm text-[#db1356]">
              Step {activeStep + 1} of {steps.length}
            </span>
          </div>

          <div className="flex space-x-2">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`h-2 flex-1 rounded-full ${
                  index <= activeStep ? "bg-[#db1356]" : "bg-[#ffffff]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <motion.div
            key={activeStep}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="min-h-[400px]"
          >
            {renderStepContent()}
          </motion.div>

          {/* Navigation */}
          {activeStep < steps.length - 1 && activeStep !== 6 && (
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handleBack}
                disabled={activeStep === 0}
                className={`px-6 py-2 rounded-xl cursor-pointer ${
                  activeStep === 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-[#db1356] hover:bg-[#ffc8d6]"
                }`}
              >
                Back
              </button>

              <button
                onClick={handleNext}
                className="bg-[#db1356] cursor-pointer text-white px-6 py-2 rounded-xl hover:bg-[#d4587a] transition-colors"
              >
                {activeStep === steps.length - 2 ? "Review Design" : "Next"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quick Navigation */}
      {activeStep < steps.length - 1 && (
        <div className="mt-8 text-center">
          <p className="text-[#db1356] text-sm">
            Not sure? You can always change your selections later!
          </p>
        </div>
      )}
    </div>
  );
}
