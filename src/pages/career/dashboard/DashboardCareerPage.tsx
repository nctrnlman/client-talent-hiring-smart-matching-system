import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getUserSession } from "../../../services/indexedDBService";
import { useNavigate } from "react-router-dom"; // Import useNavigate for React Router v6
import {
  FaSearch,
  FaRegCheckCircle,
  FaRegUser,
  FaHandsHelping,
} from "react-icons/fa"; // Import icons from react-icons

const DashboardCareerPage: React.FC = () => {
  const [userData, setUserData] = useState<{
    name: string;
    email: string;
  }>({
    name: "",
    email: "",
  });

  const navigate = useNavigate(); // Initialize useNavigate for navigation

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("No valid session found. Please log in.");
        return;
      }

      const session = await getUserSession(token);
      if (session) {
        setUserData(session.userData);
      } else {
        toast.error("No user session found");
      }
    };

    fetchUserData();
  }, []);

  // Navigate to the application status page
  const handleViewApplications = () => {
    navigate("/career/application-status");
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white rounded-3xl shadow-xl mt-8">
      {/* Welcome message */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Welcome,{" "}
        <span className="font-semibold text-brand-600">
          {userData.name || "User"}
        </span>
        !
      </h1>
      <p className="text-lg text-center text-gray-600 mb-8">
        Here's a quick overview of your profile and application status.
      </p>

      {/* Profile and Features Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Overview */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Your Profile
          </h2>
          <div className="space-y-4">
            <p className="text-gray-700">
              <strong className="font-medium">Full Name:</strong>{" "}
              {userData.name || "N/A"}
            </p>
            <p className="text-gray-700">
              <strong className="font-medium">Email:</strong>{" "}
              {userData.email || "N/A"}
            </p>

            <p className="text-gray-700">
              <strong className="font-medium">Last Login:</strong>{" "}
              {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Featured Job Portal Features Section */}
        <div className="bg-white p-6 border-2 border-gray-200 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Featured Features
          </h2>
          <ul className="space-y-4">
            <li className="flex items-center text-gray-700">
              <FaSearch className="mr-3 text-brand-600" />{" "}
              <span>
                <strong className="font-medium">Job Search:</strong> Find jobs
                based on your preferences.
              </span>
            </li>
            <li className="flex items-center text-gray-700">
              <FaRegCheckCircle className="mr-3 text-brand-600" />{" "}
              <span>
                <strong className="font-medium">Application Tracking:</strong>{" "}
                Keep track of your job applications and their status.
              </span>
            </li>
            <li className="flex items-center text-gray-700">
              <FaRegUser className="mr-3 text-brand-600" />{" "}
              <span>
                <strong className="font-medium">Profile Optimization:</strong>{" "}
                Update your resume, skills, and qualifications to stand out.
              </span>
            </li>
            <li className="flex items-center text-gray-700">
              <FaHandsHelping className="mr-3 text-brand-600" />{" "}
              <span>
                <strong className="font-medium">Career Resources:</strong>{" "}
                Access helpful career advice, resume tips, and interview
                strategies.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Action Button to navigate to application status page */}
      <div className="mt-8 text-center">
        <button
          onClick={handleViewApplications} // Trigger navigation on click
          className="px-6 py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-500 transition duration-300"
        >
          View Your Applications
        </button>
      </div>
    </div>
  );
};

export default DashboardCareerPage;
