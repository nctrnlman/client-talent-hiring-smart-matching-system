import React, { useEffect, useState } from "react";
import {
  Table,
  message,
  Button,
  Modal,
  Tabs,
  Tag,
  Row,
  Col,
  Card,
  Tooltip,
} from "antd";
import { useNavigate } from "react-router-dom";
import { Applicant } from "../../../../dto/applicant"; // Assuming the Applicant DTO
import applicantService from "../../../../services/applicantService";

import {
  FaArrowRight,
  FaBriefcase,
  FaCheckCircle,
  FaEye,
  FaTimesCircle,
} from "react-icons/fa";
import { getUserSession } from "../../../../services/indexedDBService";

const { TabPane } = Tabs;

const CandidateManagementHrmsPage: React.FC = () => {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState(null); // For storing match details for modal
  const navigate = useNavigate();
  const [isProcessModalVisible, setIsProcessModalVisible] = useState(false);
  const [selectedFlow, setSelectedFlow] = useState("interview"); // Default to "interview"
  const [result, setResult] = useState("");
  const [summary, setSummary] = useState("");
  const [selectedApplicantId, setSelectedApplicantId] = useState<number | null>(
    null
  );

  useEffect(() => {
    const fetchApplicants = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
        const userSession = await getUserSession(token); // Assuming this fetches the user session
        const employerId = userSession.userData.id; // Get employerId from user session

        // Pass both `flow` and `employerId` to the API call
        const response = await applicantService.getApplicants(employerId); // Pass employerId here

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
        };
      case "IN_PROGRESS":
        return {
          backgroundColor: "#FFEB3B",
          padding: "0 5px",
          borderRadius: "5px",
        };
      case "ACCEPTED":
        return {
          backgroundColor: "#C8E6C9",
          padding: "0 5px",
          borderRadius: "5px",
        };
      case "REJECTED":
        return {
          backgroundColor: "#FFCDD2",
          padding: "0 5px",
          borderRadius: "5px",
        };
      case "WITHDRAWN":
        return {
          backgroundColor: "#F3E5F5",
          padding: "0 5px",
          borderRadius: "5px",
        };
      default:
        return {};
    }
  };

  const handleMatchDetailsClick = ({
    matchPercentage,
    matchDetails,
    criteriaChecked,
  }: any) => {
    // Set the modal data with matchPercentage, matchDetails, and criteriaChecked
    setModalData({
      matchPercentage: matchPercentage,
      matchDetails: matchDetails,
      criteriaChecked: criteriaChecked,
    });

    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "No",
      key: "index",
      render: (_: any, _record: Applicant, index: number) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "user",
      key: "user",
      render: (user) => user?.fullname || "N/A",
    },
    {
      title: "Email",
      dataIndex: "user",
      key: "email",
      render: (user) => user?.email || "N/A",
    },
    {
      title: "Job Title",
      dataIndex: "vacancy",
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
      title: "Flow",
      dataIndex: "flow",
      key: "flow",
      render: (flow) => flow || "N/A",
    },
    {
      title: "Match Percentage",
      dataIndex: "matchPercentage",
      key: "matchPercentage",
      render: (matchPercentage, record) => (
        <Button
          type="link"
          onClick={() =>
            handleMatchDetailsClick({
              matchPercentage: matchPercentage,
              matchDetails: record.matchDetails,
              criteriaChecked: record.criteriaChecked,
            })
          }
        >
          {matchPercentage}%
        </Button>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Applicant) => (
        <div className="flex space-x-4">
          {/* View Candidate Button with Icon */}
          <Tooltip title="View Candidate">
            <Button
              type="link"
              icon={<FaEye />}
              onClick={() => navigate(`/hrms/candidates/${record.id}`)} // Navigate to applicant detail page
            />
          </Tooltip>

          {/* View Vacancy Button with Icon */}
          <Tooltip title="View Vacancy">
            <Button
              type="link"
              icon={<FaBriefcase />}
              onClick={() =>
                navigate(`/hrms/vacancy/detail/${record.vacancyId}`)
              } // Navigate to vacancy detail page
            />
          </Tooltip>

          {record.status === "APPLIED" && (
            <Tooltip title="Proceed to Next Process">
              <Button
                type="link"
                icon={<FaArrowRight />}
                onClick={() => {
                  setSelectedApplicantId(record.id); // Store the applicantId
                  setIsProcessModalVisible(true); // Open the modal
                }}
              />
            </Tooltip>
          )}
        </div>
      ),
    },
  ];

  const handleSubmitProcess = async () => {
    if (!selectedFlow) {
      message.error("Please select a flow.");
      return;
    }

    if (!selectedApplicantId) {
      message.error("Applicant ID is missing.");
      return;
    }

    try {
      setLoading(true);
      // Make API call to proceed to the next process with the selected flow
      await applicantService.moveToRecruitmentProcess(
        selectedApplicantId,
        selectedFlow ? selectedFlow.toUpperCase() : ""
      );
      message.success("Successfully moved to the next process.");

      // Close modal and reset form inputs
      setIsProcessModalVisible(false);
      setSelectedFlow("INTERVIEW"); // Reset to default value
      setSelectedApplicantId(null); // Reset applicant ID after submission
    } catch (error) {
      message.error(error.message || "Failed to move to next process.");
    } finally {
      setLoading(false);
    }
  };

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

      <Modal
        title="Match Details"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={[
          <Button key="back" onClick={handleCloseModal}>
            Close
          </Button>,
        ]}
        width={800}
      >
        {modalData && (
          <Tabs defaultActiveKey="1">
            {/* General Match Tab */}
            <TabPane tab="General Match" key="1">
              <Row gutter={[16, 16]}>
                {/* Age */}
                <Col span={12}>
                  <Card title="Age" bordered={false}>
                    {modalData.matchDetails.age ? (
                      <p>
                        Candidate: {modalData.matchDetails.age.candidate}
                        <br />
                        Vacancy: {modalData.matchDetails.age.vacancy}
                        <br />
                        <Tag
                          color={
                            modalData.matchDetails.age.match ? "green" : "red"
                          }
                        >
                          {modalData.matchDetails.age.match
                            ? "Match"
                            : "No Match"}
                        </Tag>
                      </p>
                    ) : (
                      <p>
                        <Tag color="gray">No Data Available</Tag>
                      </p>
                    )}
                  </Card>
                </Col>

                {/* Education */}
                <Col span={12}>
                  <Card title="Education" bordered={false}>
                    {modalData.matchDetails.education ? (
                      <p>
                        Candidate: {modalData.matchDetails.education.candidate}
                        <br />
                        Vacancy: {modalData.matchDetails.education.vacancy}
                        <br />
                        <Tag
                          color={
                            modalData.matchDetails.education.match
                              ? "green"
                              : "red"
                          }
                        >
                          {modalData.matchDetails.education.match
                            ? "Match"
                            : "No Match"}
                        </Tag>
                      </p>
                    ) : (
                      <p>
                        <Tag color="gray">No Data Available</Tag>
                      </p>
                    )}
                  </Card>
                </Col>
              </Row>

              <Row gutter={[16, 16]}>
                {/* Gender */}
                <Col span={12}>
                  <Card title="Gender" bordered={false}>
                    {modalData.matchDetails.gender ? (
                      <p>
                        Candidate: {modalData.matchDetails.gender.candidate}
                        <br />
                        Vacancy: {modalData.matchDetails.gender.vacancy}
                        <br />
                        <Tag
                          color={
                            modalData.matchDetails.gender.match
                              ? "green"
                              : "red"
                          }
                        >
                          {modalData.matchDetails.gender.match
                            ? "Match"
                            : "No Match"}
                        </Tag>
                      </p>
                    ) : (
                      <p>
                        <Tag color="gray">No Data Available</Tag>
                      </p>
                    )}
                  </Card>
                </Col>

                {/* Min. Years of Experience */}
                <Col span={12}>
                  <Card title="Min. Years of Experience" bordered={false}>
                    {modalData.matchDetails.minYearExperience ? (
                      <p>
                        Candidate:{" "}
                        {modalData.matchDetails.minYearExperience.candidate}
                        <br />
                        Vacancy:{" "}
                        {modalData.matchDetails.minYearExperience.vacancy}
                        <br />
                        <Tag
                          color={
                            modalData.matchDetails.minYearExperience.match
                              ? "green"
                              : "red"
                          }
                        >
                          {modalData.matchDetails.minYearExperience.match
                            ? "Match"
                            : "No Match"}
                        </Tag>
                      </p>
                    ) : (
                      <p>
                        <Tag color="gray">No Data Available</Tag>
                      </p>
                    )}
                  </Card>
                </Col>
              </Row>
            </TabPane>

            {/* Skills Match Tab */}
            <TabPane tab="Skills Match" key="2">
              <Row gutter={[16, 16]}>
                {/* Soft Skills */}
                <Col span={12}>
                  <Card title="Soft Skills" bordered={false}>
                    {Array.isArray(
                      modalData.matchDetails.softSkills?.candidate
                    ) &&
                    modalData.matchDetails.softSkills.candidate.length > 0 ? (
                      modalData.matchDetails.softSkills.candidate.map(
                        (skill, index) => (
                          <Tag
                            key={index}
                            color={
                              modalData.matchDetails.softSkills.vacancy?.includes(
                                skill
                              )
                                ? "green"
                                : "red"
                            }
                          >
                            {skill} -{" "}
                            {modalData.matchDetails.softSkills.vacancy?.includes(
                              skill
                            )
                              ? "Match"
                              : "No Match"}
                          </Tag>
                        )
                      )
                    ) : (
                      <p>
                        <Tag color="gray">No Data Available</Tag>
                      </p>
                    )}
                  </Card>
                </Col>

                {/* Hard Skills */}
                <Col span={12}>
                  <Card title="Hard Skills" bordered={false}>
                    {Array.isArray(
                      modalData.matchDetails.hardSkills?.candidate
                    ) &&
                    modalData.matchDetails.hardSkills.candidate.length > 0 ? (
                      modalData.matchDetails.hardSkills.candidate.map(
                        (skill, index) => (
                          <Tag
                            key={index}
                            color={
                              modalData.matchDetails.hardSkills.vacancy?.includes(
                                skill
                              )
                                ? "green"
                                : "red"
                            }
                          >
                            {skill} -{" "}
                            {modalData.matchDetails.hardSkills.vacancy?.includes(
                              skill
                            )
                              ? "Match"
                              : "No Match"}
                          </Tag>
                        )
                      )
                    ) : (
                      <p>
                        <Tag color="gray">No Data Available</Tag>
                      </p>
                    )}
                  </Card>
                </Col>
              </Row>
            </TabPane>

            {/* Match Summary Tab */}
            <TabPane tab="Match Summary" key="3">
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Card title="Match Summary" bordered={false}>
                    <p className="text-lg mb-4">
                      The match percentage is calculated based on the following
                      criteria that were checked:
                    </p>

                    <ul className="space-y-3">
                      {Array.isArray(modalData.criteriaChecked) &&
                      modalData.criteriaChecked.length > 0 ? (
                        modalData.criteriaChecked.map((criteria, index) => (
                          <li
                            key={index}
                            className="flex items-center text-base text-gray-800"
                          >
                            <FaCheckCircle className="text-green-500 mr-2" />
                            {criteria}
                          </li>
                        ))
                      ) : (
                        <li className="flex items-center text-lg text-red-500">
                          <FaTimesCircle className="mr-2" />
                          No criteria were checked for this candidate
                        </li>
                      )}
                    </ul>

                    <div className="mt-6">
                      <p className="text-xl font-semibold">
                        Match Percentage:
                        <strong
                          className={`ml-2 text-2xl ${
                            parseFloat(modalData.matchPercentage) >= 80
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {modalData.matchPercentage}%
                        </strong>
                      </p>
                    </div>
                  </Card>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        )}
      </Modal>

      <Modal
        title="Proceed to Next Process"
        visible={isProcessModalVisible}
        onCancel={() => setIsProcessModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsProcessModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmitProcess}>
            Submit
          </Button>,
        ]}
      >
        <div>
          {/* Flow - Dropdown Select */}
          <label htmlFor="flow" className="block mt-4">
            Flow
          </label>
          <select
            id="flow"
            value={selectedFlow}
            onChange={(e) => setSelectedFlow(e.target.value)}
            className="w-full p-2 border"
          >
            <option value="INTERVIEW">Interview</option>
            <option value="ONBOARDING">Onboarding</option>
          </select>
        </div>
      </Modal>
    </div>
  );
};

export default CandidateManagementHrmsPage;
