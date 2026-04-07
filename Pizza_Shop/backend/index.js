const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// ✅ Import all route files
const allFastFoodRoutes = require("./routes/allfastfood");
const pizzaRoutes = require("./routes/pizzas");
const shawarmaRoutes = require("./routes/shawarmas");
const burgerRoutes = require("./routes/burgers");

dotenv.config();
connectDB();

const app = express();

// Middleware
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api/allfastfood", allFastFoodRoutes);
app.use("/api/pizzas", pizzaRoutes);
app.use("/api/shawarmas", shawarmaRoutes);
app.use("/api/burgers", burgerRoutes);

// Health check route
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Pizza Bite Stop API is running...",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "success",
    message: "API is healthy",
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
