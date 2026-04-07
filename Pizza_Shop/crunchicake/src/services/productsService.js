// src/services/productsService.js
import { api } from "./api";

export const productsService = {
  // All fast food products
  getAllFastFood: () => api.get("/api/allfastfood"),
  getFastFoodById: (id) => api.get(`/api/allfastfood/${id}`),
  createFastFood: (data) => api.post("/api/allfastfood", data),
  updateFastFood: (id, data) => api.put(`/api/allfastfood/${id}`, data),
  deleteFastFood: (id) => api.delete(`/api/allfastfood/${id}`),

  // Pizzas
  getAllPizzas: () => api.get("/api/pizzas"),
  getPizzaById: (id) => api.get(`/api/pizzas/${id}`),
  createPizza: (data) => api.post("/api/pizzas", data),
  updatePizza: (id, data) => api.put(`/api/pizzas/${id}`, data),
  deletePizza: (id) => api.delete(`/api/pizzas/${id}`),

  // Shawarmas
  getAllShawarmas: () => api.get("/api/shawarmas"),
  getShawarmaById: (id) => api.get(`/api/shawarmas/${id}`),
  createShawarma: (data) => api.post("/api/shawarmas", data),
  updateShawarma: (id, data) => api.put(`/api/shawarmas/${id}`, data),
  deleteShawarma: (id) => api.delete(`/api/shawarmas/${id}`),

  // Burgers
  getAllBurgers: () => api.get("/api/burgers"),
  getBurgerById: (id) => api.get(`/api/burgers/${id}`),
  createBurger: (data) => api.post("/api/burgers", data),
  updateBurger: (id, data) => api.put(`/api/burgers/${id}`, data),
  deleteBurger: (id) => api.delete(`/api/burgers/${id}`),
};
