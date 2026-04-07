const express = require("express");
const multer = require("multer");
const {
  getAllProductsWithStats, // ✅ Updated function name
  getCakeById,
  createCake,
  updateCake,
  deleteCake,
} = require("../controller/allbakerscont");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// ✅ All Bakery routes (shows statistics + all products)
router.get("/", getAllProductsWithStats); // ✅ New function with stats
router.get("/:id", getCakeById);
router.post("/", upload.single("image"), createCake);
router.put("/:id", upload.single("image"), updateCake);
router.delete("/:id", deleteCake);

module.exports = router;
