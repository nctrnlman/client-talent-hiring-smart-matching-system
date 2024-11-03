import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PersonalInfo from "./sections/PersonalInfo";
import WorkExperience from "./sections/WorkExperience";
import SocialMedia from "./sections/SocialMedia";
import Account from "./sections/Account";
import authService from "../../../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";

// Skema validasi dengan Yup
const schema = Yup.object().shape({
  fullname: Yup.string().required("Full name is required"),
  birthOfDate: Yup.string().required("Date of birth is required"),
  address: Yup.string().required("Address is required"),
  gender: Yup.string().required("Gender is required"),
  summary: Yup.string().required("Summary is required"),
  cv: Yup.string().url("Invalid URL format").required("CV link is required"),
  job: Yup.string().required("Job title is required"),
  yearOfExperience: Yup.number().required("Years of experience is required"),
  jobExperiences: Yup.array().optional(),
  instagram: Yup.string().optional(),
  twitter: Yup.string().optional(),
  linkedin: Yup.string().optional(),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must be numeric")
    .required("Phone number is required"),
});

const RegisterCandidatePage: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const [activeTab, setActiveTab] = useState<string>("personalInfo");
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      const dataWithRole = {
        ...data,
        role: "CANDIDATE",
      };

      const response = await authService.register(dataWithRole);
      toast.success(response.message);
      console.log("Registration successful:", response);
      navigate("/login");
    } catch (error: any) {
      toast.error(error.message);
      console.error("Registration error:", error.message);
    }
  };

  const handleTabChange = async (tab: string) => {
    if (tab === getPreviousTab(activeTab)) {
      setActiveTab(tab);
      return;
    }

    const fieldsToValidate = getFieldsToValidate(activeTab);
    const result = await trigger(fieldsToValidate);

    if (result) {
      setActiveTab(tab);
    }
  };

  const getPreviousTab = (activeTab: string): string => {
    switch (activeTab) {
      case "workExperience":
        return "personalInfo";
      case "socialMedia":
        return "workExperience";
      case "account":
        return "socialMedia";
      default:
        return "personalInfo";
    }
  };

  const getNextTab = (activeTab: string): string => {
    switch (activeTab) {
      case "personalInfo":
        return "workExperience";
      case "workExperience":
        return "socialMedia";
      case "socialMedia":
        return "account";
      default:
        return "personalInfo";
    }
  };

  const getFieldsToValidate = (tab: string): string[] => {
    switch (tab) {
      case "personalInfo":
        return [
          "fullname",
          "birthOfDate",
          "address",
          "gender",
          "summary",
          "cv",
          "phoneNumber",
        ];
      case "workExperience":
        return ["job", "yearOfExperience", "jobExperience"];
      case "socialMedia":
        return ["instagram", "twitter", "linkedin"];
      case "account":
        return ["email", "password", "confirmPassword"];
      default:
        return [];
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Background Circles */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-purple-300 rounded-full opacity-30 blur-2xl"></div>
      <div className="absolute top-1/2 right-10 w-72 h-72 bg-indigo-300 rounded-full opacity-30 blur-2xl"></div>
      <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-brand-200 rounded-full opacity-30 blur-2xl"></div>

      <div className="max-w-screen-lg w-11/12 md:w-2/3 bg-white bg-opacity-50 backdrop-blur-lg shadow-lg rounded-2xl p-4 z-10 my-5">
        <div className="flex items-center justify-center mb-4">
          <FaInfoCircle className="text-5xl text-brand-200 mr-3" />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Welcome to Our Job Portal
            </h2>
            <p className="text-gray-600">
              By registering as a candidate, you will gain access to a variety
              of job opportunities that match your skills and preferences.
              Complete your profile to get started!
            </p>
          </div>
        </div>
      </div>

      {/* Informational Section */}
      <div className="max-w-screen-lg w-11/12 md:w-2/3 bg-white bg-opacity-50 backdrop-blur-lg shadow-lg rounded-2xl p-4 z-10">
        {/* <h2 className="text-3xl font-bold mb-6 text-center text-brand-600 mt-6">
          Register Candidate
        </h2>
        <p className="text-center mb-4">
          Join us to kickstart your career journey. Fill out the form below to
          create your candidate account.
        </p> */}

        {/* Tab Navigation */}
        <div className="flex space-x-2 mb-4 px-4">
          {["personalInfo", "workExperience", "socialMedia", "account"].map(
            (tab) => (
              <button
                key={tab}
                className={`flex-1 py-2 font-semibold transition-colors duration-300 rounded-lg ${
                  activeTab === tab
                    ? "bg-brand-200 text-white"
                    : "bg-white text-brand-200 border border-brand-300"
                } hover:bg-brand-500 hover:text-white`}
                onClick={() => handleTabChange(tab)}
              >
                {tab
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
              </button>
            )
          )}
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-grow flex flex-col space-y-6 p-4"
        >
          <div className="bg-white p-4 rounded-lg shadow-sm flex-grow">
            {activeTab === "personalInfo" && (
              <PersonalInfo control={control} errors={errors} />
            )}
            {activeTab === "workExperience" && (
              <WorkExperience
                control={control}
                errors={errors}
                setValue={setValue}
              />
            )}
            {activeTab === "socialMedia" && (
              <SocialMedia control={control} errors={errors} />
            )}
            {activeTab === "account" && (
              <Account control={control} errors={errors} />
            )}
          </div>

          <div className="flex justify-between">
            {activeTab !== "personalInfo" && (
              <button
                type="button"
                className="py-2 px-4  border border-brand-200 text-brand-200 rounded-md hover:border-brand-600transition duration-200"
                onClick={() => handleTabChange(getPreviousTab(activeTab))}
              >
                Previous
              </button>
            )}
            {activeTab !== "account" ? (
              <button
                type="button"
                className="py-2 px-4  border border-brand-200 text-brand-200 rounded-md hover:border-brand-600 transition duration-200"
                onClick={() => handleTabChange(getNextTab(activeTab))}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="py-2 px-4 bg-brand-200 text-white rounded-lg hover:bg-brand-600 transition duration-200"
              >
                Register
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterCandidatePage;
