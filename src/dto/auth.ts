export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserData {
  id: number;
  email: string;
  name: string;
  companyName?: string | null; // Optional jika perusahaan tidak ada
}

export interface LoginResponse {
  status: number;
  message: string;
  data: {
    token: string;
    role: string;
    userData: UserData; // Menambahkan userData ke dalam data
  };
}

export interface JobExperience {
  companyName: string;
  position: string;
  startDate: string; // Format tanggal
  endDate?: string; // Format tanggal (opsional jika masih bekerja)
  untilNow?: boolean; // Menandakan jika masih bekerja di perusahaan ini
  summary: string; // Deskripsi pekerjaan
}

export interface RegisterRequest {
  fullname: string;
  birthOfDate: string; // Format tanggal
  address: string;
  job: string; // Job Title
  jobExperience: JobExperience[]; // Array of job experiences
  cv: string;
  instagram?: string; // Opsional
  twitter?: string; // Opsional
  linkedin?: string; // Opsional
  portfolio?: string; // Opsional
  photoProfile?: string; // Opsional
  phoneNumber: string;
  email: string;
  password: string;
  role: string; // CANDIDATE atau EMPLOYER
  yearOfExperience?: number; // New field (opsional)
  gender?: string; // New field (opsional)
}

// DTO untuk respons registrasi
export interface RegisterResponse {
  status: number;
  message: string;
  data: {
    userId: string; // ID pengguna yang baru dibuat
  };
}
