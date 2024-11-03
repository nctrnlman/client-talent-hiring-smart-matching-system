// src/dto/vacancy.ts

export interface SoftSkill {
  id: number;
  name: string;
}

export interface HardSkill {
  id: number;
  name: string;
}

export interface JobLevel {
  id: number;
  name: string;
}

export interface EmploymentStatus {
  id: number;
  name: string;
}

export interface VacancyDetail {
  id: number;
  vacancyName: string;
  jobPosition: string;
  jobLevelId: number;
  employmentStatusId: number;
  vacancyStatus: string; // Can also use an enum for more strict control
  responsibilities: string;
  gender: "MALE" | "FEMALE"; // You might also want to define an enum here
  minAge: number;
  maxAge: number;
  minYearExperience: number;
  minEducationLevelId: number; // Assuming you want to include this
  employerId: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  jobLevel: JobLevel;
  employmentStatus: EmploymentStatus;
  softSkills: SoftSkill[];
  hardSkills: HardSkill[];
}

export interface GetVacanciesResponse {
  status: number;
  message: string;
  data: VacancyDetail[];
}

// export interface VacancyDetail {
//   id: number; // ID vacancy
//   vacancyName: string; // Nama lowongan
//   jobPosition: string; // Posisi pekerjaan
//   jobLevel: string; // Level pekerjaan
//   employmentStatus: string; // Status pekerjaan
//   responsibilities: string; // Tanggung jawab
//   createdAt: string; // Tanggal dibuat
// }

export interface GetVacancyDetailResponse {
  vacancy: VacancyDetail;
}
