// src/dto/candidate.ts

export interface Candidate {
  id: number;
  fullname: string;
  email: string;
  yearOfExperience: number;
  gender: string;
  companyName: string | null;
  summary: string | null;
}

export interface GetCandidatesResponse {
  data: Candidate[];
  message: string;
}

export interface JobExperience {
  companyName: string; // Nama perusahaan
  position: string; // Jabatan
  summary: string; // Ringkasan pengalaman
  startDate: string; // Tanggal mulai
  endDate: string; // Tanggal selesai
  untilNow?: boolean; // Apakah masih bekerja di perusahaan ini
}

export interface CandidateDetail {
  id: string; // ID kandidat
  fullname: string; // Nama lengkap
  birthOfDate?: string; // Tanggal lahir
  address?: string; // Alamat
  job?: string; // Jabatan saat ini
  jobExperiences?: JobExperience[]; // Pengalaman kerja
  cv?: string; // URL CV
  instagram?: string; // URL Instagram
  twitter?: string; // URL Twitter
  linkedin?: string; // URL LinkedIn
  portfolio?: string; // URL Portfolio
  photoProfile?: string; // URL foto profil
  phoneNumber?: string; // Nomor telepon
  email: string; // Email
  gender?: string; // Jenis kelamin
  summary?: string; // Ringkasan
  yearOfExperience?: number; // Tahun pengalaman
}

export interface GetCandidateDetailResponse {
  candidate: CandidateDetail;
}
