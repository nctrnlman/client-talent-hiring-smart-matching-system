import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { GetCandidateDetailResponse } from "../../../dto/candidate";
import candidatesService from "../../../services/candidatesService";
import masterDataService from "../../../services/masterDataService";
import { getUserSession } from "../../../services/indexedDBService";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  Spin,
  Typography,
  message,
  Switch,
} from "antd";
import moment from "moment";
import { toast } from "react-toastify";

const { Title } = Typography;
const { Option } = Select;

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  fullname: Yup.string().required("Full name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  address: Yup.string().required("Address is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  jobExperiences: Yup.array().of(
    Yup.object().shape({
      companyName: Yup.string().required("Company name is required"),
      position: Yup.string().required("Position is required"),
      startDate: Yup.date().required("Start date is required"),
      summary: Yup.string().required("Summary is required"),
    })
  ),
});

const ProfileCareerPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [educationLevels, setEducationLevels] = useState<any[]>([]);
  const [softSkills, setSoftSkills] = useState<any[]>([]);
  const [hardSkills, setHardSkills] = useState<any[]>([]);
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<GetCandidateDetailResponse>({
    resolver: yupResolver(validationSchema),
  });

  const [jobExperiences, setJobExperiences] = useState<any[]>([]);

  useEffect(() => {
    const fetchCandidateData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const userSession = await getUserSession(token);
        const [candidateData, masterData] = await Promise.all([
          candidatesService.getCandidateDetail(userSession?.userData.id),
          masterDataService.getMasterData([
            "educLevels",
            "softSkills",
            "hardSkills",
          ]),
        ]);

        setEducationLevels(masterData.eduLevels || []);
        setSoftSkills(masterData.softSkills || []);
        setHardSkills(masterData.hardSkills || []);

        setJobExperiences(candidateData.data.jobExperiences || []);

        // Reset form with candidate data
        reset({
          fullname: candidateData.data.fullname,
          email: candidateData.data.email,
          address: candidateData.data.address,
          phoneNumber: candidateData.data.phoneNumber,
          birthOfDate: candidateData.data.birthOfDate
            ? moment(candidateData.data.birthOfDate)
            : undefined,
          job: candidateData.data.job,
          educationLevelId: candidateData.data.educationLevelId,
          softSkills: candidateData.data.softSkills,
          hardSkills: candidateData.data.hardSkills,
          yearOfExperience: candidateData.data.yearOfExperience,
          cv: candidateData.data.cv,
          linkedin: candidateData.data.linkedin,
          instagram: candidateData.data.instagram,
          twitter: candidateData.data.twitter,
          portfolio: candidateData.data.portfolio,
          gender: candidateData.data.gender,
          summary: candidateData.data.summary,
          jobExperiences: candidateData.data.jobExperiences,
        });
      } catch (err) {
        setError(err.message || "Failed to load candidate data.");
      } finally {
        setLoading(false);
      }
    };
    fetchCandidateData();
  }, [reset]);

  const handleAddJobExperience = () => {
    const newExperience = {
      companyName: "",
      position: "",
      startDate: "",
      untilNow: false,
      endDate: "",
      summary: "",
    };
    const updatedExperiences = [...jobExperiences, newExperience];
    setJobExperiences(updatedExperiences);
    setValue("jobExperiences", updatedExperiences); // Update form state
  };

  const handleRemoveJobExperience = (index: number) => {
    const updatedExperiences = jobExperiences.filter((_, i) => i !== index);
    setJobExperiences(updatedExperiences);
    setValue("jobExperiences", updatedExperiences); // Update form state
  };

  const handleJobExperienceChange = (
    index: number,
    field: string,
    value: any
  ) => {
    const updatedExperiences = [...jobExperiences];

    // Periksa apakah field yang diubah adalah startDate atau endDate
    if (field === "startDate" || field === "endDate") {
      // Konversi nilai yang diterima menjadi objek Date
      const date = value ? new Date(value) : null; // jika nilai kosong, set null

      // Periksa apakah objek Date valid
      if (date && !isNaN(date.getTime())) {
        // Memastikan date valid
        // Set tanggal yang sudah diformat (bisa pakai format sesuai kebutuhan)
        updatedExperiences[index][field] = date;
      } else {
        // Jika tidak valid, set null atau bisa ditangani sesuai kebutuhan
        updatedExperiences[index][field] = null;
      }
    } else {
      // Untuk field selain startDate dan endDate
      updatedExperiences[index][field] = value;
    }

    // Update state jobExperiences dan form
    setJobExperiences(updatedExperiences);
    setValue(`jobExperiences[${index}].${field}`, value); // Sinkronisasi dengan form state
  };

  const onSubmit = async (data: GetCandidateDetailResponse) => {
    try {
      if (data.birthOfDate && data.birthOfDate instanceof moment) {
        data.birthOfDate = data.birthOfDate.toDate(); // Konversi ke Date
      }
      console.log("Data submitted for update:", data);
      const token = localStorage.getItem("authToken");
      const userSession = await getUserSession(token);
      const updatedCandidate = await candidatesService.updateCandidate(
        userSession.userData.id,
        data
      );
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  if (loading) return;
  <Spin size="large" />;

  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <Title level={2}>My Profile</Title>
      <Form
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
        style={{ marginTop: "24px" }}
      >
        <Form.Item label="Full Name" required>
          <Controller
            name="fullname"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Full Name" />}
          />
        </Form.Item>

        <Form.Item label="Email" required>
          <Controller
            name="email"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Email" />}
          />
        </Form.Item>

        <Form.Item label="Phone Number" required>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Phone Number" />
            )}
          />
        </Form.Item>

        <Form.Item label="Address" required>
          <Controller
            name="address"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Address" />}
          />
        </Form.Item>

        <Form.Item label="Date of Birth">
          <Controller
            name="birthOfDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                format="YYYY-MM-DD"
                placeholder="Date of Birth"
                onChange={(date) => {
                  // Saat tanggal dipilih, ubah menjadi objek Date
                  field.onChange(date ? date.toDate() : null); // convert moment to Date or null
                }}
              />
            )}
          />
        </Form.Item>

        <Form.Item label="Education Level">
          <Controller
            name="educationLevelId"
            control={control}
            render={({ field }) => (
              <Select {...field} placeholder="Select education level">
                {educationLevels.map((level) => (
                  <Option key={level.id} value={level.id}>
                    {level.name}
                  </Option>
                ))}
              </Select>
            )}
          />
        </Form.Item>

        <Form.Item label="Years of Experience">
          <Controller
            name="yearOfExperience"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Years of Experience"
                type="number"
              />
            )}
          />
        </Form.Item>

        <Form.Item label="Soft Skills">
          <Controller
            name="softSkills"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                mode="multiple"
                placeholder="Select soft skills"
              >
                {softSkills.map((skill) => (
                  <Option key={skill.id} value={skill.id}>
                    {skill.name}
                  </Option>
                ))}
              </Select>
            )}
          />
        </Form.Item>

        <Form.Item label="Hard Skills">
          <Controller
            name="hardSkills"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                mode="multiple"
                placeholder="Select hard skills"
              >
                {hardSkills.map((skill) => (
                  <Option key={skill.id} value={skill.id}>
                    {skill.name}
                  </Option>
                ))}
              </Select>
            )}
          />
        </Form.Item>

        <Form.Item label="Gender">
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Select {...field} placeholder="Select gender">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
              </Select>
            )}
          />
        </Form.Item>

        <Form.Item label="CV URL">
          <Controller
            name="cv"
            control={control}
            render={({ field }) => <Input {...field} placeholder="CV URL" />}
          />
        </Form.Item>

        <Form.Item label="LinkedIn URL">
          <Controller
            name="linkedin"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="LinkedIn URL" />
            )}
          />
        </Form.Item>

        <Form.Item label="Instagram URL">
          <Controller
            name="instagram"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Instagram URL" />
            )}
          />
        </Form.Item>

        <Form.Item label="Twitter URL">
          <Controller
            name="twitter"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Twitter URL" />
            )}
          />
        </Form.Item>

        <Form.Item label="Portfolio URL">
          <Controller
            name="portfolio"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Portfolio URL" />
            )}
          />
        </Form.Item>

        <Form.Item label="Profile Summary">
          <Controller
            name="summary"
            control={control}
            render={({ field }) => (
              <Input.TextArea {...field} placeholder="Profile Summary" />
            )}
          />
        </Form.Item>

        <Form.Item label="Job Title">
          <Controller
            name="job"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Job Title" />}
          />
        </Form.Item>

        <Form.Item label="Years of Experience">
          <Controller
            name="yearOfExperience"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Years of Experience"
                type="number"
              />
            )}
          />
        </Form.Item>

        <h2 className="font-semibold mb-2">Job Experiences</h2>
        {jobExperiences.map((exp, index) => (
          <div
            key={index}
            className="mb-6 p-4 border rounded-md border-gray-300"
          >
            <h3 className="font-semibold mb-2">Job Experience {index + 1}</h3>

            <Form.Item
              label="Company Name"
              help={errors.jobExperiences?.[index]?.companyName?.message}
              validateStatus={
                errors.jobExperiences?.[index]?.companyName ? "error" : ""
              }
            >
              <Controller
                name={`jobExperiences[${index}].companyName`}
                control={control}
                defaultValue={exp.companyName}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Company Name"
                    onChange={(e) =>
                      handleJobExperienceChange(
                        index,
                        "companyName",
                        e.target.value
                      )
                    }
                  />
                )}
              />
            </Form.Item>

            <Form.Item
              label="Position"
              help={errors.jobExperiences?.[index]?.position?.message}
              validateStatus={
                errors.jobExperiences?.[index]?.position ? "error" : ""
              }
            >
              <Controller
                name={`jobExperiences[${index}].position`}
                control={control}
                defaultValue={exp.position}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Position"
                    onChange={(e) =>
                      handleJobExperienceChange(
                        index,
                        "position",
                        e.target.value
                      )
                    }
                  />
                )}
              />
            </Form.Item>

            <Form.Item label="Start Date">
              <Controller
                name={`jobExperiences[${index}].startDate`}
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    format="YYYY-MM-DD"
                    placeholder="Start Date"
                    value={field.value ? moment(field.value) : null} // Pastikan nilai ini adalah objek moment yang valid
                    onChange={(date) => {
                      // Pastikan kita menggunakan moment dan validasi objek Moment
                      const validDate = date ? moment(date) : null; // Convert to Moment object or null
                      if (validDate && validDate.isValid()) {
                        handleJobExperienceChange(
                          index,
                          "startDate",
                          validDate.format("YYYY-MM-DD")
                        );
                      } else {
                        handleJobExperienceChange(index, "startDate", null); // Jika tidak valid, set null
                      }
                    }}
                  />
                )}
              />
            </Form.Item>

            <Form.Item label="End Date">
              <Controller
                name={`jobExperiences[${index}].endDate`}
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    format="YYYY-MM-DD"
                    placeholder="End Date"
                    value={field.value ? moment(field.value) : null} // Pastikan nilai ini adalah objek moment yang valid
                    onChange={(date) => {
                      // Pastikan kita menggunakan moment dan validasi objek Moment
                      const validDate = date ? moment(date) : null; // Convert to Moment object or null
                      if (validDate && validDate.isValid()) {
                        handleJobExperienceChange(
                          index,
                          "endDate",
                          validDate.format("YYYY-MM-DD")
                        );
                      } else {
                        handleJobExperienceChange(index, "endDate", null); // Jika tidak valid, set null
                      }
                    }}
                    disabled={exp.untilNow}
                  />
                )}
              />
            </Form.Item>

            {/* Until Now Switch */}
            <Form.Item label="Until Now">
              <Controller
                name={`jobExperiences[${index}].untilNow`}
                control={control}
                render={({ field }) => (
                  <Switch
                    {...field}
                    onChange={(checked) =>
                      handleJobExperienceChange(index, "untilNow", checked)
                    }
                  />
                )}
              />
            </Form.Item>
            <Form.Item
              label="Summary"
              help={errors.jobExperiences?.[index]?.summary?.message}
              validateStatus={
                errors.jobExperiences?.[index]?.summary ? "error" : ""
              }
            >
              <Controller
                name={`jobExperiences[${index}].summary`}
                control={control}
                defaultValue={exp.summary}
                render={({ field }) => (
                  <Input.TextArea
                    {...field}
                    placeholder="Summary"
                    onChange={(e) =>
                      handleJobExperienceChange(
                        index,
                        "summary",
                        e.target.value
                      )
                    }
                  />
                )}
              />
            </Form.Item>

            <Button
              type="dashed"
              onClick={() => handleRemoveJobExperience(index)}
              block
            >
              Remove this job
            </Button>
          </div>
        ))}
        <Button type="dashed" onClick={handleAddJobExperience} block>
          Add Job Experience
        </Button>

        <Button
          type="primary"
          htmlType="submit"
          className="bg-blueSecondary"
          style={{ marginTop: "20px" }}
        >
          Save Changes
        </Button>
      </Form>
    </div>
  );
};

export default ProfileCareerPage;
