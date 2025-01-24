import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const api = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await apiClient.post("/login", credentials);
    return response.data;
  },
  signup: async (credentials: {
    username: string;
    email: string;
    password: string;
  }) => {
    const response = await apiClient.post("/signup", credentials);
    return response.data;
  },
  logout: async () => {
    const response = await apiClient.get("/logout");
    return response.data;
  },
  me: async () => {
    const response = await apiClient.get("/me");
    return response.data;
  },
};
