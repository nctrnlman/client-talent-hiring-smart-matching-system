// src/pages/career/VacancyCareerPage.tsx
import React from "react";

const VacancyCareerPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Lowongan Pekerjaan</h1>
      <p>
        Temukan berbagai peluang karier yang sesuai dengan keterampilan dan
        minat Anda.
      </p>
      {/* Contoh daftar lowongan */}
      <ul className="mt-4 space-y-4">
        <li className="border p-4 rounded shadow">
          <h2 className="font-semibold">Software Engineer</h2>
          <p>Lokasi: Jakarta</p>
          <button className="mt-2 bg-emerald-500 text-white p-2 rounded">
            Lihat Detail
          </button>
        </li>
        <li className="border p-4 rounded shadow">
          <h2 className="font-semibold">Product Manager</h2>
          <p>Lokasi: Bandung</p>
          <button className="mt-2 bg-emerald-500 text-white p-2 rounded">
            Lihat Detail
          </button>
        </li>
      </ul>
    </div>
  );
};

export default VacancyCareerPage;
