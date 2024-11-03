import React from "react";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import authService from "../../../services/authService";
import { useNavigate } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";

// Define the validation schema
const schema = Yup.object().shape({
  fullname: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  companyName: Yup.string().required("Company name is required"),
  summary: Yup.string().optional(),
});

const RegisterEmployerPage: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const dataWithRole = {
        ...data,
        role: "EMPLOYER",
      };
      const response = await authService.register(dataWithRole);
      toast.success(response.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Background Circles */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-brand-300 rounded-full opacity-30 blur-2xl"></div>
      <div className="absolute top-1/2 right-10 w-72 h-72 bg-indigo-300 rounded-full opacity-30 blur-2xl"></div>
      <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-blue-200 rounded-full opacity-30 blur-2xl"></div>

      {/* Form Section */}
      <div className="max-w-screen-lg w-11/12 md:w-2/3 bg-white bg-opacity-50 backdrop-blur-lg shadow-lg rounded-2xl p-4 z-10">
        {/* Information Section */}
        <div className="flex items-center justify-center my-4">
          <FaInfoCircle className="text-5xl text-brand-200 mr-3" />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Welcome to HRMS Platform
            </h2>
            <p className="text-gray-600">
              By registering, you will gain access to our comprehensive HR
              management system, connecting you with top talent and streamlining
              your hiring process.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3"
        >
          {/* Full Name */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Full Name
            </label>
            <Controller
              name="fullname"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className={`w-full px-3 py-2 rounded-md border focus:ring-2 focus:ring-brand-200 focus:outline-none ${
                    errors.fullname ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="John Doe"
                />
              )}
            />
            {errors.fullname && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullname.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
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
                  className={`w-full px-3 py-2 rounded-md border focus:ring-2 focus:ring-brand-200 focus:outline-none ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="example@domain.com"
                />
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
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
                  className={`w-full px-3 py-2 rounded-md border focus:ring-2 focus:ring-brand-200 focus:outline-none ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="********"
                />
              )}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Confirm Password
            </label>
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="password"
                  className={`w-full px-3 py-2 rounded-md border focus:ring-2 focus:ring-brand-200 focus:outline-none ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="********"
                />
              )}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Phone Number
            </label>
            <Controller
              name="phoneNumber"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className={`w-full px-3 py-2 rounded-md border focus:ring-2 focus:ring-brand-200 focus:outline-none ${
                    errors.phoneNumber ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="081254125756"
                />
              )}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Company Name
            </label>
            <Controller
              name="companyName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className={`w-full px-3 py-2 rounded-md border focus:ring-2 focus:ring-brand-200 focus:outline-none ${
                    errors.companyName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Your Company"
                />
              )}
            />
            {errors.companyName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.companyName.message}
              </p>
            )}
          </div>

          {/* Summary */}
          <div className="md:col-span-2">
            <label className="block text-gray-600 font-medium mb-1">
              Summary
            </label>
            <Controller
              name="summary"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <textarea
                  {...field}
                  className="w-full px-3 py-2 rounded-md border focus:ring-2 focus:ring-brand-200 focus:outline-none"
                  rows={3}
                  placeholder="Briefly describe your company"
                />
              )}
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full py-2 mt-4 bg-brand-200 text-white rounded-lg font-semibold text-lg shadow-md hover:bg-brand-500 transition-all duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterEmployerPage;
