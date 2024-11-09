// src/services/applicantService.ts

import axios from "axios";
import {
  ApplyForVacancyRequest,
  ApplyForVacancyResponse,
  Applicant,
  Status,
  Flow,
} from "../dto/applicant";
import { getUserSession } from "./indexedDBService";

const API_URL = import.meta.env.VITE_API_URL;

// Apply for a vacancy
const applyForVacancy = async (
  data: ApplyForVacancyRequest
): Promise<ApplyForVacancyResponse> => {
  try {
    const token = localStorage.getItem("authToken");
    const userSession = await getUserSession(token);
    const response = await axios.post(
      `${API_URL}/applicants`,
      {
        ...data,
        status: Status.APPLIED,
        flow: Flow.SCREENING,
        userId: userSession?.userData.id, // Initial stage when applying
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    const serverMessage =
      error.response?.data?.message || "Failed to apply for the vacancy.";
    throw new Error(serverMessage);
  }
};

// Update applicant's status or flow
const updateApplicantStatusOrFlow = async (
  applicantId: number,
  status?: Status,
  flow?: Flow,
  note?: string
): Promise<Applicant> => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.put(
      `${API_URL}/applicants/${applicantId}`,
      { status, flow, note },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    const serverMessage =
      error.response?.data?.message ||
      "Failed to update applicant status or flow.";
    throw new Error(serverMessage);
  }
};

// Fetch details for a specific applicant
const getApplicantDetail = async (applicantId: number): Promise<Applicant> => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(`${API_URL}/applicants/${applicantId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    const serverMessage =
      error.response?.data?.message || "Failed to fetch applicant details.";
    throw new Error(serverMessage);
  }
};

// Fetch applicants for a specific vacancy
const getApplicantsForVacancy = async (
  vacancyId: number
): Promise<Applicant[]> => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(
      `${API_URL}/vacancies/${vacancyId}/applicants`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    const serverMessage =
      error.response?.data?.message ||
      "Failed to fetch applicants for vacancy.";
    throw new Error(serverMessage);
  }
};

// Fetch all applicants
const getApplicants = async (): Promise<Applicant[]> => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(`${API_URL}/applicants`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    const serverMessage =
      error.response?.data?.message || "Failed to fetch applicants.";
    throw new Error(serverMessage);
  }
};

export default {
  applyForVacancy,
  updateApplicantStatusOrFlow,
  getApplicantDetail,
  getApplicantsForVacancy,
  getApplicants,
};