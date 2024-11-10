import React from "react";
import {
  FaUsers,
  FaChalkboardTeacher,
  FaUserTie,
  FaClipboardList,
  FaRegCalendarCheck,
  FaChartLine,
} from "react-icons/fa"; // Importing icons from react-icons

const DashboardHrmsPage: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard HRMS</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Employee Management Feature */}
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
          <FaUsers className="text-3xl text-brand-600 mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Employee Management</h3>
            <p className="text-gray-700">
              Easily manage employee profiles, including personal info, job
              roles, and history.
            </p>
          </div>
        </div>

        {/* Training & Development Feature */}
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
          <FaChalkboardTeacher className="text-3xl text-brand-600 mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Training & Development</h3>
            <p className="text-gray-700">
              Track and manage employee training, certifications, and growth
              programs.
            </p>
          </div>
        </div>

        {/* Recruitment & Onboarding Feature */}
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
          <FaUserTie className="text-3xl text-brand-600 mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Recruitment & Onboarding</h3>
            <p className="text-gray-700">
              Streamline the hiring process and manage new employee onboarding.
            </p>
          </div>
        </div>

        {/* Leave Management Feature */}
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
          <FaClipboardList className="text-3xl text-brand-600 mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Leave Management</h3>
            <p className="text-gray-700">
              Efficiently handle employee leave requests, approvals, and
              tracking.
            </p>
          </div>
        </div>

        {/* Payroll & Compensation Feature */}
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
          <FaRegCalendarCheck className="text-3xl text-brand-600 mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Payroll & Compensation</h3>
            <p className="text-gray-700">
              Automate payroll processing, tax calculations, and salary
              disbursements.
            </p>
          </div>
        </div>

        {/* Analytics & Reporting Feature */}
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
          <FaChartLine className="text-3xl text-brand-600 mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Analytics & Reporting</h3>
            <p className="text-gray-700">
              Generate detailed reports on employee performance, attendance, and
              productivity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHrmsPage;
