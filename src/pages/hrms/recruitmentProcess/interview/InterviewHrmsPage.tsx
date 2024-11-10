import React, { useEffect, useState } from "react";
import {
  Table,
  message,
  Button,
  Modal,
  Tooltip,
  Radio,
  Input,
  Tabs,
  Tag,
  Row,
  Col,
  Card,
} from "antd";
import { useNavigate } from "react-router-dom";
import applicantService from "../../../../services/applicantService";
import {
  FaArrowRight,
  FaBriefcase,
  FaEye,
  FaTimesCircle,
  FaCheckCircle,
} from "react-icons/fa";
import processService from "../../../../services/processService";
import { getUserSession } from "../../../../services/indexedDBService";
import { toast } from "react-toastify";

const { TabPane } = Tabs;
const InterviewHrmsPage: React.FC = () => {
  const [applicants, setApplicants] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isProcessModalVisible, setIsProcessModalVisible] = useState(false);
  const [isRecommendModalVisible, setIsRecommendModalVisible] = useState(false);
  const [selectedFlow, setSelectedFlow] = useState("ONBOARDING");
  const [selectedApplicantId, setSelectedApplicantId] = useState<number | null>(
    null
  );
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [summary, setSummary] = useState<string>(""); // Track summary input
  const navigate = useNavigate();
  const [modalData, setModalData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  // Fetch Applicants based on selected flow
  useEffect(() => {
    const fetchApplicants = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
        const userSession = await getUserSession(token); // Assuming this fetches the user session
        const employerId = userSession.userData.id; // Get employerId from user session

        // Pass both `flow` and `employerId` to the API call

        // Step 4: Once employerId is fetched and delay is done, make the API call for recruitment processes
        const response = await processService.getRecruitmentProcesses(
          "INTERVIEW",
          employerId // Pass employerId here
        );
        if (Array.isArray(response.data)) {
          setApplicants(response.data);
        } else {
          throw new Error("Invalid data structure");
        }
      } catch (error) {
        toast.error(error.message || "Failed to load applicants");
      } finally {
        setLoading(false);
      }
    };
    fetchApplicants();
  }, [selectedFlow]);

  const updateStatus = async (
    result: string,
    processId: number,
    summary: string
  ) => {
    try {
      setLoading(true);
      await processService.updateStatus(processId, result, summary); // Pass summary here
      toast.success(`Status updated to ${status}`);
      // Refresh applicants after status update
      const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
      const userSession = await getUserSession(token); // Assuming this fetches the user session
      const employerId = userSession.userData.id; // Get employerId from user session

      // Pass both `flow` and `employerId` to the API call

      // Step 4: Once employerId is fetched and delay is done, make the API call for recruitment processes
      const response = await processService.getRecruitmentProcesses(
        selectedFlow,
        employerId // Pass employerId here
      );
      if (Array.isArray(response.data)) {
        setApplicants(response.data);
      }
    } catch (error) {
      toast.error(error.message || "Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitRecommendation = async () => {
    if (!recommendation || !selectedApplicantId) {
      message.error("Please select a recommendation.");
      return;
    }
    try {
      setLoading(true);
      await updateStatus(recommendation, selectedApplicantId, summary); // Include summary in the call
      setIsRecommendModalVisible(false);
      setRecommendation(null); // Reset recommendation after submission
      setSummary(""); // Reset summary after submission
    } catch (error) {
      message.error(error.message || "Failed to update recommendation.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitProcess = async () => {
    if (!selectedFlow || !selectedApplicantId) {
      toast.error("Missing flow or applicant ID.");
      return;
    }
    try {
      setLoading(true);
      await applicantService.moveToRecruitmentProcess(
        selectedApplicantId,
        selectedFlow.toUpperCase()
      );
      toast.success("Successfully moved to the next process.");
      setIsProcessModalVisible(false);
      setSelectedFlow("INTERVIEW");
      setSelectedApplicantId(null);
    } catch (error) {
      toast.error(error.message || "Failed to move to next process.");
    } finally {
      setLoading(false);
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
  const columns = [
    {
      title: "No",
      key: "index",
      render: (_: any, _record: any, index: number) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "applicant",
      key: "applicant",
      render: (applicant) => applicant?.user?.fullname || "N/A",
    },
    {
      title: "Job Title",
      dataIndex: "applicant",
      key: "vacancyName",
      render: (applicant) => applicant?.vacancy?.vacancyName || "N/A",
    },
    {
      title: "Flow",
      dataIndex: "applicant",
      key: "flow",
      render: (applicant) => applicant?.flow || "N/A",
    },
    {
      title: "Result",
      dataIndex: "result",
      key: "result",
      render: (result) => result || "N/A",
    },
    {
      title: "Summary",
      dataIndex: "summary",
      key: "summary",
      render: (summary) => summary || "N/A",
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
      render: (_: any, record: any) => (
        <div className="flex space-x-4">
          <Tooltip title="View Candidate">
            <Button
              type="link"
              icon={<FaEye />}
              onClick={() =>
                navigate(`/hrms/candidates/${record.applicant.id}`)
              }
            />
          </Tooltip>
          <Tooltip title="View Vacancy">
            <Button
              type="link"
              icon={<FaBriefcase />}
              onClick={() =>
                navigate(`/hrms/vacancy/detail/${record.applicant.vacancy?.id}`)
              }
            />
          </Tooltip>
          {!record.result ? (
            <Tooltip title="Recommend or Not Recommend">
              <Button
                type="link"
                onClick={() => {
                  setSelectedApplicantId(record.id);
                  setIsRecommendModalVisible(true);
                }}
              >
                Update Result
              </Button>
            </Tooltip>
          ) : record.result === "RECOMMENDED" &&
            record.applicant.flow === "INTERVIEW" ? (
            <Tooltip title="Proceed to Next Process">
              <Button
                type="link"
                icon={<FaArrowRight />}
                onClick={() => {
                  setSelectedApplicantId(record.applicant.id);
                  setIsProcessModalVisible(true);
                }}
              />
            </Tooltip>
          ) : null}
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="bg-white p-4 rounded-2xl mb-4">
        <h2 className="text-2xl font-bold mb-4">Interview List</h2>
        <p className="mb-4 text-gray-700">
          This section displays the list of candidates who have been shortlisted
          for interviews. You can review their application details, track the
          status of their interviews, and manage the next steps in the
          recruitment process. Keep track of each applicant's progress and make
          informed decisions as you move through the hiring process.
        </p>
      </div>

      <Table
        columns={columns}
        dataSource={applicants}
        rowKey="applicant.id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      {/* Modal for "Next Process" */}
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
          <label htmlFor="flow" className="block mt-4">
            Flow
          </label>
          <select
            id="flow"
            value={selectedFlow}
            onChange={(e) => setSelectedFlow(e.target.value)}
            className="w-full p-2 border"
          >
            <option value="ONBOARDING">Onboarding</option>
          </select>
        </div>
      </Modal>

      {/* Modal for "Recommend/Not Recommend" */}
      <Modal
        title="Set Recommendation"
        visible={isRecommendModalVisible}
        onCancel={() => setIsRecommendModalVisible(false)}
        footer={[
          <Button
            key="cancel"
            onClick={() => setIsRecommendModalVisible(false)}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleSubmitRecommendation}
          >
            Submit
          </Button>,
        ]}
      >
        <Radio.Group
          onChange={(e) => setRecommendation(e.target.value)}
          value={recommendation}
        >
          <Radio value="RECOMMENDED" style={{ color: "green" }}>
            Recommended
          </Radio>
          <Radio value="NOT RECOMMENDED" style={{ color: "red" }}>
            Not Recommended
          </Radio>
        </Radio.Group>
        <Input.TextArea
          placeholder="Enter summary of recommendation"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          style={{ marginTop: "1rem" }}
        />
      </Modal>

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
    </div>
  );
};

export default InterviewHrmsPage;
