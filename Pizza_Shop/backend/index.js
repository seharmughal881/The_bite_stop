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

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api/allfastfood", allFastFoodRoutes);
app.use("/api/pizzas", pizzaRoutes);
app.use("/api/shawarmas", shawarmaRoutes);
app.use("/api/burgers", burgerRoutes);

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("� Complete Fast Food API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
