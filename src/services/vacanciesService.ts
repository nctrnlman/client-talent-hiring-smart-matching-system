// src/services/vacanciesService.ts

import axios from "axios";
import { GetVacanciesResponse, GetVacancyDetailResponse } from "../dto/vacancy";

const API_URL = import.meta.env.VITE_API_URL;

const getVacancies = async (): Promise<GetVacanciesResponse> => {
  try {
    const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
    const response = await axios.get(`${API_URL}/vacancies`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in the Authorization header
      },
    });
    return response.data;
  } catch (error) {
    const serverMessage =
      error.response?.data?.message || "Failed to fetch vacancies.";
    throw new Error(serverMessage);
  }
};

const getVacancyDetail = async (
  vacancyId: string
): Promise<GetVacancyDetailResponse> => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(`${API_URL}/vacancies/${vacancyId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    const serverMessage =
      error.response?.data?.message || "Failed to fetch vacancy detail.";
    throw new Error(serverMessage);
  }
};

// Create a new vacancy
const createVacancy = async (data: any) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.post(`${API_URL}/vacancies`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    const serverMessage =
      error.response?.data?.message || "Failed to create vacancy.";
    throw new Error(serverMessage);
  }
};

// Edit an existing vacancy
const editVacancy = async (vacancyId: string, data: any) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.put(
      `${API_URL}/vacancies/${vacancyId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    const serverMessage =
      error.response?.data?.message || "Failed to edit vacancy.";
    throw new Error(serverMessage);
  }
};

export default {
  getVacancies,
  getVacancyDetail,
  createVacancy,
  editVacancy,
};
