"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import AdminSidebar from "@/components/AdminSidebar";
import ProductForm from "@/components/ProductForm";
import DataTable from "@/components/DataTable";
import { isAuthenticated } from "@/utils/auth";
import { productsService } from "@/services/productsService";
import { FiBox, FiPlus, FiMenu } from "react-icons/fi";
import { GiPizzaSlice, GiDonerKebab } from "react-icons/gi";
import { FaHamburger } from "react-icons/fa";

const AdminDashboard = () => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [editingProduct, setEditingProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState("pizzas");
  const [stats, setStats] = useState({
    totalProducts: 0,
  });
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/ad/m/in/admin/login");
    }
  }, [router]);

  // Load data based on active section / category
  useEffect(() => {
    if (activeSection === "dashboard") {
      loadStats();
    } else if (activeSection === "products") {
      loadProducts();
    }
  }, [activeSection, activeCategory]);

  const loadStats = async () => {
    try {
      setLoading(true);
      const [pizzasResponse, shawarmasResponse, burgersResponse] =
        await Promise.all([
          productsService.getAllPizzas(),
          productsService.getAllShawarmas(),
          productsService.getAllBurgers(),
        ]);

      const pizzas = Array.isArray(pizzasResponse)
        ? pizzasResponse
        : pizzasResponse.products || [];
      const shawarmas = Array.isArray(shawarmasResponse)
        ? shawarmasResponse
        : shawarmasResponse.products || [];
      const burgers = Array.isArray(burgersResponse)
        ? burgersResponse
        : burgersResponse.products || [];

      const totalProducts = pizzas.length + shawarmas.length + burgers.length;

      setStats({
        totalProducts,
      });
    } catch (err) {
      console.error("Error loading stats:", err);
      setError("Failed to load statistics");
    } finally {
      setLoading(false);
    }
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");

      let response;
      switch (activeCategory) {
        case "pizzas":
          response = await productsService.getAllPizzas();
          break;
        case "shawarmas":
          response = await productsService.getAllShawarmas();
          break;
        case "burgers":
          response = await productsService.getAllBurgers();
          break;
        case "fastfood":
          response = await productsService.getAllFastFood();
          break;
        default:
          response = await productsService.getAllPizzas();
      }

      // Normalize different response formats
      let productsData = Array.isArray(response)
        ? response
        : response.products || [];

      // If fast food category, alias fastFoodCategory to avoid duplicate accessor/key
      if (activeCategory === "fastfood") {
        productsData = productsData.map((p) => ({
          ...p,
          fastFoodCategory: p.category,
        }));
      }

      setProducts(productsData);
    } catch (err) {
      console.error("Error loading products:", err);
      setError("Failed to load products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      setLoading(true);
      let result;

      // Determine category for delete endpoint
      const productToDelete = products.find((p) => p._id === id || p.id === id);
      const productCategory = productToDelete?.category || activeCategory;

      switch (productCategory) {
        case "Pizzas":
        case "pizzas":
          result = await productsService.deletePizza(id);
          break;
        case "Shawarmas":
        case "shawarmas":
          result = await productsService.deleteShawarma(id);
          break;
        case "Burgers":
        case "burgers":
          result = await productsService.deleteBurger(id);
          break;
        default:
          result = await productsService.deleteFastFood(id);
      }

      if (result && (result.message || result.success)) {
        // reload
        await loadProducts();
      }
    } catch (err) {
      console.error("Error deleting product:", err);
      setError("Failed to delete product: " + (err.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProduct = async () => {
    setEditingProduct(null);
    await loadProducts();
  };

  // Table columns
  const tableColumns = [
    { header: "ID", accessor: "_id", sortable: true, filterable: true },
    { header: "Name", accessor: "title", sortable: true, filterable: true },
    {
      header: "Price",
      accessor: "price",
      sortable: true,
      format: (value) => `PKR ${parseFloat(value || 0).toFixed(2)}`,
    },
    {
      header: "Original Price",
      accessor: "originalPrice",
      sortable: true,
      format: (value) => value ? `PKR ${parseFloat(value).toFixed(2)}` : "-",
    },
    {
      header: "Discount",
      accessor: "discount",
      sortable: true,
      filterable: true,
      format: (value) => value || "-",
    },
    {
      header: "Size",
      accessor: "specs.size",
      sortable: true,
      filterable: true,
      format: (value) => value || "-",
    },
    {
      header: "Category",
      accessor: "category",
      sortable: true,
      filterable: true,
    },
  ];

  if (!isAuthenticated()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:block h-screen sticky top-0">
        <AdminSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </div>

      {/* Main content area */}
      <div className="flex-1 min-w-0">
        {/* Mobile Header */}
        <div className="md:hidden bg-white shadow-sm border-b border-gray-200 p-4 sticky top-0 z-20">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              type="button"
            >
              <FiMenu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold text-gray-800">
              {activeSection === "dashboard"
                ? "Dashboard"
                : `Manage ${activeCategory}`}
            </h1>
            <div className="w-10"></div>
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {isMobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}

        {/* Mobile Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full z-40 md:hidden transform ${
            isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300`}
        >
          <AdminSidebar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </div>

        <div className="p-4 md:p-8">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {activeSection === "dashboard" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 hidden md:block">
                Admin Dashboard
              </h1>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 md:gap-6 mb-6 md:mb-8">
                <motion.div
                  className="bg-white rounded-xl p-4 md:p-6 shadow-md border border-gray-100"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="flex items-center">
                    <div className="p-2 md:p-3 bg-blue-100 rounded-lg">
                      <FiBox className="text-blue-600 text-lg md:text-xl" />
                    </div>
                    <div className="ml-3 md:ml-4">
                      <h3 className="text-xs md:text-sm font-medium text-gray-600">
                        Total Products
                      </h3>
                      <p className="text-xl md:text-2xl font-bold text-gray-800">
                        {stats.totalProducts}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Fast Food Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <motion.button
                  whileHover="hover"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setActiveSection("products");
                    setActiveCategory("pizzas");
                    setEditingProduct({});
                  }}
                  className="flex cursor-pointer items-center justify-center p-3 md:p-4 bg-red-600 text-white rounded-lg font-medium text-sm md:text-base"
                >
                  <GiPizzaSlice className="mr-2" />
                  Add Pizza
                </motion.button>

                <motion.button
                  whileHover="hover"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setActiveSection("products");
                    setActiveCategory("shawarmas");
                    setEditingProduct({});
                  }}
                  className="flex cursor-pointer items-center justify-center p-3 md:p-4 bg-orange-600 text-white rounded-lg font-medium text-sm md:text-base"
                >
                  <GiDonerKebab className="mr-2" />
                  Add Shawarma
                </motion.button>

                <motion.button
                  whileHover="hover"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setActiveSection("products");
                    setActiveCategory("burgers");
                    setEditingProduct({});
                  }}
                  className="flex cursor-pointer items-center justify-center p-3 md:p-4 bg-yellow-600 text-white rounded-lg font-medium text-sm md:text-base"
                >
                  <FaHamburger className="mr-2" />
                  Add Burger
                </motion.button>
              </div>
            </motion.div>
          )}

          {activeSection === "products" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                <div>
                  <h1 className="text-xl md:text-3xl font-bold text-gray-800 capitalize hidden md:block">
                    Manage {activeCategory}
                  </h1>
                  <p className="text-gray-600 mt-1 hidden md:block">
                    Create, edit, or delete {activeCategory} in your bakery
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setEditingProduct({})}
                  className="flex items-center bg-[#db3250] text-white px-4 py-2 rounded-lg mt-4 md:mt-0 w-full md:w-auto justify-center"
                  type="button"
                  disabled={loading}
                >
                  <FiPlus className="mr-2" />
                  Add New
                </motion.button>
              </div>

              {loading && (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7B3F00]"></div>
                </div>
              )}

              {editingProduct ? (
                <ProductForm
                  product={editingProduct}
                  category={activeCategory}
                  onSave={handleSaveProduct}
                  onCancel={() => setEditingProduct(null)}
                />
              ) : (
                !loading && (
                  <DataTable
                    data={products}
                    columns={tableColumns}
                    onEdit={setEditingProduct}
                    onDelete={handleDeleteProduct}
                    category={activeCategory}
                  />
                )
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
