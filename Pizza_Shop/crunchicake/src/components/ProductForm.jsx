// src/components/ProductForm.jsx
"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FiX,
  FiUpload,
  FiImage,
  FiInfo,
  FiPercent,
  FiCamera,
} from "react-icons/fi";
import { productsService } from "@/services/productsService";

const categories = ["Pizzas", "Shawarmas", "Burgers", "All Fast Food"];
const types = [
  "Vegetarian",
  "Non-Vegetarian",
  "Spicy",
  "Mild",
  "Classic",
  "Special",
];
const sizes = [
  "Small",
  "Medium",
  "Large",
  "Extra Large",
  "Family Size",
];
const flavors = [
  "Classic",
  "Spicy",
  "BBQ",
  "Cheese",
  "Veggie",
  "Pepperoni",
  "Custom...",
];

const ProductForm = ({ product, category, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    category:
      category === "fastfood"
        ? ""
        : category.charAt(0).toUpperCase() + category.slice(1),
    description: "",
    price: "",
    originalPrice: "",
    imageUrl: "",
    discount: "",
    features: [],
    specs: {
      size: "",
      type: [],
      ingredients: "",
    },
  });

  const [newFeature, setNewFeature] = useState("");
  const [newType, setNewType] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef(null);

  // Initialize form with product data if editing
  useEffect(() => {
    if (product && (product._id || product.id)) {
      setFormData({
        title: product.title || "",
        category:
          product.category ||
          (category === "fastfood"
            ? ""
            : category.charAt(0).toUpperCase() + category.slice(1)),
        description: product.description || "",
        price: product.price || "",
        originalPrice: product.originalPrice || "",
        imageUrl: product.imageUrl || "",
        discount: product.discount || "",
        features: product.features || [],
        specs: {
          size: product.specs?.size || "",
          type: product.specs?.type || [],
          ingredients: product.specs?.ingredients || "",
        },
      });

      // Check if type is custom
      if (product.specs?.type && !types.includes(product.specs.type)) {
        setNewType(product.specs.type);
      }
    }
  }, [product, category]);

  // Calculate discount percentage
  const calculateDiscount = () => {
    if (!formData.originalPrice || !formData.price) return 0;

    const original = parseFloat(formData.originalPrice);
    const current = parseFloat(formData.price);

    if (original <= current) return 0;

    return Math.round(((original - current) / original) * 100);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.price || parseFloat(formData.price) <= 0)
      newErrors.price = "Valid price is required";
    // Image is optional - remove validation
    // if (!formData.imageUrl.trim() && !uploadedImage)
    //   newErrors.imageUrl = "Image URL or file upload is required";
    // Flavor is optional - remove validation
    // if (!formData.specs.flavor) newErrors.flavor = "Flavor is required";
    // Features are optional - remove validation
    // if (formData.features.length === 0)
    //   newErrors.features = "At least one feature is required";

    // For fast food items, category selection is required
    if (category === "fastfood" && !formData.category) {
      newErrors.category = "Category is required for fast food items";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.match("image.*")) {
      setErrors({ ...errors, imageUrl: "Please select an image file" });
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors({
        ...errors,
        imageUrl: "Please select an image smaller than 5MB",
      });
      return;
    }

    setUploadedImage(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Handle remove uploaded image
  const handleRemoveUploadedImage = () => {
    setUploadedImage(null);
    setImagePreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();

      // Append all fields
      formDataToSend.append("title", formData.title);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      if (formData.originalPrice)
        formDataToSend.append("originalPrice", formData.originalPrice);
      if (formData.discount)
        formDataToSend.append("discount", formData.discount);
      if (formData.specs.size)
        formDataToSend.append("specs[size]", formData.specs.size);
      if (formData.specs.ingredients)
        formDataToSend.append("specs[ingredients]", formData.specs.ingredients);

      // Append types array
      formData.specs.type.forEach((type, index) => {
        formDataToSend.append(`specs[type][${index}]`, type);
      });

      // Append features array
      formData.features.forEach((feature, index) => {
        formDataToSend.append(`features[${index}]`, feature);
      });

      // Append image file if uploaded
      if (uploadedImage) {
        formDataToSend.append("image", uploadedImage);
      } else if (formData.imageUrl) {
        // If using URL instead of file upload
        formDataToSend.append("imageUrl", formData.imageUrl);
      }

      let result;
      const productId = product?._id || product?.id;

      if (productId) {
        // Update existing product
        switch (formData.category) {
          case "Pizzas":
            result = await productsService.updatePizza(
              productId,
              formDataToSend
            );
            break;
          case "Shawarmas":
            result = await productsService.updateShawarma(
              productId,
              formDataToSend
            );
            break;
          case "Burgers":
            result = await productsService.updateBurger(
              productId,
              formDataToSend
            );
            break;
          default:
            result = await productsService.updateFastFood(
              productId,
              formDataToSend
            );
        }
      } else {
        // Create new product
        switch (formData.category) {
          case "Pizzas":
            result = await productsService.createPizza(formDataToSend);
            break;
          case "Shawarmas":
            result = await productsService.createShawarma(formDataToSend);
            break;
          case "Burgers":
            result = await productsService.createBurger(formDataToSend);
            break;
          default:
            result = await productsService.createFastFood(formDataToSend);
        }
      }

      onSave(result);
    } catch (error) {
      console.error("Error saving product:", error);
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
        formData: formData,
        category: formData.category,
        productId: product?._id || product?.id
      });
      setErrors({
        submit:
          error.message ||
          "Failed to save product. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSpecChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      specs: {
        ...prev.specs,
        [name]: value,
      },
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Handle flavor selection
  const handleFlavorChange = (e) => {
    const value = e.target.value;

    if (value === "Custom...") {
      setShowCustomFlavor(true);
      setCustomFlavor("");
      handleSpecChange("flavor", "");
    } else {
      setShowCustomFlavor(false);
      setCustomFlavor("");
      handleSpecChange("flavor", value);
    }
  };

  // Handle custom flavor input
  const handleCustomFlavorChange = (e) => {
    const value = e.target.value;
    setCustomFlavor(value);
    handleSpecChange("flavor", value);
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature("");
      if (errors.features) {
        setErrors((prev) => ({ ...prev, features: "" }));
      }
    }
  };

  const removeFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const addOccasion = () => {
    if (
      newOccasion.trim() &&
      !formData.specs.occasions.includes(newOccasion.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        specs: {
          ...prev.specs,
          occasions: [...prev.specs.occasions, newOccasion.trim()],
        },
      }));
      setNewOccasion("");
    }
  };

  const removeOccasion = (occasion) => {
    setFormData((prev) => ({
      ...prev,
      specs: {
        ...prev.specs,
        occasions: prev.specs.occasions.filter((o) => o !== occasion),
      },
    }));
  };

  const handleOccasionSelect = (e) => {
    const occasion = e.target.value;
    if (occasion && !formData.specs.occasions.includes(occasion)) {
      setFormData((prev) => ({
        ...prev,
        specs: {
          ...prev.specs,
          occasions: [...prev.specs.occasions, occasion],
        },
      }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-md border border-gray-200 p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {product?._id || product?.id ? "Edit" : "Add New"}{" "}
          {category === "fastfood"
            ? "Fast Food Item"
            : category.charAt(0).toUpperCase() + category.slice(1)}
        </h2>
        <button
          onClick={onCancel}
          className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
        >
          <FiX className="w-5 h-5" />
        </button>
      </div>

      {errors.submit && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {errors.submit}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Category Selection for Fast Food Items */}
        {category === "fastfood" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7B3F00] focus:border-transparent ${
                errors.category ? "border-red-500" : "border-gray-300"
              }`}
              required
            >
              <option value="">Select Category</option>
              <option value="Pizzas">Pizza</option>
              <option value="Shawarmas">Shawarma</option>
              <option value="Burgers">Burger</option>
              <option value="All Fast Food">All Fast Food</option>
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category}</p>
            )}
          </div>
        )}

        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7B3F00] focus:border-transparent ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="e.g., Classic Chocolate Cake"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price (PKR) *
            </label>
            <input
              type="number"
              name="price"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7B3F00] focus:border-transparent ${
                errors.price ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="2999"
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-600">{errors.price}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Original Price (PKR)
            </label>
            <input
              type="number"
              name="originalPrice"
              step="0.01"
              min="0"
              value={formData.originalPrice}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7B3F00] focus:border-transparent"
              placeholder="3999"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Discount (%)
            </label>
            <div className="flex items-center">
              <input
                type="text"
                name="discount"
                value={formData.discount}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7B3F00] focus:border-transparent"
                placeholder="e.g., 15"
              />
              <span className="ml-2 text-gray-500">%</span>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Enter discount percentage (e.g., 15 for 15% off)
            </p>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7B3F00] focus:border-transparent ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Describe the product in detail..."
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>

        {/* Image Upload Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Image *
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* URL Input */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Image URL
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7B3F00] focus:border-transparent ${
                    errors.imageUrl ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="https://example.com/image.jpg or data:image/jpeg;base64,..."
                  disabled={!!uploadedImage}
                />
                <button
                  type="button"
                  className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      imageUrl:
                        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                    }));
                  }}
                  disabled={!!uploadedImage}
                >
                  <FiImage className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Or upload an image
              </label>
              <div className="flex items-center space-x-2">
                <label className="flex-1 cursor-pointer">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <FiUpload className="w-4 h-4 mr-2" />
                    <span>Choose File</span>
                  </div>
                </label>
                {uploadedImage && (
                  <button
                    type="button"
                    onClick={handleRemoveUploadedImage}
                    className="p-2 text-red-600 hover:text-red-800 rounded-lg hover:bg-red-50"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                )}
              </div>
              {uploadedImage && (
                <p className="mt-1 text-xs text-gray-500 truncate">
                  {uploadedImage.name}
                </p>
              )}
            </div>
          </div>

          {errors.imageUrl && (
            <p className="mt-1 text-sm text-red-600">{errors.imageUrl}</p>
          )}

          {/* Image Preview */}
          {(formData.imageUrl || imagePreview) && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Preview:</p>
              <div className="relative w-32 h-32 border rounded-lg overflow-hidden">
                <img
                  src={imagePreview || formData.imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Fast Food Specifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Size
            </label>
            <select
              value={formData.specs.size}
              onChange={(e) => handleSpecChange("size", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7B3F00] focus:border-transparent"
            >
              <option value="">Select Size</option>
              {sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Main Ingredients
            </label>
            <input
              type="text"
              value={formData.specs.ingredients}
              onChange={(e) => handleSpecChange("ingredients", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7B3F00] focus:border-transparent"
              placeholder="e.g., Chicken, Cheese, Vegetables"
            />
          </div>
        </div>

        {/* Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Food Type
          </label>
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {types.map((type) => (
                <label key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.specs.type.includes(type)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleSpecChange("type", [...formData.specs.type, type]);
                      } else {
                        handleSpecChange("type", formData.specs.type.filter(t => t !== type));
                      }
                    }}
                    className="mr-2"
                  />
                  <span className="text-sm">{type}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Features */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Features *
          </label>
          <div className="space-y-2">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7B3F00] focus:border-transparent"
                placeholder="Add a feature (e.g., Premium ingredients)"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addFeature();
                  }
                }}
              />
              <button
                type="button"
                onClick={addFeature}
                className="px-4 py-2 cursor-pointer bg-[#db3250] text-white rounded-lg hover:bg-[#c50d2f]"
              >
                Add
              </button>
            </div>

            {errors.features && (
              <p className="mt-1 text-sm text-red-600">{errors.features}</p>
            )}

            {formData.features.length > 0 && (
              <div className="mt-2 space-y-2">
                {formData.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="text-gray-700">{feature}</span>
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border cursor-pointer border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-[#db3250] cursor-pointer text-white rounded-lg hover:bg-[#c50d2f] disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {product?._id || product?.id ? "Updating..." : "Creating..."}
              </>
            ) : (
              <>
                <FiInfo className="mr-2 w-4 h-4" />
                {product?._id || product?.id
                  ? "Update Product"
                  : "Create Product"}
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ProductForm;
