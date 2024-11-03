import React, { useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";

const WorkExperience: React.FC<{
  control: UseFormReturn<any>["control"];
  errors: any;
  setValue: UseFormReturn<any>["setValue"];
}> = ({ control, errors, setValue }) => {
  const [jobExperiences, setJobExperiences] = useState([
    {
      companyName: "",
      position: "",
      startDate: "",
      untilNow: false,
      endDate: "",
      summary: "",
    },
  ]);

  const handleAddJobExperience = () => {
    const newExperience = {
      companyName: "",
      position: "",
      startDate: "",
      untilNow: false,
      endDate: "",
      summary: "",
    };
    const updatedExperiences = [...jobExperiences, newExperience];
    setJobExperiences(updatedExperiences);
    setValue("jobExperiences", updatedExperiences); // Update form state
  };

  const handleRemoveJobExperience = (index: number) => {
    const updatedExperiences = jobExperiences.filter((_, i) => i !== index);
    setJobExperiences(updatedExperiences);
    setValue("jobExperiences", updatedExperiences); // Update form state
  };

  const handleJobExperienceChange = (
    index: number,
    field: string,
    value: any
  ) => {
    const updatedExperiences = [...jobExperiences];
    updatedExperiences[index][field] = value;
    setJobExperiences(updatedExperiences);
    setValue(`jobExperiences[${index}].${field}`, value); // Sync with form state
  };

  return (
    <>
      {/* Job Title */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">
          Job Title
        </label>
        <Controller
          name="job"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              type="text"
              {...field}
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                errors.job ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter job title"
            />
          )}
        />
        {errors.job && (
          <p className="text-red-500 mt-1">{errors.job.message}</p>
        )}
      </div>

      {/* Years of Experience */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">
          Years of Experience
        </label>
        <Controller
          name="yearOfExperience"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              type="number"
              {...field}
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                errors.yearOfExperience ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter years of experience"
            />
          )}
        />
        {errors.yearOfExperience && (
          <p className="text-red-500 mt-1">{errors.yearOfExperience.message}</p>
        )}
      </div>

      {/* Dynamic Job Experience Fields */}
      <h2 className="font-semibold mb-2">Job Experiences</h2>
      {jobExperiences.map((exp, index) => (
        <div key={index} className="mb-6 p-4 border rounded-md border-gray-300">
          <h3 className="font-semibold mb-2">Job Experience {index + 1}</h3>

          <Controller
            name={`jobExperiences[${index}].companyName`}
            control={control}
            defaultValue={exp.companyName}
            render={({ field }) => (
              <div className="mb-4">
                <label className="block text-gray-700">Company Name</label>
                <input
                  type="text"
                  {...field}
                  onChange={(e) =>
                    handleJobExperienceChange(
                      index,
                      "companyName",
                      e.target.value
                    )
                  }
                  className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                    errors.jobExperiences?.[index]?.companyName
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter company name"
                />
                {errors.jobExperiences?.[index]?.companyName && (
                  <p className="text-red-500 mt-1">
                    {errors.jobExperiences[index].companyName.message}
                  </p>
                )}
              </div>
            )}
          />

          <Controller
            name={`jobExperiences[${index}].position`}
            control={control}
            defaultValue={exp.position}
            render={({ field }) => (
              <div className="mb-4">
                <label className="block text-gray-700">Position</label>
                <input
                  type="text"
                  {...field}
                  onChange={(e) =>
                    handleJobExperienceChange(index, "position", e.target.value)
                  }
                  className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                    errors.jobExperiences?.[index]?.position
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter position"
                />
                {errors.jobExperiences?.[index]?.position && (
                  <p className="text-red-500 mt-1">
                    {errors.jobExperiences[index].position.message}
                  </p>
                )}
              </div>
            )}
          />

          <Controller
            name={`jobExperiences[${index}].startDate`}
            control={control}
            defaultValue={exp.startDate}
            render={({ field }) => (
              <div className="mb-4">
                <label className="block text-gray-700">Start Date</label>
                <input
                  type="date"
                  {...field}
                  onChange={(e) =>
                    handleJobExperienceChange(
                      index,
                      "startDate",
                      e.target.value
                    )
                  }
                  className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                    errors.jobExperiences?.[index]?.startDate
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.jobExperiences?.[index]?.startDate && (
                  <p className="text-red-500 mt-1">
                    {errors.jobExperiences[index].startDate.message}
                  </p>
                )}
              </div>
            )}
          />

          <div className="mb-4 flex items-center">
            <Controller
              name={`jobExperiences[${index}].untilNow`}
              control={control}
              defaultValue={exp.untilNow}
              render={({ field }) => (
                <input
                  type="checkbox"
                  {...field}
                  onChange={(e) => {
                    handleJobExperienceChange(
                      index,
                      "untilNow",
                      e.target.checked
                    );
                    if (e.target.checked) {
                      handleJobExperienceChange(index, "endDate", ""); // Reset endDate when checked
                    }
                  }}
                  className="mr-2"
                />
              )}
            />
            <label className="text-gray-700">Currently working here</label>
          </div>

          <Controller
            name={`jobExperiences[${index}].endDate`}
            control={control}
            defaultValue={exp.endDate}
            render={({ field }) => (
              <div className="mb-4">
                <label className="block text-gray-700">End Date</label>
                <input
                  type="date"
                  {...field}
                  onChange={(e) =>
                    handleJobExperienceChange(index, "endDate", e.target.value)
                  }
                  disabled={exp.untilNow} // Disable if currently working
                  className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                    errors.jobExperiences?.[index]?.endDate
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.jobExperiences?.[index]?.endDate && (
                  <p className="text-red-500 mt-1">
                    {errors.jobExperiences[index].endDate.message}
                  </p>
                )}
              </div>
            )}
          />

          <Controller
            name={`jobExperiences[${index}].summary`}
            control={control}
            defaultValue={exp.summary}
            render={({ field }) => (
              <div className="mb-4">
                <label className="block text-gray-700">Summary</label>
                <textarea
                  {...field}
                  onChange={(e) =>
                    handleJobExperienceChange(index, "summary", e.target.value)
                  }
                  className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                    errors.jobExperiences?.[index]?.summary
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter summary of your responsibilities"
                  rows={3}
                />
                {errors.jobExperiences?.[index]?.summary && (
                  <p className="text-red-500 mt-1">
                    {errors.jobExperiences[index].summary.message}
                  </p>
                )}
              </div>
            )}
          />

          <button
            type="button"
            onClick={() => handleRemoveJobExperience(index)}
            className="text-red-500"
          >
            Remove Job Experience
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddJobExperience}
        className="py-2 px-4 border border-brand-200 text-brand-200 rounded-md hover:border-brand-600 hover:text-white transition duration-300"
      >
        Add Job Experience
      </button>
    </>
  );
};

export default WorkExperience;
