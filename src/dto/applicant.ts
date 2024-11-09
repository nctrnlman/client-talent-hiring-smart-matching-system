// src/dto/applicant.ts

export enum Status {
  APPLIED = "APPLIED", // Initial application status
  IN_PROGRESS = "IN_PROGRESS", // Application is actively being processed
  ACCEPTED = "ACCEPTED", // Applicant accepted for the role
  REJECTED = "REJECTED", // Applicant rejected
  WITHDRAWN = "WITHDRAWN", // Applicant withdrew their application
}

export enum Flow {
  SCREENING = "SCREENING",
  INTERVIEW = "INTERVIEW",
  OFFER = "OFFER",
  HIRED = "HIRED",
  REJECTED = "REJECTED",
}

export interface Applicant {
  id: number;
  userId: number; // ID of the applicant
  vacancyId: number; // ID of the vacancy being applied to
  status: Status; // Application status
  flow: Flow; // Current stage in the hiring process
  note?: string; // Optional notes about the application
  createdAt: string; // Application creation timestamp (ISO format)
  updatedAt: string; // Last update timestamp (ISO format)
}

export interface ApplyForVacancyRequest {
  vacancyId: number;
  userId: number;
  note?: string; // Optional note from the applicant
}

export interface ApplyForVacancyResponse {
  status: number;
  message: string;
  data: Applicant;
}
