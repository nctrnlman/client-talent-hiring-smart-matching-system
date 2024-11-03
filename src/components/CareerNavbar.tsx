// src/components/CareerNavbar.tsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Assuming you use react-toastify for notifications

const CareerNavbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      toast.success("Successfully logged out!");
      navigate("/login"); // Redirect to login after logout
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <nav className=" border-b border-brand-200 shadow-lg p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand-600">Job Portal</h1>
        <ul className="flex items-center space-x-8">
          <li>
            <NavLink
              to="/career/dashboard"
              className={({ isActive }) =>
                `px-4 py-2 rounded-full transition-all duration-300 transform ${
                  isActive
                    ? "border border-brand-600 text-brand-600"
                    : "hover:border border-brand-400 text-brand-200"
                }`
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/career/my-profile"
              className={({ isActive }) =>
                `px-4 py-2 rounded-full transition-all duration-300 transform ${
                  isActive
                    ? "border border-brand-600 text-brand-600"
                    : "hover:border border-brand-400 text-brand-200"
                }`
              }
            >
              My Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/career/application-status"
              className={({ isActive }) =>
                `px-4 py-2 rounded-full transition-all duration-300 transform ${
                  isActive
                    ? "border border-brand-600 text-brand-600"
                    : "hover:border border-brand-400 text-brand-200"
                }`
              }
            >
              Application Status
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/career/vacancy"
              className={({ isActive }) =>
                `px-4 py-2 rounded-full transition-all duration-300 transform ${
                  isActive
                    ? "border border-brand-600 text-brand-600"
                    : "hover:border border-brand-400 text-brand-200"
                }`
              }
            >
              Vacancy
            </NavLink>
          </li>
        </ul>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-brand-600 text-white rounded-full hover:bg-brand-500 transition duration-300"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default CareerNavbar;
