import React, { useEffect, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import masterDataService from "../../../../services/masterDataService";
import { Select } from "antd";
const { Option } = Select;
const PersonalInfo: React.FC<{
  control: UseFormReturn<any>["control"];
  errors: any;
}> = ({ control, errors }) => {
  const [educationLevels, setEducationLevels] = useState<any[]>([]);
  const [softSkills, setSoftSkills] = useState<any[]>([]);
  const [hardSkills, setHardSkills] = useState<any[]>([]);

  useEffect(() => {
    const fetchMasterData = async () => {
      try {
        const data = await masterDataService.getMasterData([
          "educLevels",
          "softSkills",
          "hardSkills",
        ]);
        setEducationLevels(data.eduLevels || []);
        setSoftSkills(data.softSkills || []);
        setHardSkills(data.hardSkills || []);
      } catch (error) {
        console.error("Error fetching master data:", error);
      }
    };

    fetchMasterData();
  }, []);
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
        {/* Education Level */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">
            Education Level
          </label>
          <Controller
            name="educationLevelId"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <select
                {...field}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                  errors.educationLevelId ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Education Level</option>
                {educationLevels.map((level: any) => (
                  <option key={level.id} value={level.id}>
                    {level.name}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.educationLevelId && (
            <p className="text-red-500 mt-1">
              {errors.educationLevelId.message}
            </p>
          )}
        </div>

        {/* Soft Skills */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">
            Soft Skills
          </label>
          <Controller
            name="softSkills"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <Select
                {...field}
                mode="multiple" // Enable multiple selection
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                  errors.softSkills ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Select Soft Skills"
              >
                {softSkills.map((skill: any) => (
                  <Option key={skill.id} value={skill.id}>
                    {skill.name}
                  </Option>
                ))}
              </Select>
            )}
          />
          {errors.softSkills && (
            <p className="text-red-500 mt-1">{errors.softSkills.message}</p>
          )}
        </div>

        {/* Hard Skills */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">
            Hard Skills
          </label>
          <Controller
            name="hardSkills"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <Select
                {...field}
                mode="multiple" // Enable multiple selection
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                  errors.hardSkills ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Select Hard Skills"
              >
                {hardSkills.map((skill: any) => (
                  <Option key={skill.id} value={skill.id}>
                    {skill.name}
                  </Option>
                ))}
              </Select>
            )}
          />
          {errors.hardSkills && (
            <p className="text-red-500 mt-1">{errors.hardSkills.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
