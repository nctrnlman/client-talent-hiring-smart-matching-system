import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Typography, message, Tag, Space } from "antd";
import { useParams } from "react-router-dom";
import { VacancyDetail } from "../../../dto/vacancy";
import vacanciesService from "../../../services/vacanciesService"; // Import your service to fetch vacancy details
import applicantService from "../../../services/applicantService";
import {
  LaptopOutlined,
  CalendarOutlined,
  FileTextOutlined,
  TeamOutlined,
} from "@ant-design/icons"; // Importing icons
import { toast } from "react-toastify";

const { Title, Text } = Typography;

const VacancyDetailCareerPage: React.FC = () => {
  const { vacancyId } = useParams(); // Get vacancyId from URL
  const [vacancy, setVacancy] = useState<VacancyDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchVacancyDetail = async () => {
      try {
        const response = await vacanciesService.getVacancyDetail(vacancyId); // Fetch data using the service
        setVacancy(response.data);
      } catch (error) {
        message.error("Failed to load vacancy details");
        console.error("Error fetching vacancy detail:", error);
      } finally {
        setLoading(false);
      }
    };

    if (vacancyId) {
      fetchVacancyDetail();
    }
  }, [vacancyId]);

  const handleApply = async () => {
    try {
      await applicantService.applyForVacancy({
        vacancyId: Number(vacancyId),
      });
      toast.success("Successfully applied for the job!");
    } catch (error) {
      toast.error("Failed to apply for the job.");
      console.error("Error applying for the job:", error);
    }
  };

  if (loading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "50px" }}
      >
        <Text>Loading...</Text>
      </div>
    );
  }

  if (!vacancy) {
    return <div>No vacancy found</div>;
  }

  return (
    <div style={{ padding: "30px", maxWidth: "1200px", margin: "auto" }}>
      <Title level={2} style={{ fontWeight: 600 }}>
        {vacancy.vacancyName}
      </Title>
      <Text
        type="secondary"
        style={{ fontSize: "18px", display: "block", marginBottom: "20px" }}
      >
        {vacancy.jobPosition}
      </Text>

      <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
        <Col xs={24} md={12}>
          <Card
            title="Job Level"
            bordered={false}
            style={{
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Text style={{ fontSize: "16px" }}>{vacancy.jobLevel.name}</Text>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card
            title="Employment Status"
            bordered={false}
            style={{
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Text style={{ fontSize: "16px" }}>
              {vacancy.employmentStatus.name}
            </Text>
          </Card>
        </Col>
      </Row>

      <div style={{ marginBottom: "20px" }}>
        <Title level={4} style={{ fontWeight: 500 }}>
          <FileTextOutlined style={{ marginRight: "8px" }} />
          Responsibilities
        </Title>

        <Card
          style={{
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Text>{vacancy.responsibilities}</Text>
        </Card>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <Title level={4} style={{ fontWeight: 500 }}>
          <CalendarOutlined style={{ marginRight: "8px" }} />
          Job Requirements
        </Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Card
              title="Minimum Age"
              bordered={false}
              style={{
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Text>{vacancy.minAge} years</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card
              title="Maximum Age"
              bordered={false}
              style={{
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Text>{vacancy.maxAge} years</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card
              title="Minimum Experience"
              bordered={false}
              style={{
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Text>{vacancy.minYearExperience} years</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card
              title="Minimum Education Level"
              bordered={false}
              style={{
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Text>{vacancy.minEducationLevel.name}</Text>
            </Card>
          </Col>
        </Row>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <Title level={4} style={{ fontWeight: 500 }}>
          <TeamOutlined style={{ marginRight: "8px" }} />
          Employer Information
        </Title>
        <Card
          style={{
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Text strong>Company: </Text>
          <Text>{vacancy.employer.companyName}</Text>
          <br />
          <Text strong>Contact: </Text>
          <Text>{vacancy.employer.phoneNumber}</Text>
          <br />
          <Text strong>Email: </Text>
          <Text>{vacancy.employer.email}</Text>
        </Card>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <Title level={4} style={{ fontWeight: 500 }}>
          Skills Required
        </Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Card
              title="Hard Skills"
              bordered={false}
              style={{
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              {vacancy.hardSkills.map((skill) => (
                <Tag
                  color="blue"
                  key={skill.id}
                  style={{ marginBottom: "8px" }}
                >
                  {skill.name}
                </Tag>
              ))}
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card
              title="Soft Skills"
              bordered={false}
              style={{
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              {vacancy.softSkills.map((skill) => (
                <Tag
                  color="green"
                  key={skill.id}
                  style={{ marginBottom: "8px" }}
                >
                  {skill.name}
                </Tag>
              ))}
            </Card>
          </Col>
        </Row>
      </div>

      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <Button
          type="primary"
          size="large"
          onClick={handleApply}
          style={{
            borderRadius: "8px",
            padding: "10px 30px",
            fontSize: "16px",
            backgroundColor: "#4318FF",
            borderColor: "#4318FF",
            transition: "all 0.3s ease",
          }}
          className="bg-blueSecondary"
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#4318FF")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#4318FF")
          }
        >
          Apply for this Job
        </Button>
      </div>
    </div>
  );
};

export default VacancyDetailCareerPage;
