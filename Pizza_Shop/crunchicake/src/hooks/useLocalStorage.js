// "use client";
// import { useState, useEffect, useCallback } from "react";

// // Custom hook for localStorage operations with React state synchronization
// const useLocalStorage = (key, initialValue) => {
//   // Get initial value from localStorage or use provided initial value
//   const getStoredValue = useCallback(() => {
//     if (typeof window === "undefined") {
//       return initialValue;
//     }

//     try {
//       const item = window.localStorage.getItem(key);
//       return item ? JSON.parse(item) : initialValue;
//     } catch (error) {
//       console.error(`Error reading localStorage key "${key}":`, error);
//       return initialValue;
//     }
//   }, [key, initialValue]);

//   // State to store our value
//   const [storedValue, setStoredValue] = useState(getStoredValue);

//   // Listen for storage events from other tabs/windows
//   useEffect(() => {
//     const handleStorageChange = (event) => {
//       if (event.key === key && event.newValue !== null) {
//         try {
//           const newValue = JSON.parse(event.newValue);
//           setStoredValue(newValue);
//         } catch (error) {
//           console.error(`Error parsing storage event for key "${key}":`, error);
//         }
//       } else if (event.key === key && event.newValue === null) {
//         // Key was removed
//         setStoredValue(initialValue);
//       }
//     };

//     window.addEventListener("storage", handleStorageChange);
//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, [key, initialValue]);

//   // Return a wrapped version of useState's setter function that persists the new value to localStorage
//   const setValue = useCallback(
//     (value) => {
//       try {
//         // Allow value to be a function so we have the same API as useState
//         const valueToStore =
//           value instanceof Function ? value(storedValue) : value;

//         // Save to state
//         setStoredValue(valueToStore);

//         // Save to localStorage
//         if (typeof window !== "undefined") {
//           window.localStorage.setItem(key, JSON.stringify(valueToStore));
//         }
//       } catch (error) {
//         console.error(`Error setting localStorage key "${key}":`, error);
//       }
//     },
//     [key, storedValue]
//   );

//   // Remove item from localStorage
//   const removeValue = useCallback(() => {
//     try {
//       setStoredValue(initialValue);
//       if (typeof window !== "undefined") {
//         window.localStorage.removeItem(key);
//       }
//     } catch (error) {
//       console.error(`Error removing localStorage key "${key}":`, error);
//     }
//   }, [key, initialValue]);

//   // Clear all localStorage items (use with caution!)
//   const clearAll = useCallback(() => {
//     try {
//       setStoredValue(initialValue);
//       if (typeof window !== "undefined") {
//         window.localStorage.clear();
//       }
//     } catch (error) {
//       console.error("Error clearing localStorage:", error);
//     }
//   }, [initialValue]);

//   // Get all keys in localStorage
//   const getAllKeys = useCallback(() => {
//     if (typeof window === "undefined") return [];
//     try {
//       return Object.keys(window.localStorage);
//     } catch (error) {
//       console.error("Error getting localStorage keys:", error);
//       return [];
//     }
//   }, []);

//   // Check if a key exists in localStorage
//   const hasKey = useCallback((checkKey) => {
//     if (typeof window === "undefined") return false;
//     try {
//       return window.localStorage.getItem(checkKey) !== null;
//     } catch (error) {
//       console.error(`Error checking for key "${checkKey}":`, error);
//       return false;
//     }
//   }, []);

//   // Get the size of stored data for a specific key
//   const getSize = useCallback(
//     (sizeKey = key) => {
//       if (typeof window === "undefined") return 0;
//       try {
//         const item = window.localStorage.getItem(sizeKey);
//         return item ? new Blob([item]).size : 0;
//       } catch (error) {
//         console.error(`Error getting size for key "${sizeKey}":`, error);
//         return 0;
//       }
//     },
//     [key]
//   );

//   // Get total localStorage usage
//   const getTotalUsage = useCallback(() => {
//     if (typeof window === "undefined") return 0;
//     try {
//       let total = 0;
//       for (let i = 0; i < window.localStorage.length; i++) {
//         const key = window.localStorage.key(i);
//         const value = window.localStorage.getItem(key);
//         total += new Blob([key, value]).size;
//       }
//       return total;
//     } catch (error) {
//       console.error("Error calculating total localStorage usage:", error);
//       return 0;
//     }
//   }, []);

//   // Subscribe to changes for this specific key
//   const subscribe = useCallback(
//     (callback) => {
//       const handleChange = (event) => {
//         if (event.key === key) {
//           try {
//             const newValue = event.newValue
//               ? JSON.parse(event.newValue)
//               : initialValue;
//             callback(
//               newValue,
//               event.oldValue ? JSON.parse(event.oldValue) : null
//             );
//           } catch (error) {
//             console.error(
//               `Error in subscription callback for key "${key}":`,
//               error
//             );
//           }
//         }
//       };

//       window.addEventListener("storage", handleChange);
//       return () => window.removeEventListener("storage", handleChange);
//     },
//     [key, initialValue]
//   );

//   // Effect to update state when the key changes
//   useEffect(() => {
//     setStoredValue(getStoredValue());
//   }, [key, getStoredValue]);

//   return {
//     value: storedValue,
//     setValue,
//     removeValue,
//     clearAll,
//     getAllKeys,
//     hasKey,
//     getSize,
//     getTotalUsage,
//     subscribe,
//   };
// };

// // Hook for managing array data in localStorage
// export const useLocalStorageArray = (key, initialValue = []) => {
//   const { value, setValue, ...rest } = useLocalStorage(key, initialValue);

//   const push = useCallback(
//     (item) => {
//       setValue((prev) => [...prev, item]);
//     },
//     [setValue]
//   );

//   const pop = useCallback(() => {
//     setValue((prev) => {
//       const newArray = [...prev];
//       newArray.pop();
//       return newArray;
//     });
//   }, [setValue]);

//   const shift = useCallback(() => {
//     setValue((prev) => {
//       const newArray = [...prev];
//       newArray.shift();
//       return newArray;
//     });
//   }, [setValue]);

//   const unshift = useCallback(
//     (item) => {
//       setValue((prev) => [item, ...prev]);
//     },
//     [setValue]
//   );

//   const remove = useCallback(
//     (index) => {
//       setValue((prev) => prev.filter((_, i) => i !== index));
//     },
//     [setValue]
//   );

//   const update = useCallback(
//     (index, item) => {
//       setValue((prev) =>
//         prev.map((existingItem, i) => (i === index ? item : existingItem))
//       );
//     },
//     [setValue]
//   );

//   const clear = useCallback(() => {
//     setValue([]);
//   }, [setValue]);

//   const find = useCallback(
//     (predicate) => {
//       return value.find(predicate);
//     },
//     [value]
//   );

//   const filter = useCallback(
//     (predicate) => {
//       return value.filter(predicate);
//     },
//     [value]
//   );

//   return {
//     value,
//     setValue,
//     push,
//     pop,
//     shift,
//     unshift,
//     remove,
//     update,
//     clear,
//     find,
//     filter,
//     length: value.length,
//     isEmpty: value.length === 0,
//     ...rest,
//   };
// };

// // Hook for managing object data in localStorage
// export const useLocalStorageObject = (key, initialValue = {}) => {
//   const { value, setValue, ...rest } = useLocalStorage(key, initialValue);

//   const setProperty = useCallback(
//     (property, propertyValue) => {
//       setValue((prev) => ({ ...prev, [property]: propertyValue }));
//     },
//     [setValue]
//   );

//   const removeProperty = useCallback(
//     (property) => {
//       setValue((prev) => {
//         const newObject = { ...prev };
//         delete newObject[property];
//         return newObject;
//       });
//     },
//     [setValue]
//   );

//   const merge = useCallback(
//     (objectToMerge) => {
//       setValue((prev) => ({ ...prev, ...objectToMerge }));
//     },
//     [setValue]
//   );

//   const hasProperty = useCallback(
//     (property) => {
//       return property in value;
//     },
//     [value]
//   );

//   return {
//     value,
//     setValue,
//     setProperty,
//     removeProperty,
//     merge,
//     hasProperty,
//     keys: Object.keys(value),
//     values: Object.values(value),
//     entries: Object.entries(value),
//     ...rest,
//   };
// };

// // Hook for managing paginated data in localStorage
// export const useLocalStoragePagination = (
//   key,
//   itemsPerPage = 10,
//   initialValue = []
// ) => {
//   const {
//     value: allItems,
//     setValue,
//     ...rest
//   } = useLocalStorage(key, initialValue);
//   const [currentPage, setCurrentPage] = useState(1);

//   const totalPages = Math.ceil(allItems.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedItems = allItems.slice(startIndex, startIndex + itemsPerPage);

//   const goToPage = useCallback(
//     (page) => {
//       setCurrentPage(Math.max(1, Math.min(page, totalPages)));
//     },
//     [totalPages]
//   );

//   const nextPage = useCallback(() => {
//     setCurrentPage((prev) => Math.min(prev + 1, totalPages));
//   }, [totalPages]);

//   const prevPage = useCallback(() => {
//     setCurrentPage((prev) => Math.max(prev - 1, 1));
//   }, []);

//   const goToFirstPage = useCallback(() => {
//     setCurrentPage(1);
//   }, []);

//   const goToLastPage = useCallback(() => {
//     setCurrentPage(totalPages);
//   }, [totalPages]);

//   return {
//     items: paginatedItems,
//     allItems,
//     setItems: setValue,
//     currentPage,
//     totalPages,
//     itemsPerPage,
//     startIndex: startIndex + 1,
//     endIndex: Math.min(startIndex + itemsPerPage, allItems.length),
//     totalItems: allItems.length,
//     goToPage,
//     nextPage,
//     prevPage,
//     goToFirstPage,
//     goToLastPage,
//     hasNext: currentPage < totalPages,
//     hasPrev: currentPage > 1,
//     ...rest,
//   };
// };

// // Hook for managing localStorage with expiration
// export const useLocalStorageWithExpiry = (key, initialValue, expiryInMs) => {
//   const { value, setValue, ...rest } = useLocalStorage(key, {
//     value: initialValue,
//     expiry: Date.now() + expiryInMs,
//   });

//   const setValueWithExpiry = useCallback(
//     (newValue) => {
//       setValue({
//         value: newValue,
//         expiry: Date.now() + expiryInMs,
//       });
//     },
//     [setValue, expiryInMs]
//   );

//   const isExpired = value ? Date.now() > value.expiry : true;
//   const actualValue = value && !isExpired ? value.value : initialValue;

//   return {
//     value: actualValue,
//     setValue: setValueWithExpiry,
//     isExpired,
//     expiry: value?.expiry,
//     ...rest,
//   };
// };

// export default useLocalStorage;
