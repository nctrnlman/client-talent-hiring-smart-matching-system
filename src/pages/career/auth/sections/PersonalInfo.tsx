import React from "react";
import { Controller, UseFormReturn } from "react-hook-form";

const PersonalInfo: React.FC<{
  control: UseFormReturn<any>["control"];
  errors: any;
}> = ({ control, errors }) => {
  return (
    <div className="flex space-x-4">
      {/* Kolom Kiri: Informasi Pribadi */}
      <div className="flex-1 bg-white p-4 rounded-lg shadow-sm mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Personal Information
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">
            Full Name
          </label>
          <Controller
            name="fullname"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                type="text"
                {...field}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                  errors.fullname ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter full name"
              />
            )}
          />
          {errors.fullname && (
            <p className="text-red-500 mt-1">{errors.fullname.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">
            Date of Birth
          </label>
          <Controller
            name="birthOfDate"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                type="date"
                {...field}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                  errors.birthOfDate ? "border-red-500" : "border-gray-300"
                }`}
              />
            )}
          />
          {errors.birthOfDate && (
            <p className="text-red-500 mt-1">{errors.birthOfDate.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">
            Phone Number
          </label>
          <Controller
            name="phoneNumber"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                type="text"
                {...field}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                  errors.phoneNumber ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter phone number"
              />
            )}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 mt-1">{errors.phoneNumber.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">
            Address
          </label>
          <Controller
            name="address"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                type="text"
                {...field}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                  errors.address ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter address"
              />
            )}
          />
          {errors.address && (
            <p className="text-red-500 mt-1">{errors.address.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">
            Gender
          </label>
          <Controller
            name="gender"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <select
                {...field}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                  errors.gender ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            )}
          />
          {errors.gender && (
            <p className="text-red-500 mt-1">{errors.gender.message}</p>
          )}
        </div>
      </div>

      {/* Kolom Kanan: Informasi Tambahan */}
      <div className="flex-1 bg-white p-4 rounded-lg shadow-sm mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Additional Information
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">
            Summary
          </label>
          <Controller
            name="summary"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <textarea
                {...field}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                  errors.summary ? "border-red-500" : "border-gray-300"
                }`}
                rows={4}
                placeholder="Enter a brief summary about yourself"
              />
            )}
          />
          {errors.summary && (
            <p className="text-red-500 mt-1">{errors.summary.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">
            CV Link
          </label>
          <Controller
            name="cv"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                type="url"
                {...field}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                  errors.cv ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter CV URL"
              />
            )}
          />
          {errors.cv && (
            <p className="text-red-500 mt-1">{errors.cv.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
