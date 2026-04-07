"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiEdit,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
  FiSearch,
  FiX,
} from "react-icons/fi";

const DataTable = ({
  data,
  columns,
  onEdit,
  onDelete,
  category,
  searchable = true,
  pagination = true,
  itemsPerPage = 10,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [filters, setFilters] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState({
    show: false,
    productId: null,
    productName: "",
  });

  // Filter out the ID column
  const visibleColumns = columns.filter((column) => column.accessor !== "_id");

  // Add image column if not already present
  const hasImageColumn = visibleColumns.some(
    (col) => col.accessor === "imageUrl"
  );
  const tableColumns = hasImageColumn
    ? visibleColumns
    : [
        {
          header: "Image",
          accessor: "imageUrl",
          className: "w-16",
        },
        ...visibleColumns,
      ];

  // Helper function to get nested object values
  const getNestedValue = (obj, path) => {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  };

  // Filter and search data
  const filteredData = data.filter((item) => {
    const matchesSearch =
      !searchTerm ||
      tableColumns.some((column) => {
        const value = getNestedValue(item, column.accessor);
        return (
          value &&
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
      });

    const matchesFilters = Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      const itemValue = getNestedValue(item, key);
      return itemValue?.toString().toLowerCase().includes(value.toLowerCase());
    });

    return matchesSearch && matchesFilters;
  });

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue = getNestedValue(a, sortConfig.key);
    const bValue = getNestedValue(b, sortConfig.key);

    if (aValue < bValue) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = pagination
    ? sortedData.slice(startIndex, startIndex + itemsPerPage)
    : sortedData;

  // Handle sort
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Handle filter change
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({});
    setSearchTerm("");
    setCurrentPage(1);
  };

  // Handle delete confirmation
  const handleDeleteClick = (id, name) => {
    setDeleteConfirm({
      show: true,
      productId: id,
      productName: name,
    });
  };

  // Handle confirmed delete
  const confirmDelete = () => {
    if (deleteConfirm.productId) {
      onDelete(deleteConfirm.productId);
    }
    setDeleteConfirm({ show: false, productId: null, productName: "" });
  };

  // Cancel delete
  const cancelDelete = () => {
    setDeleteConfirm({ show: false, productId: null, productName: "" });
  };

  // Render sort indicator
  const renderSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return (
      <span className="ml-1">
        {sortConfig.direction === "ascending" ? "↑" : "↓"}
      </span>
    );
  };

  // Render filter input
  const renderFilterInput = (column) => {
    if (!column.filterable) return null;

    return (
      <div className="mt-1">
        <input
          type="text"
          value={filters[column.accessor] || ""}
          onChange={(e) => handleFilterChange(column.accessor, e.target.value)}
          placeholder={`Filter ${column.header.toLowerCase()}...`}
          className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-[#7B3F00] focus:border-transparent"
        />
      </div>
    );
  };

  // Format cell value
  const formatCellValue = (value, column) => {
    if (column.format) {
      return column.format(value);
    }

    if (typeof value === "number" && column.accessor.includes("price")) {
      return `PKR ${value.toFixed(2)}`;
    }

    if (Array.isArray(value)) {
      return value.join(", ");
    }

    if (typeof value === "object" && value !== null) {
      return JSON.stringify(value);
    }

    return value || "-";
  };

  return (
    <>
      {/* Delete Confirmation Modal */}
      {deleteConfirm.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Blurred Background */}
          <div
            className="absolute inset-0  bg-opacity-30 backdrop-blur-sm"
            onClick={cancelDelete}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4 z-10"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Confirm Delete
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{deleteConfirm.productName}"?
            </p>

            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border cursor-pointer border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 cursor-pointer text-white rounded-lg hover:bg-red-700 transition-colors"
                type="button"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        {/* Table Controls */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Search */}
            {searchable && (
              <div className="relative flex-1 max-w-md">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7B3F00] focus:border-transparent"
                />
              </div>
            )}

            {/* Results count */}
            <div className="text-sm text-gray-600">
              {filteredData.length} product
              {filteredData.length !== 1 ? "s" : ""} found
            </div>

            {/* Clear filters */}
            {(searchTerm || Object.values(filters).some(Boolean)) && (
              <button
                onClick={clearFilters}
                className="flex items-center text-sm text-[#7B3F00] hover:text-[#5A2F00]"
                type="button"
              >
                <FiX className="w-4 h-4 mr-1" />
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {tableColumns.map((column, index) => (
                  <th
                    key={`${column.accessor}-${index}`}
                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                      column.sortable ? "cursor-pointer hover:bg-gray-100" : ""
                    }`}
                    onClick={() =>
                      column.sortable && handleSort(column.accessor)
                    }
                  >
                    <div className="flex items-center">
                      <span className="flex items-center">
                        {column.header}
                        {column.sortable &&
                          renderSortIndicator(column.accessor)}
                      </span>
                    </div>
                    {column.filterable && renderFilterInput(column)}
                  </th>
                ))}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedData.length > 0 ? (
                paginatedData.map((item, index) => (
                  <motion.tr
                    key={item._id || item.id || `row-${index}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    {tableColumns.map((column) => {
                      const value = getNestedValue(item, column.accessor);
                      return (
                        <td
                          key={`${item._id || item.id || `row-${index}`}-${
                            column.accessor
                          }`}
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                        >
                          {column.accessor === "imageUrl" && value ? (
                            <div className="h-10 w-10 flex-shrink-0">
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={value}
                                alt={item.title}
                                onError={(e) => {
                                  e.target.src = "/placeholder-image.jpg";
                                }}
                              />
                            </div>
                          ) : column.accessor === "imageUrl" ? (
                            <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center bg-gray-200 rounded-full">
                              <span className="text-gray-500 text-xs">No Image</span>
                            </div>
                          ) : (
                            <div className={column.className}>
                              {formatCellValue(value, column)}
                            </div>
                          )}
                        </td>
                      );
                    })}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onEdit(item)}
                          className="text-[#7B3F00] cursor-pointer hover:text-[#5A2F00] p-1 rounded hover:bg-[#E8D6C0] transition-colors"
                          title="Edit"
                          type="button"
                        >
                          <FiEdit className="w-4 h-4 cursor-pointer" />
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteClick(item._id || item.id, item.title)
                          }
                          className="text-red-600 cursor-pointer hover:text-red-800 p-1 rounded hover:bg-red-50 transition-colors"
                          title="Delete"
                          type="button"
                        >
                          <FiTrash2 className="w-4 h-4 cursor-pointer" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={tableColumns.length + 1}
                    className="px-6 py-12 text-center"
                  >
                    <div className="text-gray-500">
                      <FiSearch className="mx-auto w-12 h-12 mb-4 opacity-50" />
                      <p className="text-lg font-medium mb-2">
                        No products found
                      </p>
                      <p className="text-sm">
                        {searchTerm || Object.values(filters).some(Boolean)
                          ? "Try adjusting your search or filters"
                          : "No products available. Add your first one!"}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination && totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">
                  {startIndex + 1} to{" "}
                  {Math.min(startIndex + itemsPerPage, sortedData.length)}
                </span>{" "}
                of <span className="font-medium">{sortedData.length}</span>{" "}
                results
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                  type="button"
                >
                  <FiChevronsLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                  type="button"
                >
                  <FiChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum =
                      Math.max(1, Math.min(totalPages - 4, currentPage - 2)) +
                      i;
                    if (pageNum > totalPages) return null;

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 h-8 rounded text-sm ${
                          currentPage === pageNum
                            ? "bg-[#7B3F00] text-white"
                            : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                        }`}
                        type="button"
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                  type="button"
                >
                  <FiChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                  type="button"
                >
                  <FiChevronsRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DataTable;
