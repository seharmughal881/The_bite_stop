const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["All Fast Food", "Pizzas", "Shawarmas", "Burgers"], // ✅ Fast Food categories
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    originalPrice: {
      type: Number,
    },
    discount: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    imagePublicId: {
      type: String,
    },
    features: {
      type: [String],
    },
    specs: {
      size: { type: String },
      type: { type: [String] },
      ingredients: { type: String },
    },
  },
  { timestamps: true }
);

// ✅ Index on category for faster filtering
productSchema.index({ category: 1 });

// ✅ Index on title for faster searching (but not unique)
productSchema.index({ title: 1 });

module.exports = mongoose.model("cakes", productSchema);
