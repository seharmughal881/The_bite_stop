// Vercel Serverless Function - Simple Working Version
const express = require("express");
const cors = require("cors");

const app = express();

// CORS
app.use(cors());
app.use(express.json());

// Complete Mock Data (Pizza + Bakery)
const mockProducts = {
  "All Fast Food": [
    { _id: "1", title: "Classic Burger", category: "All Fast Food", price: 299, description: "Juicy beef patty with fresh lettuce, tomato, and special sauce", imageUrl: "/images/burger.jpg", originalPrice: 349, discount: "15% OFF" },
    { _id: "2", title: "Chicken Sandwich", category: "All Fast Food", price: 249, description: "Grilled chicken breast with crispy bacon and cheese", imageUrl: "/images/sandwich.jpg", originalPrice: 299, discount: "17% OFF" },
    { _id: "3", title: "French Fries", category: "All Fast Food", price: 149, description: "Crispy golden fries with special seasoning", imageUrl: "/images/fries.jpg", originalPrice: 179, discount: "17% OFF" }
  ],
  "Pizzas": [
    { _id: "4", title: "Margherita Pizza", category: "Pizzas", price: 599, description: "Fresh mozzarella, basil, and tomato sauce on crispy crust", imageUrl: "/images/margherita.jpg", originalPrice: 699, discount: "14% OFF" },
    { _id: "5", title: "Pepperoni Feast", category: "Pizzas", price: 799, description: "Double pepperoni with extra cheese and herbs", imageUrl: "/images/pepperoni.jpg", originalPrice: 899, discount: "11% OFF" },
    { _id: "6", title: "BBQ Chicken Deluxe", category: "Pizzas", price: 899, description: "Grilled chicken, BBQ sauce, red onions, and cilantro", imageUrl: "/images/bbq-chicken.jpg", originalPrice: 999, discount: "10% OFF" },
    { _id: "7", title: "Veggie Supreme", category: "Pizzas", price: 749, description: "Bell peppers, mushrooms, olives, and extra cheese", imageUrl: "/images/veggie.jpg", originalPrice: 849, discount: "12% OFF" },
    { _id: "8", title: "Meat Lovers", category: "Pizzas", price: 999, description: "Pepperoni, sausage, bacon, and ground beef", imageUrl: "/images/meat-lovers.jpg", originalPrice: 1149, discount: "13% OFF" }
  ],
  "Shawarmas": [
    { _id: "9", title: "Chicken Shawarma", category: "Shawarmas", price: 299, description: "Tender chicken strips with garlic sauce and pickles", imageUrl: "/images/chicken-shawarma.jpg", originalPrice: 349, discount: "14% OFF" },
    { _id: "10", title: "Beef Shawarma", category: "Shawarmas", price: 349, description: "Marinated beef with tahini sauce and vegetables", imageUrl: "/images/beef-shawarma.jpg", originalPrice: 399, discount: "13% OFF" },
    { _id: "11", title: "Mixed Grill Shawarma", category: "Shawarmas", price: 399, description: "Combination of chicken and beef with special sauce", imageUrl: "/images/mixed-shawarma.jpg", originalPrice: 459, discount: "13% OFF" }
  ],
  "Burgers": [
    { _id: "12", title: "Classic Beef Burger", category: "Burgers", price: 399, description: "100% beef patty with lettuce, tomato, onion, and special sauce", imageUrl: "/images/classic-burger.jpg", originalPrice: 449, discount: "11% OFF" },
    { _id: "13", title: "Cheese Burger Deluxe", category: "Burgers", price: 449, description: "Double cheese patty with bacon and special sauce", imageUrl: "/images/cheese-burger.jpg", originalPrice: 519, discount: "13% OFF" },
    { _id: "14", title: "Chicken Burger", category: "Burgers", price: 349, description: "Crispy chicken breast with lettuce and mayo", imageUrl: "/images/chicken-burger.jpg", originalPrice: 399, discount: "13% OFF" },
    { _id: "15", title: "Veggie Burger", category: "Burgers", price: 299, description: "Plant-based patty with fresh vegetables and special sauce", imageUrl: "/images/veggie-burger.jpg", originalPrice: 349, discount: "14% OFF" }
  ],
  "Cakes": [
    { _id: "16", title: "Classic Chocolate Cake", category: "Cakes", price: 1299, description: "Rich chocolate cake with layers of creamy chocolate frosting", imageUrl: "/images/chocolate-cake.jpg", originalPrice: 1599, discount: "19% OFF" },
    { _id: "17", title: "Red Velvet Dream Cake", category: "Cakes", price: 1499, description: "Stunning crimson cake with luxurious cream cheese frosting", imageUrl: "/images/red-velvet.jpg", originalPrice: 1899, discount: "21% OFF" },
    { _id: "18", title: "Vanilla Bean Bliss Cake", category: "Cakes", price: 1199, description: "Light and fluffy vanilla cake made with real vanilla beans", imageUrl: "/images/vanilla-cake.jpg", originalPrice: 1499, discount: "20% OFF" }
  ],
  "Cupcakes": [
    { _id: "19", title: "Classic Chocolate Cupcakes", category: "Cupcakes", price: 599, description: "Rich and moist chocolate cupcakes with creamy chocolate frosting", imageUrl: "/images/chocolate-cupcakes.jpg", originalPrice: 799, discount: "25% OFF" },
    { _id: "20", title: "Red Velvet Cupcakes", category: "Cupcakes", price: 699, description: "Stunning crimson cupcakes with luxurious cream cheese frosting", imageUrl: "/images/red-velvet-cupcakes.jpg", originalPrice: 899, discount: "22% OFF" }
  ],
  "Desserts": [
    { _id: "21", title: "Classic Tiramisu", category: "Desserts", price: 799, description: "Layers of coffee-soaked ladyfingers and mascarpone cream", imageUrl: "/images/tiramisu.jpg", originalPrice: 999, discount: "20% OFF" },
    { _id: "22", title: "New York Cheesecake Slice", category: "Desserts", price: 599, description: "Creamy, dense cheesecake with graham cracker crust", imageUrl: "/images/cheesecake.jpg", originalPrice: 799, discount: "20% OFF" }
  ]
};

// Routes (Complete Pizza + Bakery Version)
app.get("/api/allfastfood", (req, res) => {
  res.json({ success: true, products: mockProducts["All Fast Food"] });
});

app.get("/api/pizzas", (req, res) => {
  res.json({ success: true, products: mockProducts["Pizzas"] });
});

app.get("/api/shawarmas", (req, res) => {
  res.json({ success: true, products: mockProducts["Shawarmas"] });
});

app.get("/api/burgers", (req, res) => {
  res.json({ success: true, products: mockProducts["Burgers"] });
});

// Bakery API Routes
app.get("/api/cakes", (req, res) => {
  res.json({ success: true, products: mockProducts["Cakes"] });
});

app.get("/api/cupcakes", (req, res) => {
  res.json({ success: true, products: mockProducts["Cupcakes"] });
});

app.get("/api/desserts", (req, res) => {
  res.json({ success: true, products: mockProducts["Desserts"] });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "success", message: "Complete Pizza + Bakery API is working" });
});

// Catch all for API routes
app.use("/api/*", (req, res) => {
  res.status(404).json({ message: "API endpoint not found" });
});

module.exports = app;
