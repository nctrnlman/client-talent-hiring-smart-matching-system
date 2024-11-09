import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Spin, Typography, message } from "antd";
import { VacancyDetail } from "../../../dto/vacancy"; // Import VacancyDetail type
import vacanciesService from "../../../services/vacanciesService"; // Import your service to fetch vacancies
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

const VacancyCareerPage: React.FC = () => {
  const [vacancies, setVacancies] = useState<VacancyDetail[]>([]); // To hold fetched vacancies
  const [loading, setLoading] = useState<boolean>(false); // To show loading state
  const [error, setError] = useState<string | null>(null); // To hold error message

  // Function to fetch vacancies
  const fetchVacancies = async () => {
    setLoading(true); // Set loading state to true
    setError(null); // Clear any previous errors
    try {
      const response = await vacanciesService.getVacancies(); // Fetch vacancies
      setVacancies(response.data); // Set vacancies data into state
    } catch (err) {
      setError("Failed to fetch vacancies. Please try again."); // Handle error
      message.error("Failed to fetch vacancies.");
    } finally {
      setLoading(false); // Set loading state to false after fetching is complete
    }
  };

  // Fetch vacancies on component mount
  useEffect(() => {
    fetchVacancies();
  }, []);

  return (
    <div style={{ padding: "24px" }}>
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <Title level={2} style={{ textAlign: "center" }}>
          Job Vacancies
        </Title>
        <Text
          style={{
            fontSize: "16px",
            color: "#555",
            textAlign: "center",
            display: "block",
          }}
        >
          Find various career opportunities that match your skills and
          interests.
        </Text>
      </div>

      {/* Error message */}
      {error && (
        <div style={{ marginBottom: "16px", textAlign: "center" }}>
          <Text type="danger">{error}</Text>
        </div>
      )}

      {/* Loading spinner */}
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        // Display vacancies in a grid layout
        <Row gutter={16} justify="center">
          {vacancies.map((vacancy) => (
            <Col xs={24} sm={12} md={8} lg={6} key={vacancy.id}>
              <Card
                hoverable
                cover={
                  <div
                    style={{
                      height: "150px",
                      backgroundColor: "#f0f2f5",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text strong>{vacancy.vacancyName}</Text>
                  </div>
                }
                style={{ borderRadius: "12px", marginBottom: "24px" }}
              >
                <Title level={4}>{vacancy.jobPosition}</Title>
                <Text type="secondary" style={{ fontSize: "14px" }}>
                  <strong>Responsibilities:</strong>{" "}
                  {vacancy.responsibilities || "Not Available"}
                </Text>
                <div style={{ marginTop: "12px" }}>
                  <Text strong>Job Level: </Text>
                  <Text>{vacancy.jobLevel?.name || "N/A"}</Text>
                </div>
                <div style={{ marginTop: "10px" }}>
                  {/* <Text strong>Status: </Text> */}
                  <Text
                    style={{
                      display: "inline-block",
                      backgroundColor:
                        vacancy.vacancyStatus === "Open"
                          ? "#52c41a"
                          : "#f5222d",
                      color: "white",
                      padding: "5px 15px",
                      borderRadius: "20px",
                      fontWeight: "bold",
                      cursor: "default",
                    }}
                  >
                    {vacancy.vacancyStatus}
                  </Text>
                </div>
                <div style={{ marginTop: "16px" }}>
                  <Link to={`/career/vacancy/${vacancy.id}`}>
                    <Button
                      type="primary"
                      block
                      size="large"
                      style={{
                        backgroundColor: "#4318FF",
                        borderColor: "#4318FF",
                        borderRadius: "8px",
                      }}
                    >
                      See Detail
                    </Button>
                  </Link>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default VacancyCareerPage;
