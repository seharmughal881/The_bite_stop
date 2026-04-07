const express = require("express");
const multer = require("multer");
const {
  getProductsByCategory,
  getProductById, // ✅ Category-restricted version
  createProduct,
  updateProduct, // ✅ Category-restricted version
  deleteProduct, // ✅ Category-restricted version
} = require("../controller/allbakerscont");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// ✅ Pizzas routes (filtered and restricted by category)
router.get("/", getProductsByCategory("Pizzas"));
router.get("/:id", getProductById("Pizzas")); // ✅ Only Pizzas category
router.post("/", upload.single("image"), createProduct("Pizzas"));
router.put("/:id", upload.single("image"), updateProduct("Pizzas")); // ✅ Only Pizzas category
router.delete("/:id", deleteProduct("Pizzas")); // ✅ Only Pizzas category

module.exports = router;
