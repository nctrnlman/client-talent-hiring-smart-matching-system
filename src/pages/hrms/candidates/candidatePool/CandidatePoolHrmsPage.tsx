// src/pages/CandidatePoolHrmsPage.tsx
import React, { useEffect, useState } from "react";
import { Table, message, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { Candidate } from "../../../../dto/candidate";
import candidatesService from "../../../../services/candidatesService";

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
          onClick={() => navigate(`/hrms/candidates/${record.id}`)}
        >
          View Detail
        </Button>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Candidate Pool</h2>
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
