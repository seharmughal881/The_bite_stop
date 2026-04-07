// Vercel Serverless Function
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Load environment variables
dotenv.config();

// Product Schema (inline for serverless)
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true, enum: ["All Fast Food", "Pizzas", "Shawarmas", "Burgers"] },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  discount: { type: String },
  imageUrl: { type: String },
  imagePublicId: { type: String },
  features: { type: [String] },
  specs: {
    size: { type: String },
    type: { type: [String] },
    ingredients: { type: String }
  }
}, { timestamps: true });

const Product = mongoose.model("cakes", productSchema);

const app = express();

// CORS for Vercel
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json());

// Database connection
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not defined');
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
};

// Routes
app.get("/api/allfastfood", async (req, res) => {
  try {
    await connectDB();
    const products = await Product.find({ category: "All Fast Food" });
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/pizzas", async (req, res) => {
  try {
    await connectDB();
    const products = await Product.find({ category: "Pizzas" });
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/shawarmas", async (req, res) => {
  try {
    await connectDB();
    const products = await Product.find({ category: "Shawarmas" });
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/burgers", async (req, res) => {
  try {
    await connectDB();
    const products = await Product.find({ category: "Burgers" });
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "success", message: "API is healthy" });
});

module.exports = app;
