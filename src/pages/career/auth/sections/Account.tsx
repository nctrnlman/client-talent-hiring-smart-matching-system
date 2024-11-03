import React from "react";
import { Controller, UseFormReturn } from "react-hook-form";

const Account: React.FC<{
  control: UseFormReturn<any>["control"];
  errors: any;
}> = ({ control, errors }) => {
  return (
    <>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">Email</label>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              type="email"
              {...field}
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your email"
            />
          )}
        />
        {errors.email && (
          <p className="text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">
          Password
        </label>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              type="password"
              {...field}
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your password"
            />
          )}
        />
        {errors.password && (
          <p className="text-red-500 mt-1">{errors.password.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">
          Confirm Password
        </label>
        <Controller
          name="confirmPassword"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              type="password"
              {...field}
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Confirm your password"
            />
          )}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 mt-1">{errors.confirmPassword.message}</p>
        )}
      </div>
    </>
  );
};

export default Account;
