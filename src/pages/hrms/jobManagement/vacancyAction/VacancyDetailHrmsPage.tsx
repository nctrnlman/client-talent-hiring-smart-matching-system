import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Row, Col, Divider, Tag, message, Space } from "antd";
import vacanciesService from "../../../../services/vacanciesService";

const VacancyDetailHrmsPage: React.FC = () => {
  const { vacancyId } = useParams();
  const navigate = useNavigate();
  const [vacancyDetails, setVacancyDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchVacancyDetails = async () => {
      try {
        const response = await vacanciesService.getVacancyDetail(vacancyId);
        setVacancyDetails(response.data);
        setLoading(false);
      } catch (error) {
        message.error("Failed to fetch vacancy details");
        setLoading(false);
      }
    };

    if (vacancyId) {
      fetchVacancyDetails();
    }
  }, [vacancyId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <Card title="Vacancy Details" bordered={false}>
        {vacancyDetails && (
          <>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <strong>Vacancy Name:</strong> {vacancyDetails.vacancyName}
              </Col>
              <Col span={12}>
                <strong>Job Position:</strong> {vacancyDetails.jobPosition}
              </Col>
              <Col span={12}>
                <strong>Job Level:</strong> {vacancyDetails.jobLevel.name}
              </Col>
              <Col span={12}>
                <strong>Employment Status:</strong>{" "}
                {vacancyDetails.employmentStatus.name}
              </Col>
              <Col span={12}>
                <strong>Vacancy Status:</strong>{" "}
                <Tag
                  color={
                    vacancyDetails.vacancyStatus === "Open" ? "green" : "red"
                  }
                >
                  {vacancyDetails.vacancyStatus}
                </Tag>
              </Col>
            </Row>

            <Divider />

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <strong>Responsibilities:</strong>{" "}
                {vacancyDetails.responsibilities}
              </Col>
              <Col span={12}>
                <strong>Gender Preference:</strong>{" "}
                {vacancyDetails.gender || "Not Specified"}
              </Col>
              <Col span={12}>
                <strong>Minimum Age:</strong> {vacancyDetails.minAge}
              </Col>
              <Col span={12}>
                <strong>Maximum Age:</strong> {vacancyDetails.maxAge}
              </Col>
              <Col span={12}>
                <strong>Minimum Experience:</strong>{" "}
                {vacancyDetails.minYearExperience} years
              </Col>
              <Col span={12}>
                <strong>Minimum Education Level:</strong>{" "}
                {vacancyDetails.minEducationLevel.name}
              </Col>
            </Row>

            <Divider />

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <strong>Employer Name:</strong>{" "}
                {vacancyDetails.employer.fullname}
              </Col>
              <Col span={12}>
                <strong>Company Name:</strong>{" "}
                {vacancyDetails.employer.companyName}
              </Col>
              <Col span={12}>
                <strong>Employer Email:</strong> {vacancyDetails.employer.email}
              </Col>
              <Col span={12}>
                <strong>Employer Phone Number:</strong>{" "}
                {vacancyDetails.employer.phoneNumber}
              </Col>
            </Row>

            <Divider />

            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={12} lg={12}>
                <strong>Hard Skills:</strong>
                <div style={{ marginTop: 8 }}>
                  {vacancyDetails.hardSkills.length > 0 ? (
                    <Space wrap>
                      {vacancyDetails.hardSkills.map((skill: any) => (
                        <Tag key={skill.id} color="blue">
                          {skill.name}
                        </Tag>
                      ))}
                    </Space>
                  ) : (
                    <span>No hard skills listed.</span>
                  )}
                </div>
              </Col>

              <Col xs={24} sm={12} md={12} lg={12}>
                <strong>Soft Skills:</strong>
                <div style={{ marginTop: 8 }}>
                  {vacancyDetails.softSkills.length > 0 ? (
                    <Space wrap>
                      {vacancyDetails.softSkills.map((skill: any) => (
                        <Tag key={skill.id} color="green">
                          {skill.name}
                        </Tag>
                      ))}
                    </Space>
                  ) : (
                    <span>No soft skills listed.</span>
                  )}
                </div>
              </Col>
            </Row>

            <Divider />

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <strong>Created At:</strong>{" "}
                {new Date(vacancyDetails.createdAt).toLocaleString()}
              </Col>
              <Col span={12}>
                <strong>Last Updated:</strong>{" "}
                {new Date(vacancyDetails.updatedAt).toLocaleString()}
              </Col>
            </Row>

            <Divider />

            <div className="mt-4">
              <button
                className="w-full py-2 mt-4 bg-brand-500 text-white rounded-lg font-semibold text-lg shadow-md hover:bg-blue-700 transition-all duration-300"
                onClick={() => navigate("/hrms/job-management")}
              >
                Back to Job Management
              </button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default VacancyDetailHrmsPage;
