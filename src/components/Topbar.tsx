// src/components/Topbar.tsx
import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { getUserSession } from "../services/indexedDBService";

const Topbar: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const fetchUserData = async () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const session = await getUserSession(token);
      if (session && session.userData) {
        setUserName(session.userData.companyName);
      }
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="flex justify-between items-center p-4 ">
      <div className="flex items-center">
        <FaUser className="text-blueSecondary mr-2" />
        <h1 className="text-2xl font-extrabold text-black mr-4">
          Human Resource Management System
        </h1>
      </div>
      <div>
        <span className="text-gray-700  bg-lightPrimary px-4 py-2 rounded-2xl mr-4">
          {userName ? `Welcome, ${userName}!` : "Welcome back!"}
        </span>
        <button className="bg-blueSecondary text-white px-4 py-2 rounded-2xl hover:bg-brandLinear transition duration-300">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Topbar;
