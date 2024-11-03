import axios from "axios";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "../dto/auth";

const API_URL = import.meta.env.VITE_API_URL;

const login = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, data);
    return response.data;
  } catch (error) {
    throw new Error("Login failed. Please check your credentials.");
  }
};

const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, data);
    return response.data;
  } catch (error) {
    const serverMessage =
      error.response?.data?.message ||
      "Registration failed. Please check your data.";
    throw new Error(serverMessage);
  }
};

export default {
  login,
  register,
};
