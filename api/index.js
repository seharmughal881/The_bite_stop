// Vercel Serverless Function
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();

// CORS
app.use(cors());
app.use(express.json());

// Mock data for testing (without database)
const mockProducts = {
  "All Fast Food": [
    { _id: "1", title: "Classic Burger", category: "All Fast Food", price: 299, description: "Delicious burger with fries" },
    { _id: "2", title: "Chicken Pizza", category: "All Fast Food", price: 599, description: "Tasty chicken pizza" }
  ],
  "Pizzas": [
    { _id: "3", title: "Margherita Pizza", category: "Pizzas", price: 499, description: "Classic margherita" },
    { _id: "4", title: "Pepperoni Pizza", category: "Pizzas", price: 699, description: "Spicy pepperoni" }
  ],
  "Shawarmas": [
    { _id: "5", title: "Chicken Shawarma", category: "Shawarmas", price: 249, description: "Grilled chicken shawarma" }
  ],
  "Burgers": [
    { _id: "6", title: "Beef Burger", category: "Burgers", price: 399, description: "Juicy beef burger" }
  ]
};

// Routes
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
  res.json({ status: "success", message: "API is healthy" });
});

// Catch all for API routes
app.use("/api/*", (req, res) => {
  res.status(404).json({ message: "API endpoint not found" });
});

module.exports = app;
