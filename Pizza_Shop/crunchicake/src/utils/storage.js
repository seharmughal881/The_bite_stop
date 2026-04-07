// // localStorage utility functions for CRUD operations

// // Storage keys for different data types
// export const STORAGE_KEYS = {
//   CAKES: "cakes_data",
//   CUPCAKES: "cupcakes_data",
//   DESSERTS: "desserts_data",
//   BAKERY: "bakery_data",
//   ORDERS: "orders_data",
//   SETTINGS: "admin_settings",
// };

// // Default data structures for each category
// const DEFAULT_DATA = {
//   [STORAGE_KEYS.CAKES]: [
//     {
//       id: 1,
//       title: "Classic Chocolate Cake",
//       category: "Cakes",
//       description:
//         "Rich and moist chocolate cake with layers of creamy chocolate frosting",
//       price: 32.99,
//       originalPrice: 39.99,
//       discount: "18% OFF",
//       imageUrl:
//         "https://layers.pk/wp-content/uploads/elementor/thumbs/Ferrero-Classic-pgtfyrzbln55w2y8b11utotx6i73raxrnm9fhhngjs.jpg",
//       features: [
//         "Triple chocolate layers",
//         "Creamy chocolate frosting",
//         "Chocolate shavings topping",
//         "Serves 8-10 people",
//       ],
//       specs: {
//         flavor: "Chocolate",
//         occasions: ["Birthday", "Anniversary", "Just Because"],
//         weight: "2.5 lbs",
//       },
//     },
//     {
//       id: 2,
//       title: "Red Velvet Dream Cake",
//       category: "Cakes",
//       description:
//         "A stunning crimson cake with a subtle cocoa flavor and luxurious cream cheese frosting.",
//       price: 36.99,
//       originalPrice: 44.99,
//       discount: "18% OFF",
//       imageUrl:
//         "https://layers.pk/wp-content/uploads/elementor/thumbs/Belgian-Chocolate-pgtfyq3n7z2l8v0ym08lopazzqgdbwqazcygixq8w8.jpg",
//       features: [
//         "Signature crimson red layers",
//         "Velvety cream cheese frosting",
//         "Decadent white chocolate curls",
//         "Serves 10-12 people",
//       ],
//       specs: {
//         flavor: "Red Velvet",
//         occasions: ["Valentine's Day", "Anniversary", "Dinner Party"],
//         weight: "3 lbs",
//       },
//     },
//   ],
//   [STORAGE_KEYS.CUPCAKES]: [],
//   [STORAGE_KEYS.DESSERTS]: [],
//   [STORAGE_KEYS.BAKERY]: [],
//   [STORAGE_KEYS.ORDERS]: [],
//   [STORAGE_KEYS.SETTINGS]: {
//     currency: "USD",
//     taxRate: 0.13,
//     deliveryFee: 5.99,
//     storeHours: {
//       monday: { open: "09:00", close: "18:00" },
//       tuesday: { open: "09:00", close: "18:00" },
//       wednesday: { open: "09:00", close: "18:00" },
//       thursday: { open: "09:00", close: "18:00" },
//       friday: { open: "09:00", close: "20:00" },
//       saturday: { open: "10:00", close: "20:00" },
//       sunday: { open: "11:00", close: "17:00" },
//     },
//   },
// };

// // Initialize storage with default data if empty
// export const initializeStorage = () => {
//   Object.values(STORAGE_KEYS).forEach((storageKey) => {
//     if (!localStorage.getItem(storageKey)) {
//       localStorage.setItem(
//         storageKey,
//         JSON.stringify(DEFAULT_DATA[storageKey] || [])
//       );
//     }
//   });
// };

// // Get data from localStorage
// export const getData = (key) => {
//   try {
//     const data = localStorage.getItem(key);
//     if (!data) {
//       // Initialize with default data if key doesn't exist
//       const defaultData = DEFAULT_DATA[key] || [];
//       localStorage.setItem(key, JSON.stringify(defaultData));
//       return defaultData;
//     }
//     return JSON.parse(data);
//   } catch (error) {
//     console.error(`Error reading from localStorage for key ${key}:`, error);
//     // Return default data if parsing fails
//     return DEFAULT_DATA[key] || [];
//   }
// };

// // Save data to localStorage
// export const saveData = (key, data) => {
//   try {
//     localStorage.setItem(key, JSON.stringify(data));
//     return true;
//   } catch (error) {
//     console.error(`Error saving to localStorage for key ${key}:`, error);
//     return false;
//   }
// };

// // Get next available ID for a given key
// export const getNextId = (key) => {
//   const data = getData(key);
//   if (data.length === 0) return 1;
//   return Math.max(...data.map((item) => item.id || 0)) + 1;
// };

// // Create new item
// export const createItem = (key, itemData) => {
//   const data = getData(key);
//   const newItem = {
//     ...itemData,
//     id: getNextId(key),
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   };
//   const newData = [...data, newItem];
//   const success = saveData(key, newData);
//   return success ? newItem : null;
// };

// // Read single item by ID
// export const getItem = (key, id) => {
//   const data = getData(key);
//   return data.find((item) => item.id === id) || null;
// };

// // Update existing item
// export const updateItem = (key, id, updates) => {
//   const data = getData(key);
//   const itemIndex = data.findIndex((item) => item.id === id);

//   if (itemIndex === -1) return null;

//   const updatedItem = {
//     ...data[itemIndex],
//     ...updates,
//     updatedAt: new Date().toISOString(),
//   };

//   const newData = [
//     ...data.slice(0, itemIndex),
//     updatedItem,
//     ...data.slice(itemIndex + 1),
//   ];

//   const success = saveData(key, newData);
//   return success ? updatedItem : null;
// };

// // Delete item by ID
// export const deleteItem = (key, id) => {
//   const data = getData(key);
//   const newData = data.filter((item) => item.id !== id);
//   return saveData(key, newData);
// };

// // Search items by query
// export const searchItems = (key, query, fields = []) => {
//   const data = getData(key);
//   if (!query) return data;

//   const searchTerm = query.toLowerCase();
//   return data.filter((item) => {
//     // If specific fields are provided, search only in those fields
//     if (fields.length > 0) {
//       return fields.some((field) => {
//         const value = getNestedValue(item, field);
//         return value && value.toString().toLowerCase().includes(searchTerm);
//       });
//     }

//     // Otherwise search in all string fields
//     return Object.values(item).some((value) => {
//       if (typeof value === "string") {
//         return value.toLowerCase().includes(searchTerm);
//       }
//       return false;
//     });
//   });
// };

// // Get nested object value by path
// const getNestedValue = (obj, path) => {
//   return path.split(".").reduce((current, key) => {
//     return current && current[key] !== undefined ? current[key] : undefined;
//   }, obj);
// };

// // Get all items with pagination
// export const getPaginatedItems = (
//   key,
//   page = 1,
//   limit = 10,
//   sortBy = "id",
//   sortOrder = "asc"
// ) => {
//   const data = getData(key);

//   // Sort data
//   const sortedData = [...data].sort((a, b) => {
//     const aValue = getNestedValue(a, sortBy);
//     const bValue = getNestedValue(b, sortBy);

//     if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
//     if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
//     return 0;
//   });

//   // Calculate pagination
//   const startIndex = (page - 1) * limit;
//   const endIndex = startIndex + limit;
//   const paginatedData = sortedData.slice(startIndex, endIndex);

//   return {
//     data: paginatedData,
//     pagination: {
//       current: page,
//       total: Math.ceil(data.length / limit),
//       limit,
//       totalItems: data.length,
//       hasNext: endIndex < data.length,
//       hasPrev: page > 1,
//     },
//   };
// };

// // Get statistics for dashboard
// export const getStats = () => {
//   const cakes = getData(STORAGE_KEYS.CAKES);
//   const cupcakes = getData(STORAGE_KEYS.CUPCAKES);
//   const desserts = getData(STORAGE_KEYS.DESSERTS);
//   const bakery = getData(STORAGE_KEYS.BAKERY);
//   const orders = getData(STORAGE_KEYS.ORDERS);

//   const totalProducts =
//     cakes.length + cupcakes.length + desserts.length + bakery.length;
//   const totalOrders = orders.length;
//   const totalRevenue = orders.reduce(
//     (sum, order) => sum + (order.total || 0),
//     0
//   );
//   const totalCustomers = new Set(orders.map((order) => order.customerEmail))
//     .size;

//   // Recent orders (last 7 days)
//   const sevenDaysAgo = new Date();
//   sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
//   const recentOrders = orders.filter(
//     (order) => new Date(order.createdAt || order.date) >= sevenDaysAgo
//   ).length;

//   return {
//     totalProducts,
//     totalOrders,
//     totalRevenue,
//     totalCustomers,
//     recentOrders,
//   };
// };

// // Export all data for backup
// export const exportData = () => {
//   const exportObject = {};
//   Object.values(STORAGE_KEYS).forEach((key) => {
//     exportObject[key] = getData(key);
//   });
//   return exportObject;
// };

// // Import data from backup
// export const importData = (importObject) => {
//   try {
//     Object.entries(importObject).forEach(([key, data]) => {
//       if (Object.values(STORAGE_KEYS).includes(key)) {
//         saveData(key, data);
//       }
//     });
//     return true;
//   } catch (error) {
//     console.error("Error importing data:", error);
//     return false;
//   }
// };

// // Clear all data (use with caution!)
// export const clearAllData = () => {
//   Object.values(STORAGE_KEYS).forEach((key) => {
//     localStorage.removeItem(key);
//   });
//   initializeStorage();
// };

// // Get storage usage information
// export const getStorageInfo = () => {
//   let totalSize = 0;
//   Object.values(STORAGE_KEYS).forEach((key) => {
//     const data = localStorage.getItem(key);
//     if (data) {
//       totalSize += new Blob([data]).size;
//     }
//   });

//   return {
//     totalSize: totalSize / 1024, // KB
//     totalItems: Object.values(STORAGE_KEYS).reduce(
//       (sum, key) => sum + getData(key).length,
//       0
//     ),
//     keys: Object.values(STORAGE_KEYS),
//   };
// };

// // Initialize storage when this module is loaded
// if (typeof window !== "undefined") {
//   initializeStorage();
// }
