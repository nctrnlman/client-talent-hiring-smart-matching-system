import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { LoginRequest } from "../dto/auth";
import { toast } from "react-toastify";
import { saveUserSession } from "../services/indexedDBService";
import { FaUser, FaLock, FaCheck, FaChartLine } from "react-icons/fa";

// Validation Schema
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginRequest) => {
    try {
      const response = await authService.login(data);
      const { token, role, userData } = response.data;
      localStorage.setItem("authToken", token);

      const sessionData = { token, role, userData };
      await saveUserSession(sessionData);

      if (role === "EMPLOYER") {
        navigate("/hrms/dashboard");
      } else {
        navigate("/career/dashboard");
      }

      toast.success(response.message || "Login successful!");
    } catch (error) {
      console.error(error);
      toast.error(
        error.message || "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Background Circles */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-purple-300 rounded-full opacity-30 blur-2xl"></div>
      <div className="absolute top-1/2 right-10 w-72 h-72 bg-indigo-300 rounded-full opacity-30 blur-2xl"></div>
      <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-blue-200 rounded-full opacity-30 blur-2xl"></div>

      <div className="flex w-full max-w-5xl p-4 bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Kartu Login di Kiri */}
        <div className="w-full lg:w-1/2 p-10">
          <h1 className="text-5xl font-bold text-center text-gray-800 mb-2">
            Welcome Back!
          </h1>
          <h2 className="text-lg text-center text-gray-600 mb-6">
            Please log in to your account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="email"
                    className={`block w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="you@example.com"
                  />
                )}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="password"
                    className={`block w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="••••••••"
                  />
                )}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-brand-200 rounded-md hover:bg-brand-500 transition duration-200 ease-in-out transform hover:scale-105"
            >
              Login
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">Don't have an account?</p>
            <div className="flex justify-center space-x-4 mt-2">
              <button
                onClick={() => navigate("/register/candidate")}
                className="px-4 py-2 text-brand-200 border border-brand-200 rounded-md hover:bg-brand-200 hover:text-white transition duration-200 z-10"
              >
                Register as Candidate
              </button>
              <button
                onClick={() => navigate("/register/employer")}
                className="px-4 py-2 text-brand-200 border border-brand-200 rounded-md hover:bg-brand-200 hover:text-white transition duration-200 z-10"
              >
                Register as Employer
              </button>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex lg:flex-col lg:justify-center lg:items-center lg:w-1/2 p-10 bg-lightPrimary text-brandLinear rounded-2xl">
          <h2 className="text-4xl text-center font-bold mb-4">
            Your Gateway to Efficient Management
          </h2>
          <p className="text-lg text-center mb-6">
            Manage your hiring process seamlessly with our platform. Connect
            with the best candidates and streamline your workflow.
          </p>
          <div className="flex flex-col items-start space-y-4">
            <div className="flex items-center">
              <FaUser className="text-4xl mr-3" />
              <p className="text-lg">Connect with top candidates easily.</p>
            </div>
            <div className="flex items-center">
              <FaLock className="text-4xl mr-3" />
              <p className="text-lg">Secure and reliable platform.</p>
            </div>
            <div className="flex items-center">
              <FaCheck className="text-4xl mr-3" />
              <p className="text-lg">Streamlined hiring process.</p>
            </div>
            <div className="flex items-center">
              <FaChartLine className="text-4xl mr-3" />
              <p className="text-lg">Track your recruitment metrics.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
