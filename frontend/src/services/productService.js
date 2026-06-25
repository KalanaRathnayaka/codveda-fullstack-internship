import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

const getAuthConfig = () => {
  const user = JSON.parse(localStorage.getItem("codvedaUser"));

  return {
    headers: {
      Authorization: `Bearer ${user?.token}`
    }
  };
};

export const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await axios.post(API_URL, productData, getAuthConfig());
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await axios.put(`${API_URL}/${id}`, productData, getAuthConfig());
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, getAuthConfig());
  return response.data;
};