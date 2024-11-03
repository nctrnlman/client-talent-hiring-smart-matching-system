// src/pages/career/ProfileCareerPage.tsx
import React from "react";

const ProfileCareerPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Profil Saya</h1>
      <p>
        Informasi dasar profil Anda. Silakan perbarui informasi Anda jika
        diperlukan.
      </p>
      {/* Contoh form sederhana */}
      <form className="mt-4 space-y-4">
        <div>
          <label className="block font-semibold">Nama Lengkap</label>
          <input
            type="text"
            className="border p-2 w-full"
            placeholder="Nama Lengkap"
          />
        </div>
        <div>
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            className="border p-2 w-full"
            placeholder="Email"
          />
        </div>
        <button type="submit" className="bg-emerald-500 text-white p-2 rounded">
          Perbarui Profil
        </button>
      </form>
    </div>
  );
};

export default ProfileCareerPage;
