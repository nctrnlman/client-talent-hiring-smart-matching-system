import axios from "axios";
import {
  GetCandidatesResponse,
  GetCandidateDetailResponse,
  CandidateDetail,
} from "../dto/candidate";

const API_URL = import.meta.env.VITE_API_URL;

const getCandidates = async (): Promise<GetCandidatesResponse> => {
  try {
    const token = localStorage.getItem("authToken"); // Ambil token dari localStorage
    const response = await axios.get(`${API_URL}/candidates`, {
      headers: {
        Authorization: `Bearer ${token}`, // Tambahkan token ke header Authorization
      },
    });
    return response.data;
  } catch (error) {
    const serverMessage =
      error.response?.data?.message || "Failed to fetch candidates.";
    throw new Error(serverMessage);
  }
};

const getCandidateDetail = async (
  candidateId: string
): Promise<GetCandidateDetailResponse> => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(`${API_URL}/candidates/${candidateId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    const serverMessage =
      error.response?.data?.message || "Failed to fetch candidate detail.";
    throw new Error(serverMessage);
  }
};

const updateCandidate = async (
  candidateId: string,
  candidateData: CandidateDetail
): Promise<GetCandidateDetailResponse> => {
  try {
    const token = localStorage.getItem("authToken");

    const response = await axios.put(
      `${API_URL}/candidates/${candidateId}`,
      candidateData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    const serverMessage =
      error.response?.data?.message || "Failed to update candidate.";
    throw new Error(serverMessage);
  }
};

export default {
  getCandidates,
  getCandidateDetail,
  updateCandidate,
};
