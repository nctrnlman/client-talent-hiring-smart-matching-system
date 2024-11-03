// src/pages/JobManagementHrmsPage.tsx
import React, { useEffect, useState } from "react";
import { Table, message, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { AiFillEye } from "react-icons/ai";
import vacanciesService from "../../../services/vacanciesService";
import { GetVacanciesResponse, VacancyDetail } from "../../../dto/vacancy";
import { FaPlus } from "react-icons/fa";

const JobManagementHrmsPage: React.FC = () => {
  const [vacancies, setVacancies] = useState<VacancyDetail[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVacancies = async () => {
      setLoading(true);
      try {
        const response: GetVacanciesResponse =
          await vacanciesService.getVacancies();
        setVacancies(response.data);
      } catch (error) {
        message.error(error.message || "Failed to load vacancies");
      } finally {
        setLoading(false);
      }
    };
    fetchVacancies();
  }, []);

  const columns = [
    {
      title: "No",
      key: "index",
      render: (_: any, __: VacancyDetail, index: number) => index + 1,
    },
    {
      title: "Vacancy Name",
      dataIndex: "vacancyName",
      key: "vacancyName",
    },
    {
      title: "Job Position",
      dataIndex: "jobPosition",
      key: "jobPosition",
    },
    {
      title: "Job Level",
      dataIndex: "jobLevel",
      key: "jobLevel",
      render: (jobLevel) => jobLevel?.name || "N/A",
    },
    {
      title: "Employment Status",
      dataIndex: "employmentStatus",
      key: "employmentStatus",
      render: (employmentStatus) => employmentStatus?.name || "N/A",
    },
    {
      title: "Vacancy Status",
      dataIndex: "vacancyStatus",
      key: "vacancyStatus",
      render: (vacancyStatus) => (
        <Button
          style={{
            backgroundColor: vacancyStatus === "Open" ? "green" : "red",
            color: "white",
            border: "none",
            borderRadius: "20px",
            padding: "5px 10px",
            cursor: "default",
          }}
          disabled
        >
          {vacancyStatus}
        </Button>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: VacancyDetail) => (
        <div>
          <Button
            type="link"
            icon={<AiFillEye />}
            onClick={() => navigate(`/hrms/vacancies/${record.id}`)}
          >
            View
          </Button>
          <Button
            type="link"
            icon={<FiEdit />}
            onClick={() => navigate(`/hrms/vacancies/edit/${record.id}`)}
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-2">
      <div className="bg-white p-4 rounded-2xl mb-4">
        <h2 className="text-2xl font-bold mb-4">Job Management</h2>
        <p className="mb-4 text-gray-700">
          Welcome to the Job Management page. Here, you can view and manage job
          vacancies within the organization. This table provides an overview of
          all available positions, their status, and key details. You can also
          view or edit individual job listings by selecting the appropriate
          action buttons.
        </p>
      </div>
      <Button
        type="primary"
        icon={<FaPlus />}
        onClick={() => navigate("/hrms/vacancy")}
        style={{ marginBottom: "20px" }}
        className="bg-blueSecondary py-4"
      >
        Create Vacancy
      </Button>
      <Table
        columns={columns}
        dataSource={vacancies}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default JobManagementHrmsPage;
