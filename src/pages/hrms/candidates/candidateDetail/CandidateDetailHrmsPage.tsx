import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Descriptions, Avatar, Button } from "antd";
import {
  LoadingOutlined,
  InstagramOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  GlobalOutlined,
} from "@ant-design/icons"; // Mengimpor ikon dari antd
import { CandidateDetail } from "../../../../dto/candidate";
import candidatesService from "../../../../services/candidatesService";

const CandidateDetailHrmsPage: React.FC = () => {
  const { candidateId } = useParams<{ candidateId: string }>();
  const [candidate, setCandidate] = useState<CandidateDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCandidateDetail = async () => {
      try {
        const response = await candidatesService.getCandidateDetail(
          candidateId
        );
        setCandidate(response.data);
      } catch (error) {
        console.error("Failed to fetch candidate detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidateDetail();
  }, [candidateId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingOutlined style={{ fontSize: 40 }} spin />
      </div>
    );
  }

  if (!candidate) {
    return <p>No candidate found.</p>;
  }

  const getAvatarSrc = () => {
    if (candidate.photoProfile) {
      return candidate.photoProfile;
    }
    return candidate.gender === "male"
      ? "https://cdn-icons-png.flaticon.com/128/3135/3135715.png" // Avatar laki-laki
      : "https://cdn-icons-png.flaticon.com/128/6997/6997662.png"; // Avatar perempuan
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Card>
        <div className="flex items-center space-x-4 mb-4">
          <Avatar src={getAvatarSrc()} size={100} />
          <div>
            <h2 className="text-2xl font-bold">{candidate.fullname}</h2>
            <p className="text-gray-600">{candidate.job}</p>
            <Button
              href={candidate.cv || "#"}
              target="_blank"
              type="primary"
              className="mt-2 bg-blueSecondary"
              disabled={!candidate.cv}
            >
              {candidate.cv ? "View CV" : "CV not available"}
            </Button>
          </div>
        </div>

        <h3 className="text-xl font-bold mt-4 mb-2">Personal Info</h3>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Email">{candidate.email}</Descriptions.Item>
          <Descriptions.Item label="Phone Number">
            {candidate.phoneNumber}
          </Descriptions.Item>
          <Descriptions.Item label="Address">
            {candidate.address}
          </Descriptions.Item>
          <Descriptions.Item label="Gender">
            {candidate.gender}
          </Descriptions.Item>
          <Descriptions.Item label="Year of Experience">
            {candidate.yearOfExperience || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Summary">
            {candidate.summary}
          </Descriptions.Item>
          <Descriptions.Item label="LinkedIn">
            <a
              href={candidate.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinOutlined
                style={{ fontSize: "20px", marginRight: "8px" }}
              />
              {candidate.linkedin || "N/A"}
            </a>
          </Descriptions.Item>
          <Descriptions.Item label="Instagram">
            <a
              href={candidate.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramOutlined
                style={{ fontSize: "20px", marginRight: "8px" }}
              />
              {candidate.instagram || "N/A"}
            </a>
          </Descriptions.Item>
          <Descriptions.Item label="Twitter">
            <a
              href={candidate.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterOutlined
                style={{ fontSize: "20px", marginRight: "8px" }}
              />
              {candidate.twitter || "N/A"}
            </a>
          </Descriptions.Item>
          <Descriptions.Item label="Portfolio">
            <a
              href={candidate.portfolio}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GlobalOutlined
                style={{ fontSize: "20px", marginRight: "8px" }}
              />
              {candidate.portfolio || "N/A"}
            </a>
          </Descriptions.Item>
        </Descriptions>

        <h3 className="text-xl font-bold mt-4 mb-2">Job Experiences</h3>
        {candidate.jobExperiences && candidate.jobExperiences.length > 0 ? (
          candidate.jobExperiences.map((experience, index) => (
            <Card key={index} className="mb-3">
              <h4 className="font-semibold text-lg">
                {experience.companyName || "Company Name"}
              </h4>
              <p>
                <strong>Position:</strong>{" "}
                {experience.position || "Position not provided"}
              </p>
              <p>
                <strong>Summary:</strong>{" "}
                {experience.summary || "Summary not provided"}
              </p>
              <p>
                <strong>Start Date:</strong> {experience.startDate || "N/A"}{" "}
                <br />
                <strong>End Date:</strong>{" "}
                {experience.untilNow ? "Present" : experience.endDate || "N/A"}
              </p>
            </Card>
          ))
        ) : (
          <p>No experience listed.</p>
        )}
      </Card>
    </div>
  );
};

export default CandidateDetailHrmsPage;
