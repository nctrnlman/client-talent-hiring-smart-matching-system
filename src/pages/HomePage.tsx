import React from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  FaUserTie,
  FaUserGraduate,
  FaBriefcase,
  FaChartLine,
} from "react-icons/fa";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const goToRegisterCandidate = () => navigate("/register/candidate");
  const goToRegisterEmployer = () => navigate("/register/employer");
  const goToLogin = () => navigate("/login");

  return (
    <div>
      {/* Helmet for SEO and page title */}
      <Helmet>
        <title>Talent Hiring Smart Matching System</title>
        <meta
          name="description"
          content="A comprehensive platform for career development and recruitment management, helping candidates and employers find the perfect match."
        />
      </Helmet>
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-50 via-purple-50 to-gray-100 overflow-hidden">
        {/* Background Circles */}
        <div className="absolute top-10 left-10 w-80 h-80 bg-purple-300 rounded-full opacity-30 blur-2xl"></div>
        <div className="absolute top-1/2 right-10 w-72 h-72 bg-indigo-300 rounded-full opacity-30 blur-2xl"></div>
        <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-blue-200 rounded-full opacity-30 blur-2xl"></div>

        {/* Hero Section */}
        <div className="relative p-12 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center rounded-2xl shadow-xl w-11/12 lg:w-2/3 mt-12 z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Talent Hiring Smart Matching System
          </h1>
          <p className="text-base md:text-lg mb-8 max-w-2xl mx-auto">
            A unified platform for career development and recruitment
            management, helping candidates and employers make the perfect match.
          </p>
          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4 justify-center">
            <button
              onClick={goToRegisterCandidate}
              className="px-6 py-2 md:px-8 md:py-3 bg-emerald-500 rounded-lg text-white font-semibold hover:bg-emerald-600 shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              Register as Candidate
            </button>
            <button
              onClick={goToRegisterEmployer}
              className="px-6 py-2 md:px-8 md:py-3 bg-teal-500 rounded-lg text-white font-semibold hover:bg-teal-600 shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              Register as Employer
            </button>
            <button
              onClick={goToLogin}
              className="px-6 py-2 md:px-8 md:py-3 bg-gray-800 rounded-lg text-white font-semibold hover:bg-gray-700 shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              Login
            </button>
          </div>
        </div>

        {/* Services Section */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-10 mt-12 max-w-screen-lg z-10">
          <div className="p-8 bg-white shadow-lg rounded-xl text-center transition-transform transform hover:scale-105 duration-200">
            <FaUserGraduate className="text-4xl md:text-5xl text-indigo-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">
              Candidate Management
            </h3>
            <p className="text-gray-600 mt-2">
              Manage candidate profiles, applications, and progress
              effortlessly.
            </p>
          </div>
          <div className="p-8 bg-white shadow-lg rounded-xl text-center transition-transform transform hover:scale-105 duration-200">
            <FaUserTie className="text-4xl md:text-5xl text-teal-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">
              Recruitment Process
            </h3>
            <p className="text-gray-600 mt-2">
              Streamline interviews, onboarding, and hiring workflows for an
              optimized recruitment experience.
            </p>
          </div>
          <div className="p-8 bg-white shadow-lg rounded-xl text-center transition-transform transform hover:scale-105 duration-200">
            <FaBriefcase className="text-4xl md:text-5xl text-purple-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">
              Job Management
            </h3>
            <p className="text-gray-600 mt-2">
              Create, publish, and manage job listings to attract top talent.
            </p>
          </div>
          <div className="p-8 bg-white shadow-lg rounded-xl text-center transition-transform transform hover:scale-105 duration-200">
            <FaChartLine className="text-4xl md:text-5xl text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">
              Analytics & Insights
            </h3>
            <p className="text-gray-600 mt-2">
              Leverage data-driven insights to improve recruitment strategies.
            </p>
          </div>
          <div className="p-8 bg-white shadow-lg rounded-xl text-center transition-transform transform hover:scale-105 duration-200">
            <FaUserTie className="text-4xl md:text-5xl text-indigo-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">
              Employer Dashboard
            </h3>
            <p className="text-gray-600 mt-2">
              Access all recruitment activities with an intuitive dashboard.
            </p>
          </div>
          <div className="p-8 bg-white shadow-lg rounded-xl text-center transition-transform transform hover:scale-105 duration-200">
            <FaUserGraduate className="text-4xl md:text-5xl text-teal-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">
              Career Development
            </h3>
            <p className="text-gray-600 mt-2">
              Support candidates in enhancing their skills for career growth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
