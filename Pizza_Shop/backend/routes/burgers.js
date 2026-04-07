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

// ✅ Burgers routes (filtered and restricted by category)
router.get("/", getProductsByCategory("Burgers"));
router.get("/:id", getProductById("Burgers")); // ✅ Only Burgers category
router.post("/", upload.single("image"), createProduct("Burgers"));
router.put("/:id", upload.single("image"), updateProduct("Burgers")); // ✅ Only Burgers category
router.delete("/:id", deleteProduct("Burgers")); // ✅ Only Burgers category

module.exports = router;
