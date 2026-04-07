// src/components/CustomPizzaBuilder.jsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";

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

const CustomPizzaBuilder = () => {
  const [selectedSize, setSelectedSize] = useState("medium");
  const [selectedCrust, setSelectedCrust] = useState("classic");
  const [selectedSauce, setSelectedSauce] = useState("tomato");
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [selectedCheese, setSelectedCheese] = useState("mozzarella");

  const pizzaSizes = [
    { name: "small", label: "Small (10\")", price: 0 },
    { name: "medium", label: "Medium (12\")", price: 200 },
    { name: "large", label: "Large (14\")", price: 400 },
    { name: "xlarge", label: "X-Large (16\")", price: 600 },
  ];

  const crustOptions = [
    { name: "classic", label: "Classic Hand-Tossed", price: 0 },
    { name: "thin", label: "Thin & Crispy", price: 0 },
    { name: "thick", label: "Thick Pan", price: 150 },
    { name: "stuffed", label: "Stuffed Crust", price: 250 },
  ];

  const sauceOptions = [
    { name: "tomato", label: "Classic Tomato", price: 0 },
    { name: "bbq", label: "BBQ Sauce", price: 50 },
    { name: "white", label: "White Sauce", price: 50 },
    { name: "spicy", label: "Spicy Arrabbiata", price: 75 },
  ];

  const cheeseOptions = [
    { name: "mozzarella", label: "Mozzarella", price: 0 },
    { name: "cheddar", label: "Cheddar Blend", price: 100 },
    { name: "parmesan", label: "Parmesan", price: 150 },
    { name: "vegan", label: "Vegan Cheese", price: 200 },
  ];

  const toppingOptions = [
    { name: "pepperoni", label: "Pepperoni", price: 150, category: "meat" },
    { name: "sausage", label: "Italian Sausage", price: 150, category: "meat" },
    { name: "bacon", label: "Crispy Bacon", price: 175, category: "meat" },
    { name: "chicken", label: "Grilled Chicken", price: 125, category: "meat" },
    { name: "beef", label: "Ground Beef", price: 150, category: "meat" },
    { name: "mushrooms", label: "Fresh Mushrooms", price: 75, category: "vegetable" },
    { name: "onions", label: "Red Onions", price: 50, category: "vegetable" },
    { name: "peppers", label: "Bell Peppers", price: 75, category: "vegetable" },
    { name: "olives", label: "Black Olives", price: 100, category: "vegetable" },
    { name: "tomatoes", label: "Fresh Tomatoes", price: 75, category: "vegetable" },
    { name: "pineapple", label: "Pineapple", price: 100, category: "fruit" },
    { name: "jalapenos", label: "Jalapeños", price: 75, category: "vegetable" },
  ];

  const calculatePrice = () => {
    let basePrice = 899; // Base pizza price
    
    // Add size price
    const sizePrice = pizzaSizes.find(s => s.name === selectedSize)?.price || 0;
    
    // Add crust price
    const crustPrice = crustOptions.find(c => c.name === selectedCrust)?.price || 0;
    
    // Add sauce price
    const saucePrice = sauceOptions.find(s => s.name === selectedSauce)?.price || 0;
    
    // Add cheese price
    const cheesePrice = cheeseOptions.find(c => c.name === selectedCheese)?.price || 0;
    
    // Add toppings price
    const toppingsPrice = selectedToppings.reduce((total, topping) => {
      const toppingOption = toppingOptions.find(t => t.name === topping);
      return total + (toppingOption?.price || 0);
    }, 0);
    
    return basePrice + sizePrice + crustPrice + saucePrice + cheesePrice + toppingsPrice;
  };

  const handleToppingToggle = (toppingName) => {
    setSelectedToppings(prev => 
      prev.includes(toppingName) 
        ? prev.filter(t => t !== toppingName)
        : [...prev, toppingName]
    );
  };

  const handleOrderNow = () => {
    const customPizza = {
      size: selectedSize,
      crust: selectedCrust,
      sauce: selectedSauce,
      cheese: selectedCheese,
      toppings: selectedToppings,
      price: calculatePrice(),
      name: "Custom Pizza"
    };
    
    // Here you would typically send this to your order system
    alert(`Custom pizza added to cart!\nTotal: PKR ${calculatePrice()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-red-800 mb-4">
            🍕 Custom Pizza Builder
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create your perfect pizza! Choose your size, crust, sauce, cheese, and toppings.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Builder Form */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="space-y-8"
          >
            {/* Size Selection */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Choose Size</h3>
              <div className="grid grid-cols-2 gap-4">
                {pizzaSizes.map((size) => (
                  <button
                    key={size.name}
                    onClick={() => setSelectedSize(size.name)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedSize === size.name
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="font-medium">{size.label}</div>
                    {size.price > 0 && (
                      <div className="text-sm text-gray-500">+PKR {size.price}</div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Crust Selection */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Choose Crust</h3>
              <div className="grid grid-cols-2 gap-4">
                {crustOptions.map((crust) => (
                  <button
                    key={crust.name}
                    onClick={() => setSelectedCrust(crust.name)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedCrust === crust.name
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="font-medium">{crust.label}</div>
                    {crust.price > 0 && (
                      <div className="text-sm text-gray-500">+PKR {crust.price}</div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Sauce Selection */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Choose Sauce</h3>
              <div className="grid grid-cols-2 gap-4">
                {sauceOptions.map((sauce) => (
                  <button
                    key={sauce.name}
                    onClick={() => setSelectedSauce(sauce.name)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedSauce === sauce.name
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="font-medium">{sauce.label}</div>
                    {sauce.price > 0 && (
                      <div className="text-sm text-gray-500">+PKR {sauce.price}</div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Cheese Selection */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Choose Cheese</h3>
              <div className="grid grid-cols-2 gap-4">
                {cheeseOptions.map((cheese) => (
                  <button
                    key={cheese.name}
                    onClick={() => setSelectedCheese(cheese.name)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedCheese === cheese.name
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="font-medium">{cheese.label}</div>
                    {cheese.price > 0 && (
                      <div className="text-sm text-gray-500">+PKR {cheese.price}</div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Toppings Selection */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Choose Toppings</h3>
              
              {/* Meat Toppings */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">🥩 Meat Toppings</h4>
                <div className="grid grid-cols-2 gap-3">
                  {toppingOptions
                    .filter(t => t.category === "meat")
                    .map((topping) => (
                      <button
                        key={topping.name}
                        onClick={() => handleToppingToggle(topping.name)}
                        className={`p-3 rounded-lg border-2 transition-all text-left ${
                          selectedToppings.includes(topping.name)
                            ? "border-red-500 bg-red-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="font-medium text-sm">{topping.label}</div>
                        <div className="text-xs text-gray-500">+PKR {topping.price}</div>
                      </button>
                    ))}
                </div>
              </div>

              {/* Vegetable Toppings */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">🥬 Vegetable Toppings</h4>
                <div className="grid grid-cols-2 gap-3">
                  {toppingOptions
                    .filter(t => t.category === "vegetable")
                    .map((topping) => (
                      <button
                        key={topping.name}
                        onClick={() => handleToppingToggle(topping.name)}
                        className={`p-3 rounded-lg border-2 transition-all text-left ${
                          selectedToppings.includes(topping.name)
                            ? "border-red-500 bg-red-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="font-medium text-sm">{topping.label}</div>
                        <div className="text-xs text-gray-500">+PKR {topping.price}</div>
                      </button>
                    ))}
                </div>
              </div>

              {/* Fruit Toppings */}
              <div>
                <h4 className="font-medium text-gray-700 mb-3">🍍 Fruit Toppings</h4>
                <div className="grid grid-cols-2 gap-3">
                  {toppingOptions
                    .filter(t => t.category === "fruit")
                    .map((topping) => (
                      <button
                        key={topping.name}
                        onClick={() => handleToppingToggle(topping.name)}
                        className={`p-3 rounded-lg border-2 transition-all text-left ${
                          selectedToppings.includes(topping.name)
                            ? "border-red-500 bg-red-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="font-medium text-sm">{topping.label}</div>
                        <div className="text-xs text-gray-500">+PKR {topping.price}</div>
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Pizza Preview & Order */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="lg:sticky lg:top-8 space-y-6"
          >
            {/* Pizza Preview */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Pizza</h3>
              <div className="bg-gradient-to-br from-red-100 to-orange-100 rounded-lg p-8 text-center">
                <div className="text-8xl mb-4">🍕</div>
                <div className="space-y-2 text-left">
                  <div className="text-sm">
                    <span className="font-medium">Size:</span> {pizzaSizes.find(s => s.name === selectedSize)?.label}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Crust:</span> {crustOptions.find(c => c.name === selectedCrust)?.label}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Sauce:</span> {sauceOptions.find(s => s.name === selectedSauce)?.label}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Cheese:</span> {cheeseOptions.find(c => c.name === selectedCheese)?.label}
                  </div>
                  {selectedToppings.length > 0 && (
                    <div className="text-sm">
                      <span className="font-medium">Toppings:</span> {selectedToppings.length} selected
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Base Pizza</span>
                  <span>PKR 899</span>
                </div>
                
                {pizzaSizes.find(s => s.name === selectedSize)?.price > 0 && (
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Size Upgrade</span>
                    <span>+PKR {pizzaSizes.find(s => s.name === selectedSize)?.price}</span>
                  </div>
                )}
                
                {crustOptions.find(c => c.name === selectedCrust)?.price > 0 && (
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Crust Upgrade</span>
                    <span>+PKR {crustOptions.find(c => c.name === selectedCrust)?.price}</span>
                  </div>
                )}
                
                {sauceOptions.find(s => s.name === selectedSauce)?.price > 0 && (
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Sauce Upgrade</span>
                    <span>+PKR {sauceOptions.find(s => s.name === selectedSauce)?.price}</span>
                  </div>
                )}
                
                {cheeseOptions.find(c => c.name === selectedCheese)?.price > 0 && (
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Cheese Upgrade</span>
                    <span>+PKR {cheeseOptions.find(c => c.name === selectedCheese)?.price}</span>
                  </div>
                )}
                
                {selectedToppings.map(topping => {
                  const toppingOption = toppingOptions.find(t => t.name === topping);
                  return (
                    <div key={topping} className="flex justify-between text-sm text-gray-600">
                      <span>{toppingOption?.label}</span>
                      <span>+PKR {toppingOption?.price}</span>
                    </div>
                  );
                })}
                
                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-red-600">PKR {calculatePrice()}</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleOrderNow}
                className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Order Now - PKR {calculatePrice()}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CustomPizzaBuilder;
