import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import HrmsLayout from "../components/HrmsLayout";
import DashboardHrmsPage from "../pages/hrms/dashboard/DashboardHrmsPage";
import CandidateManagementHrmsPage from "../pages/hrms/candidates/candidateManagement/CandidateManagementHrmsPage";
import InterviewHrmsPage from "../pages/hrms/recruitmentProcess/interview/InterviewHrmsPage";
import OnboardingHrmsPage from "../pages/hrms/recruitmentProcess/onboarding/OnboardingHrmsPage";
import JobManagementHrmsPage from "../pages/hrms/jobManagement/JobManagementHrmsPage";
import DashboardCareerPage from "../pages/career/dashboard/DashboardCareerPage";
import ProfileCareerPage from "../pages/career/profile/ProfileCareerPage";
import VacancyCareerPage from "../pages/career/vacancy/VacancyCareerPage";
import ApplicationCareerPage from "../pages/career/applications/ApplicationCareerPage";
import CareerLayout from "../components/CareerLayout";
import RegisterCandidatePage from "../pages/career/auth/RegisterCandidatePage";
import RegisterEmployerPage from "../pages/hrms/auth/RegisterEmployerPage";
import { AccessControl } from "../utils/AccessControl";
import CandidatePoolHrmsPage from "../pages/hrms/candidates/candidatePool/CandidatePoolHrmsPage";
import CandidateDetailHrmsPage from "../pages/hrms/candidates/candidateDetail/CandidateDetailHrmsPage";
import VacancyFormHrmsPage from "../pages/hrms/jobManagement/vacancyAction/VacancyFormHrmsPage";
import VacancyDetailHrmsPage from "../pages/hrms/jobManagement/vacancyAction/VacancyDetailHrmsPage";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register/candidate" element={<RegisterCandidatePage />} />
      <Route path="/register/employer" element={<RegisterEmployerPage />} />
      <Route
        path="/hrms/dashboard"
        element={
          <AccessControl requiredRole="EMPLOYER">
            <HrmsLayout>
              <DashboardHrmsPage />
            </HrmsLayout>
          </AccessControl>
        }
      />
      <Route
        path="/hrms/job-management"
        element={
          <AccessControl requiredRole="EMPLOYER">
            <HrmsLayout>
              <JobManagementHrmsPage />
            </HrmsLayout>
          </AccessControl>
        }
      />
      <Route
        path="/hrms/vacancy"
        element={
          <AccessControl requiredRole="EMPLOYER">
            <HrmsLayout>
              <VacancyFormHrmsPage />
            </HrmsLayout>
          </AccessControl>
        }
      />
      <Route
        path="/hrms/vacancy/:vacancyId"
        element={
          <AccessControl requiredRole="EMPLOYER">
            <HrmsLayout>
              <VacancyFormHrmsPage />
            </HrmsLayout>
          </AccessControl>
        }
      />
      <Route
        path="/hrms/vacancy/detail/:vacancyId"
        element={
          <AccessControl requiredRole="EMPLOYER">
            <HrmsLayout>
              <VacancyDetailHrmsPage />
            </HrmsLayout>
          </AccessControl>
        }
      />
      <Route
        path="/hrms/candidate-pool"
        element={
          <AccessControl requiredRole="EMPLOYER">
            <HrmsLayout>
              <CandidatePoolHrmsPage />
            </HrmsLayout>
          </AccessControl>
        }
      />
      <Route
        path="/hrms/candidates/:candidateId"
        element={
          <AccessControl requiredRole="EMPLOYER">
            <HrmsLayout>
              <CandidateDetailHrmsPage />
            </HrmsLayout>
          </AccessControl>
        }
      />
      <Route
        path="/hrms/candidate-management"
        element={
          <AccessControl requiredRole="EMPLOYER">
            <HrmsLayout>
              <CandidateManagementHrmsPage />
            </HrmsLayout>
          </AccessControl>
        }
      />
      <Route
        path="/hrms/process/interview"
        element={
          <AccessControl requiredRole="EMPLOYER">
            <HrmsLayout>
              <InterviewHrmsPage />
            </HrmsLayout>
          </AccessControl>
        }
      />
      <Route
        path="/hrms/process/onboarding"
        element={
          <AccessControl requiredRole="EMPLOYER">
            <HrmsLayout>
              <OnboardingHrmsPage />
            </HrmsLayout>
          </AccessControl>
        }
      />
      {/* Rute dengan AccessControl untuk CANDIDATE */}
      <Route
        path="/career/dashboard"
        element={
          <AccessControl requiredRole="CANDIDATE">
            <CareerLayout>
              <DashboardCareerPage />
            </CareerLayout>
          </AccessControl>
        }
      />
      <Route
        path="/career/my-profile"
        element={
          <AccessControl requiredRole="CANDIDATE">
            <CareerLayout>
              <ProfileCareerPage />
            </CareerLayout>
          </AccessControl>
        }
      />
      <Route
        path="/career/vacancy"
        element={
          <AccessControl requiredRole="CANDIDATE">
            <CareerLayout>
              <VacancyCareerPage />
            </CareerLayout>
          </AccessControl>
        }
      />
      <Route
        path="/career/application-status"
        element={
          <AccessControl requiredRole="CANDIDATE">
            <CareerLayout>
              <ApplicationCareerPage />
            </CareerLayout>
          </AccessControl>
        }
      />{" "}
      {/* Catch-all route untuk halaman 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
