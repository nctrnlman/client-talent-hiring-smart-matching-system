// src/pages/career/ApplicationCareerPage.tsx
import React from "react";

const ApplicationCareerPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Status Aplikasi</h1>
      <p>Periksa status aplikasi pekerjaan Anda di sini.</p>
      {/* Contoh status aplikasi */}
      <ul className="mt-4 space-y-4">
        <li className="border p-4 rounded shadow">
          <h2 className="font-semibold">Software Engineer - Jakarta</h2>
          <p>Status: Sedang diproses</p>
        </li>
        <li className="border p-4 rounded shadow">
          <h2 className="font-semibold">Product Manager - Bandung</h2>
          <p>Status: Ditolak</p>
        </li>
      </ul>
    </div>
  );
};

export default ApplicationCareerPage;
