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

// ✅ Shawarmas routes (filtered and restricted by category)
router.get("/", getProductsByCategory("Shawarmas"));
router.get("/:id", getProductById("Shawarmas")); // ✅ Only Shawarmas category
router.post("/", upload.single("image"), createProduct("Shawarmas"));
router.put("/:id", upload.single("image"), updateProduct("Shawarmas")); // ✅ Only Shawarmas category
router.delete("/:id", deleteProduct("Shawarmas")); // ✅ Only Shawarmas category

module.exports = router;
