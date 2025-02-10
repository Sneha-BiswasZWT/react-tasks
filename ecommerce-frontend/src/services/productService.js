import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

export const fetchProducts = async () => {
  return axios.get(API_URL);
};

export const fetchProductById = async (id) => {
  return axios.get(`${API_URL}/${id}`);
};
