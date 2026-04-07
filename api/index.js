// Vercel Serverless Function - Simple Working Version
const express = require("express");
const cors = require("cors");

const app = express();

// CORS
app.use(cors());
app.use(express.json());

// Mock Data (Same as your local working version)
const mockProducts = {
  "All Fast Food": [
    { _id: "1", title: "Classic Burger", category: "All Fast Food", price: 299, description: "Delicious burger with fries", imageUrl: "/images/burger.jpg" },
    { _id: "2", title: "Chicken Pizza", category: "All Fast Food", price: 599, description: "Tasty chicken pizza", imageUrl: "/images/pizza.jpg" }
  ],
  "Pizzas": [
    { _id: "3", title: "Margherita Pizza", category: "Pizzas", price: 499, description: "Classic margherita with fresh mozzarella", imageUrl: "/images/margherita.jpg" },
    { _id: "4", title: "Pepperoni Pizza", category: "Pizzas", price: 699, description: "Spicy pepperoni with cheese", imageUrl: "/images/pepperoni.jpg" },
    { _id: "5", title: "BBQ Chicken Pizza", category: "Pizzas", price: 799, description: "BBQ chicken with onions", imageUrl: "/images/bbq.jpg" }
  ],
  "Shawarmas": [
    { _id: "6", title: "Chicken Shawarma", category: "Shawarmas", price: 249, description: "Grilled chicken shawarma", imageUrl: "/images/shawarma.jpg" },
    { _id: "7", title: "Beef Shawarma", category: "Shawarmas", price: 299, description: "Tender beef shawarma", imageUrl: "/images/beef-shawarma.jpg" }
  ],
  "Burgers": [
    { _id: "8", title: "Classic Beef Burger", category: "Burgers", price: 399, description: "Juicy beef burger with lettuce", imageUrl: "/images/beef-burger.jpg" },
    { _id: "9", title: "Cheese Burger", category: "Burgers", price: 349, description: "Double cheese burger", imageUrl: "/images/cheese-burger.jpg" }
  ]
};

// Routes (Simple Working Version)
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

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "success", message: "API is working" });
});

// Catch all for API routes
app.use("/api/*", (req, res) => {
  res.status(404).json({ message: "API endpoint not found" });
});

module.exports = app;
