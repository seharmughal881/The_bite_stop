const Product = require("../model/products");
const cloudinary = require("../config/cloudnary");

// ✅ Get all products with statistics (for All Bakery section)
const getAllProductsWithStats = async (req, res) => {
  try {
    const products = await Product.find();

    const stats = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const categoryStats = {};
    let totalProducts = 0;

    stats.forEach((stat) => {
      categoryStats[stat._id] = stat.count;
      totalProducts += stat.count;
    });

    res.json({
      success: true,
      totalProducts,
      categoryBreakdown: categoryStats,
      products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get products by specific category (for individual routes)
const getProductsByCategory = (categoryName) => {
  return async (req, res) => {
    try {
      const products = await Product.find({ category: categoryName });
      res.json({
        success: true,
        category: categoryName,
        totalProducts: products.length,
        products,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};

// ✅ Get single product - FOR ALL BAKERY (no category restriction)
const getCakeById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get single product with category restriction (for specific sections)
const getProductById = (categoryName) => {
  return async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // ✅ Check if product belongs to the correct category
      if (product.category !== categoryName) {
        return res.status(403).json({
          message: `This product belongs to ${product.category} section, not ${categoryName}`,
        });
      }

      res.json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};

// ✅ Create product for All Bakery (allows any category)
const createCake = async (req, res) => {
  try {
    let imageUrl = "";
    let publicId = "";

    if (req.file) {
      const category = req.body.category || "All Bakery";
      const folderName = category.toLowerCase().replace(/\s+/g, "");

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: folderName,
      });
      imageUrl = result.secure_url;
      publicId = result.public_id;
    }

    const productData = {
      ...req.body,
      imageUrl,
      imagePublicId: publicId,
      category: req.body.category || "All Bakery",
    };

    const product = new Product(productData);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "A product with this title already exists",
      });
    }
    res.status(400).json({ message: error.message });
  }
};

// ✅ Create product with fixed category (for specific routes)
const createProduct = (defaultCategory = null) => {
  return async (req, res) => {
    try {
      let imageUrl = "";
      let publicId = "";

      if (req.file) {
        const category = defaultCategory || req.body.category || "products";
        const folderName = category.toLowerCase().replace(/\s+/g, "");

        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: folderName,
        });
        imageUrl = result.secure_url;
        publicId = result.public_id;
      }

      const productData = {
        ...req.body,
        imageUrl,
        imagePublicId: publicId,
      };

      if (defaultCategory) {
        productData.category = defaultCategory;
      }

      const product = new Product(productData);
      const savedProduct = await product.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({
          message: "A product with this title already exists",
        });
      }
      res.status(400).json({ message: error.message });
    }
  };
};

// ✅ Update product - FOR ALL BAKERY (no category restriction)
const updateCake = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let updatedData = { ...req.body };

    if (req.file) {
      if (product.imagePublicId) {
        await cloudinary.uploader.destroy(product.imagePublicId);
      }

      const category = updatedData.category || product.category || "products";
      const folderName = category.toLowerCase().replace(/\s+/g, "");

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: folderName,
      });
      updatedData.imageUrl = result.secure_url;
      updatedData.imagePublicId = result.public_id;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.json(updatedProduct);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "A product with this title already exists",
      });
    }
    res.status(400).json({ message: error.message });
  }
};

// ✅ Update product with category restriction (for specific sections)
const updateProduct = (categoryName) => {
  return async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // ✅ Check if product belongs to the correct category
      if (product.category !== categoryName) {
        return res.status(403).json({
          message: `Cannot update ${product.category} product from ${categoryName} section`,
        });
      }

      let updatedData = { ...req.body };

      // ✅ Ensure category doesn't change to prevent moving between sections
      updatedData.category = categoryName;

      if (req.file) {
        try {
          // ✅ Delete old image from Cloudinary if exists
          if (product.imagePublicId) {
            await cloudinary.uploader.destroy(product.imagePublicId);
          }

          const folderName = categoryName.toLowerCase().replace(/\s+/g, "");

          const result = await cloudinary.uploader.upload(req.file.path, {
            folder: folderName,
          });
          updatedData.imageUrl = result.secure_url;
          updatedData.imagePublicId = result.public_id;

          // ❌ REMOVED: fs.unlink call - Multer handles temp file cleanup
        } catch (uploadError) {
          // ❌ REMOVED: fs.unlink call - Multer handles temp file cleanup
          throw uploadError;
        }
      }

      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        updatedData,
        { new: true }
      );

      res.json(updatedProduct);
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({
          message: "A product with this title already exists",
        });
      }
      res.status(400).json({ message: error.message });
    }
  };
};

// ✅ Delete product - FOR ALL BAKERY (no category restriction)
const deleteCake = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.imagePublicId) {
      await cloudinary.uploader.destroy(product.imagePublicId);
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product and image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete product with category restriction (for specific sections)
const deleteProduct = (categoryName) => {
  return async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // ✅ Check if product belongs to the correct category
      if (product.category !== categoryName) {
        return res.status(403).json({
          message: `Cannot delete ${product.category} product from ${categoryName} section`,
        });
      }

      if (product.imagePublicId) {
        await cloudinary.uploader.destroy(product.imagePublicId);
      }

      await Product.findByIdAndDelete(req.params.id);
      res.json({ message: "Product and image deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};

module.exports = {
  getAllProductsWithStats,
  getProductsByCategory,
  getCakeById, // ✅ For All Bakery (no restrictions)
  getProductById, // ✅ For specific sections (with restrictions)
  createCake, // ✅ For All Bakery
  createProduct, // ✅ For specific sections
  updateCake, // ✅ For All Bakery (no restrictions)
  updateProduct, // ✅ For specific sections (with restrictions)
  deleteCake, // ✅ For All Bakery (no restrictions)
  deleteProduct, // ✅ For specific sections (with restrictions)
};
