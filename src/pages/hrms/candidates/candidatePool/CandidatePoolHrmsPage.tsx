// src/pages/CandidatePoolHrmsPage.tsx
import React, { useEffect, useState } from "react";
import { Table, message, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { Candidate } from "../../../../dto/candidate";
import candidatesService from "../../../../services/candidatesService";
import { AiFillEye } from "react-icons/ai";

const CandidatePoolHrmsPage: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      try {
        const response = await candidatesService.getCandidates();
        setCandidates(response.data);
      } catch (error) {
        message.error(error.message || "Failed to load candidates");
      } finally {
        setLoading(false);
      }
    };
    fetchCandidates();
  }, []);

  const columns = [
    {
      title: "No",
      key: "index",
      render: (_: any, _record: Candidate, index: number) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Experience",
      dataIndex: "yearOfExperience",
      key: "yearOfExperience",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Summary",
      dataIndex: "summary",
      key: "summary",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Candidate) => (
        <Button
          type="link"
          icon={<AiFillEye />}
          onClick={() => navigate(`/hrms/candidates/${record.id}`)}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="bg-white p-4 rounded-2xl mb-4">
        <h2 className="text-2xl font-bold mb-4">Candidate Pool</h2>
        <p className="mb-4 text-gray-700">
          Welcome to the Candidate Pool page. This section provides an overview
          of all the candidates who have applied for positions within the
          organization. Here, you can track the status of their applications,
          review their qualifications, and manage their progress through the
          recruitment pipeline. You can take actions such as viewing detailed
          candidate profiles, updating their application status, or moving them
          through different stages of the hiring process.
        </p>
      </div>

      <Table
        columns={columns}
        dataSource={candidates}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default CandidatePoolHrmsPage;
