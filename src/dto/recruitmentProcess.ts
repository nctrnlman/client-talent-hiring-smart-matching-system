// src/dto/recruitmentProcess.ts

// Struktur untuk merespon daftar proses rekrutmen
export interface GetRecruitmentProcessesResponse {
  data: RecruitmentProcess[]; // Daftar proses rekrutmen
  message: string;
}

// Struktur untuk tiap proses rekrutmen dalam daftar
export interface RecruitmentProcess {
  id: number;
  applicantId: number;
  result: string; // Hasil proses rekrutmen
  summary: string; // Ringkasan proses
  flow: string; // Tahap atau flow dalam proses
  createdAt: string; // Tanggal proses dimulai
  updatedAt: string; // Tanggal proses terakhir diperbarui
  applicant: {
    id: number;
    name: string;
    email: string;
    phone: string;
    status: string;
  }; // Data terkait applicant yang ikut dalam proses rekrutmen
  vacancy: {
    id: number;
    vacancyName: string;
    employerId: number; // ID perusahaan yang membuka lowongan
  }; // Data terkait vacancy yang diikuti oleh applicant
}

// Struktur untuk detail proses rekrutmen
export interface GetRecruitmentProcessDetailResponse {
  data: RecruitmentProcessDetail;
  message: string;
}

// Struktur untuk detail proses rekrutmen (lebih lengkap)
export interface RecruitmentProcessDetail {
  id: number;
  applicantId: number;
  result: string; // Hasil proses rekrutmen
  summary: string; // Ringkasan proses
  flow: string; // Tahap atau flow dalam proses
  createdAt: string;
  updatedAt: string;
  applicant: {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string; // Alamat kandidat
    resume: string; // Resume kandidat
    status: string;
  };
  vacancy: {
    id: number;
    vacancyName: string;
    employerId: number; // ID perusahaan yang membuka lowongan
    jobLevel: string; // Level pekerjaan
    minAge: number; // Umur minimal
    maxAge: number; // Umur maksimal
    minEducationLevel: string; // Tingkat pendidikan minimal
  };
}
