import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getUserSession } from "../../../services/indexedDBService";

const DashboardCareerPage: React.FC = () => {
  const [userData, setUserData] = useState<{
    name: string;
    email: string;
  }>({
    name: "",
    email: "",
  });

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

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-8">
      <h1 className="text-2xl font-bold mb-4">
        Welcome,{" "}
        <span className="font-semibold text-brand-600">
          {userData.name || "User"}
        </span>
        !
      </h1>
      <p className="mb-6">
        Here you can view a summary of your profile and your latest application
        statuses.
      </p>

      {/* Flexbox for Side-by-Side Layout */}
      <div className="flex flex-col md:flex-row md:space-x-8">
        {/* Profile Overview */}
        <div className="flex-1 bg-gray-100 p-4 rounded-lg shadow-inner mb-6 md:mb-0">
          <h2 className="text-xl font-semibold mb-2">Your Profile</h2>
          <div className="grid grid-cols-1 gap-4">
            <p className="mb-1">
              <strong>Full Name:</strong> {userData.name}
            </p>
            <p className="mb-1">
              <strong>Email:</strong> {userData.email}
            </p>
            <p className="mb-1">
              <strong>Application Status:</strong> In Progress
            </p>
            <p className="mb-1">
              <strong>Last Login:</strong> {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Recent Activities Section */}
        <div className="flex-1 mt-6 md:mt-0 p-4 border border-brand-200 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Recent Activities</h2>
          <ul className="list-disc list-inside">
            <li>
              Applied for "Software Engineer" on{" "}
              {new Date().toLocaleDateString()}
            </li>
            <li>Updated your profile on {new Date().toLocaleDateString()}</li>
            <li>Received feedback on your application.</li>
          </ul>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-6">
        <button className="px-4 py-2 bg-brand-600 text-white rounded-md hover:bg-brand-500 transition duration-300">
          View Your Applications
        </button>
      </div>
    </div>
  );
};

export default DashboardCareerPage;
