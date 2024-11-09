import React, { useEffect, useState } from "react";
import { Table, message, Button } from "antd";
import { useNavigate } from "react-router-dom";
// Assuming you created this service
import { Applicant } from "../../../../dto/applicant"; // Assuming the Applicant DTO
import applicantService from "../../../../services/applicantService";

const CandidateManagementHrmsPage: React.FC = () => {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplicants = async () => {
      setLoading(true);
      try {
        const response = await applicantService.getApplicants();
        if (Array.isArray(response.data)) {
          setApplicants(response.data);
        } else {
          throw new Error("Invalid data structure");
        }
      } catch (error) {
        message.error(error.message || "Failed to load applicants");
      } finally {
        setLoading(false);
      }
    };
    fetchApplicants();
  }, []);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "APPLIED":
        return {
          backgroundColor: "#BBDEFB",
          padding: "0 5px",
          borderRadius: "5px",
        }; // Blue for APPLIED
      case "IN_PROGRESS":
        return {
          backgroundColor: "#FFEB3B",
          padding: "0 5px",
          borderRadius: "5px",
        }; // Yellow for IN_PROGRESS
      case "ACCEPTED":
        return {
          backgroundColor: "#C8E6C9",
          padding: "0 5px",
          borderRadius: "5px",
        }; // Green for ACCEPTED
      case "REJECTED":
        return {
          backgroundColor: "#FFCDD2",
          padding: "0 5px",
          borderRadius: "5px",
        }; // Red for REJECTED
      case "WITHDRAWN":
        return {
          backgroundColor: "#F3E5F5",
          padding: "0 5px",
          borderRadius: "5px",
        }; // Purple for WITHDRAWN
      default:
        return {};
    }
  };

  const columns = [
    {
      title: "No",
      key: "index",
      render: (_: any, _record: Applicant, index: number) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "user", // Assuming user contains full name
      key: "user",
      render: (user) => user?.fullname || "N/A",
    },
    {
      title: "Email",
      dataIndex: "user", // Assuming user contains email
      key: "email",
      render: (user) => user?.email || "N/A",
    },
    {
      title: "Job Title",
      dataIndex: "vacancy", // Assuming vacancy contains name of the job
      key: "vacancyName",
      render: (vacancy) => vacancy?.vacancyName || "N/A",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        return <span style={getStatusStyle(status)}>{status || "N/A"}</span>;
      },
    },
    {
      title: "Application Flow",
      dataIndex: "flow",
      key: "flow",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Applicant) => (
        <Button
          type="link"
          onClick={() => navigate(`/hrms/applicants/${record.id}`)} // Navigate to applicant detail page
        >
          View Detail
        </Button>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="bg-white p-4 rounded-2xl mb-4">
        <h2 className="text-2xl font-bold mb-4">Candidate Management</h2>
        <p className="mb-4 text-gray-700">
          Welcome to the Candidate Management page. Here, you can view and
          manage all applicants who have applied for various job positions
          within the organization. This table provides a comprehensive overview
          of the candidates' information, their application status, job title,
          and the stages of their application process. You can also take actions
          such as viewing candidate details or managing their status by
          selecting the appropriate action buttons.
        </p>
      </div>

      <Table
        columns={columns}
        dataSource={applicants}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default CandidateManagementHrmsPage;
