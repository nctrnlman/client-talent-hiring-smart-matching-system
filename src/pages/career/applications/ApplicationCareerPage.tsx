import React, { useEffect, useState } from "react";
import applicantService from "../../../services/applicantService";
import { getUserSession } from "../../../services/indexedDBService";
import {
  Spin,
  Tabs,
  Card,
  Typography,
  Row,
  Col,
  Space,
  Divider,
  Tag,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";

// Available application statuses
const STATUS_OPTIONS = ["APPLIED", "IN_PROGRESS", "ACCEPTED", "REJECTED"];
const STATUS_COLORS = {
  APPLIED: "blue",
  IN_PROGRESS: "orange",
  ACCEPTED: "green",
  REJECTED: "red",
};

const { Title, Text } = Typography;

const ApplicationCareerPage: React.FC = () => {
  const [applicantData, setApplicantData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>("APPLIED");

  // Fetch applicant data based on userId and selected status
  useEffect(() => {
    const fetchApplicantData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        const userSession = await getUserSession(token);
        const data = await applicantService.getApplicants(
          null,
          userSession.userData.id,
          selectedStatus
        ); // Pass employerId here

        setApplicantData(data.data);
      } catch (err) {
        setError("Failed to load applicant data");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicantData();
  }, [selectedStatus]);

  // Handle tab selection
  const handleTabChange = (status: string) => {
    setSelectedStatus(status);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Title level={2} className="text-center text-gray-800 mb-6">
        Application Status
      </Title>
      <Text className="text-lg mb-8 text-center text-gray-600 block">
        Check the status of your job applications here.
      </Text>

      {/* Tab for filtering applications based on status */}
      <Tabs
        defaultActiveKey={selectedStatus}
        onChange={handleTabChange}
        centered
        size="large"
        tabPosition="top"
        tabBarGutter={24}
      >
        {STATUS_OPTIONS.map((status) => (
          <Tabs.TabPane tab={status} key={status}>
            <Row gutter={[16, 16]} justify="center">
              {applicantData.length > 0 ? (
                applicantData.map((application) => (
                  <Col span={24} sm={12} lg={8} key={application.id}>
                    <Card
                      hoverable
                      style={{
                        borderRadius: "8px",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                        marginBottom: "16px",
                      }}
                    >
                      {/* Title */}
                      <Title level={4}>{application.vacancy.vacancyName}</Title>

                      {/* Job Position and Status */}
                      <Text strong className="d-block">
                        Job Position: {application.vacancy.jobPosition}
                      </Text>
                      <Text className="d-block pl-2" type="secondary">
                        <Tag
                          color={STATUS_COLORS[application.status]}
                          style={{
                            fontWeight: "bold",
                            textTransform: "uppercase",
                            fontSize: "14px",
                          }}
                        >
                          {application.status}
                        </Tag>
                      </Text>

                      {/* Divider between the summary and detailed information */}
                      <Divider />

                      {/* Detailed Information */}
                      <Space direction="vertical" size={4} className="mt-4">
                        <Text>
                          <strong>Responsibilities:</strong>{" "}
                          {application.vacancy.responsibilities}
                        </Text>
                        <Text>
                          <strong>Vacancy Status:</strong>{" "}
                          {application.vacancy.vacancyStatus}
                        </Text>
                        <Text>
                          <strong>Age Range:</strong>{" "}
                          {application.vacancy.minAge} -{" "}
                          {application.vacancy.maxAge}
                        </Text>
                        <Text>
                          <strong>Minimum Experience:</strong>{" "}
                          {application.vacancy.minYearExperience} years
                        </Text>
                        <Text>
                          <strong>Required Education:</strong>{" "}
                          {application.vacancy.educationLevelId}
                        </Text>
                      </Space>
                    </Card>
                  </Col>
                ))
              ) : (
                <Col span={24}>
                  <Text className="text-center justify-center flex items-center text-lg text-gray-500">
                    No applications found.
                  </Text>
                </Col>
              )}
            </Row>
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default ApplicationCareerPage;
