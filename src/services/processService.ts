// src/services/processService.ts
import axios from "axios";
import {
  GetRecruitmentProcessesResponse,
  GetRecruitmentProcessDetailResponse,
} from "../dto/recruitmentProcess";

const API_URL = import.meta.env.VITE_API_URL;

const getRecruitmentProcesses = async (
  flow: string,
  employerId: number
): Promise<GetRecruitmentProcessesResponse> => {
  try {
    const token = localStorage.getItem("authToken"); // Get token from localStorage
    const response = await axios.get(`${API_URL}/process`, {
      params: { flow, employerId }, // Add flow as a query parameter
      headers: {
        Authorization: `Bearer ${token}`, // Add token to the Authorization header
      },
    });
    return response.data;
  } catch (error) {
    const serverMessage =
      error.response?.data?.message || "Failed to fetch recruitment processes.";
    throw new Error(serverMessage);
  }
};

const getRecruitmentProcessDetail = async (
  processId: number
): Promise<GetRecruitmentProcessDetailResponse> => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(`${API_URL}/process/${processId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    const serverMessage =
      error.response?.data?.message ||
      "Failed to fetch recruitment process details.";
    throw new Error(serverMessage);
  }
};

const updateStatus = async (
  processId: number,
  result: string,
  summary: string
): Promise<void> => {
  try {
    const token = localStorage.getItem("authToken");
    await axios.patch(
      `${API_URL}/process/${processId}/update-result`,
      { result, summary },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    const serverMessage =
      error.response?.data?.message || "Failed to update status.";
    throw new Error(serverMessage);
  }
};
export default {
  getRecruitmentProcesses,
  getRecruitmentProcessDetail,
  updateStatus,
};
