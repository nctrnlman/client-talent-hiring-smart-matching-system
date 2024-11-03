import React from "react";

const DashboardHrmsPage: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 ">Dashboard HRMS</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold">Total Employees</h3>
          <p className="text-3xl font-bold">150</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold">New Hires This Month</h3>
          <p className="text-3xl font-bold">12</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold">Pending Applications</h3>
          <p className="text-3xl font-bold">5</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold">
            Average Employee Satisfaction
          </h3>
          <p className="text-3xl font-bold">85%</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold">Total Departments</h3>
          <p className="text-3xl font-bold">8</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold">Total Open Positions</h3>
          <p className="text-3xl font-bold">3</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHrmsPage;
