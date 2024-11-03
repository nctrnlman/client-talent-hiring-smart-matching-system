// src/components/Sidebar.tsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBriefcase,
  FaUserFriends,
  FaClipboardList,
  FaAngleDown,
  FaAngleRight,
  FaCircle,
} from "react-icons/fa";

const Sidebar: React.FC = () => {
  const [isProcessOpen, setIsProcessOpen] = useState(false);

  const toggleProcess = () => {
    setIsProcessOpen(!isProcessOpen);
  };

  return (
    <nav>
      <ul className="space-y-4">
        <li>
          <NavLink
            to="/hrms/dashboard"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-full transition duration-300 transform ${
                isActive
                  ? "bg-blueSecondary text-white scale-105"
                  : "hover:bg-lightPrimary hover:scale-105 text-black"
              }`
            }
          >
            <FaTachometerAlt className="inline-block mr-2" />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/hrms/job-management"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-full transition duration-300 transform ${
                isActive
                  ? "bg-blueSecondary text-white scale-105"
                  : "hover:bg-lightPrimary hover:scale-105 text-black"
              }`
            }
          >
            <FaBriefcase className="inline-block mr-2" />
            Job Management
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/hrms/candidate-pool"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-full transition duration-300 transform ${
                isActive
                  ? "bg-blueSecondary text-white scale-105"
                  : "hover:bg-lightPrimary hover:scale-105 text-black"
              }`
            }
          >
            <FaUserFriends className="inline-block mr-2" />
            Candidate Pool
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/hrms/candidate-management"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-full transition duration-300 transform ${
                isActive
                  ? "bg-blueSecondary text-white scale-105"
                  : "hover:bg-lightPrimary hover:scale-105 text-black"
              }`
            }
          >
            <FaUserFriends className="inline-block mr-2" />
            Candidate Management
          </NavLink>
        </li>
        <li>
          <button
            className={`flex items-center justify-between w-full text-left p-3 rounded-full transition duration-300 transform ${
              isProcessOpen
                ? "bg-blueSecondary text-white scale-105"
                : "hover:bg-lightPrimary hover:scale-105 text-black"
            }`}
            onClick={toggleProcess}
          >
            <div className="flex items-center">
              <FaClipboardList className="inline-block mr-2" />
              Recruitment Process
            </div>
            {isProcessOpen ? (
              <FaAngleDown className="ml-2 transition-transform duration-300 transform rotate-180" />
            ) : (
              <FaAngleRight className="ml-2 transition-transform duration-300 transform" />
            )}
          </button>
          {isProcessOpen && (
            <ul className="pl-4 mt-2 space-y-2">
              <li className="flex items-center">
                <FaCircle className="text-gray-300 mr-2" />
                <NavLink
                  to="/hrms/process/interview"
                  className={({ isActive }) =>
                    `block p-2 rounded-full transition duration-300 transform ${
                      isActive
                        ? "bg-blueSecondary text-white scale-105"
                        : "hover:bg-lightPrimary hover:scale-105 text-black"
                    }`
                  }
                >
                  Interview
                </NavLink>
              </li>
              <li className="flex items-center">
                <FaCircle className="text-gray-300 mr-2" />
                <NavLink
                  to="/hrms/process/onboarding"
                  className={({ isActive }) =>
                    `block p-2 rounded-full transition duration-300 transform ${
                      isActive
                        ? "bg-blueSecondary text-white scale-105"
                        : "hover:bg-lightPrimary hover:scale-105 text-black"
                    }`
                  }
                >
                  Onboarding
                </NavLink>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
