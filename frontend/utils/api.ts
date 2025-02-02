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
    name: string;
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
  googleLogin: async (credential: string) => {
    try {
      const response = await apiClient.post("/google", {
        id_token: credential,
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};

// Handle API errors consistently
const handleApiError = (error: any) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data || { message: "An unexpected error occurred." };
  }
  return { message: "An unexpected error occurred." };
};
