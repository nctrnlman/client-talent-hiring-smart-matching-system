// src/pages/VacancyForm.tsx

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Button, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import vacanciesService from "../../../../services/vacanciesService";

// Define the schema for validation using Yup
const schema = Yup.object().shape({
  vacancyName: Yup.string().required("Vacancy Name is required"),
  jobPosition: Yup.string().required("Job Position is required"),
  jobLevel: Yup.string().required("Job Level is required"),
  employmentStatus: Yup.string().required("Employment Status is required"),
  vacancyStatus: Yup.string().required("Vacancy Status is required"),
});

const VacancyFormHrmsPage: React.FC = () => {
  const { vacancyId } = useParams(); // Get the vacancyId from the URL
  const navigate = useNavigate();

  // Initialize react-hook-form with validation
  const { control, handleSubmit, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      vacancyName: "",
      jobPosition: "",
      jobLevel: "",
      employmentStatus: "",
      vacancyStatus: "Open", // Default value for vacancy status
    },
  });

  useEffect(() => {
    if (vacancyId) {
      const fetchVacancyDetails = async () => {
        try {
          const vacancyDetail = await vacanciesService.getVacancyDetail(
            vacancyId
          );
          // Set the form fields with the fetched data
          setValue("vacancyName", vacancyDetail.vacancyName);
          setValue("jobPosition", vacancyDetail.jobPosition);
          setValue("jobLevel", vacancyDetail.jobLevel?.name); // Assuming jobLevel has a name
          setValue("employmentStatus", vacancyDetail.employmentStatus?.name); // Assuming employmentStatus has a name
          setValue("vacancyStatus", vacancyDetail.vacancyStatus);
        } catch (error) {
          message.error(error.message || "Failed to fetch vacancy details");
        }
      };
      fetchVacancyDetails();
    }
  }, [vacancyId, setValue]);

  // Handle form submission
  const onSubmit = async (data: any) => {
    try {
      if (vacancyId) {
        // Edit existing vacancy
        await vacanciesService.editVacancy(vacancyId, data);
        message.success("Vacancy updated successfully!");
      } else {
        // Create new vacancy
        await vacanciesService.createVacancy(data);
        message.success("Vacancy created successfully!");
      }
      navigate("/hrms/vacancies"); // Redirect to vacancies list
    } catch (error) {
      message.error(error.message || "An error occurred");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        {vacancyId ? "Edit Vacancy" : "Create Vacancy"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block mb-1">Vacancy Name</label>
          <Controller
            name="vacancyName"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Job Position</label>
          <Controller
            name="jobPosition"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Job Level</label>
          <Controller
            name="jobLevel"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Employment Status</label>
          <Controller
            name="employmentStatus"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Vacancy Status</label>
          <Controller
            name="vacancyStatus"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </div>
        <Button type="primary" htmlType="submit">
          {vacancyId ? "Update Vacancy" : "Create Vacancy"}
        </Button>
      </form>
    </div>
  );
};

export default VacancyFormHrmsPage;
