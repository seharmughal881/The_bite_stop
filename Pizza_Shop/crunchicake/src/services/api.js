// src/services/api.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const api = {
  get: (url) => {
    console.log(`API GET: ${API_BASE_URL}${url}`);
    return fetch(`${API_BASE_URL}${url}`).then(handleResponse);
  },

  post: (url, data) => {
    const isFormData = data instanceof FormData;
    console.log(`API POST: ${API_BASE_URL}${url}`, {
      isFormData,
      dataType: data.constructor.name,
      url: `${API_BASE_URL}${url}`
    });
    const options = {
      method: "POST",
      headers: isFormData ? {} : { "Content-Type": "application/json" },
      body: isFormData ? data : JSON.stringify(data),
    };
    return fetch(`${API_BASE_URL}${url}`, options).then(handleResponse);
  },

  put: (url, data) => {
    const isFormData = data instanceof FormData;
    const options = {
      method: "PUT",
      headers: isFormData ? {} : { "Content-Type": "application/json" },
      body: isFormData ? data : JSON.stringify(data),
    };
    return fetch(`${API_BASE_URL}${url}`, options).then(handleResponse);
  },

  delete: (url) =>
    fetch(`${API_BASE_URL}${url}`, {
      method: "DELETE",
    }).then(handleResponse),
};

// Better response handling
async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `HTTP error! status: ${response.status}`);
  }
  return response.json();
}
