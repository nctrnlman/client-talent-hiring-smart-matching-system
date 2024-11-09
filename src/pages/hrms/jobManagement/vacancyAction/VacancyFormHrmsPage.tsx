import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, message, Select, Row, Col, Card, Form } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import vacanciesService from "../../../../services/vacanciesService";
import masterDataService from "../../../../services/masterDataService";
import { getUserSession } from "../../../../services/indexedDBService";
import { toast } from "react-toastify";

// Schema for validation
const schema = Yup.object().shape({
  vacancyName: Yup.string().required("Vacancy Name is required"),
  jobPosition: Yup.string().required("Job Position is required"),
  jobLevelId: Yup.string().required("Job Level is required"),
  employmentStatusId: Yup.string().required("Employment Status is required"),
  vacancyStatus: Yup.string().required("Vacancy Status is required"),
  responsibilities: Yup.string().required("Responsibilities are required"),
  gender: Yup.string().nullable(),
  minAge: Yup.number().required("Minimum Age is required").min(18),
  maxAge: Yup.number()
    .required("Maximum Age is required")
    .min(Yup.ref("minAge")),
  minYearExperience: Yup.number()
    .required("Minimum Experience is required")
    .min(0),
  minEducationLevelId: Yup.string().required(
    "Minimum Education Level is required"
  ),

  softSkills: Yup.array().of(Yup.string()).required("Soft Skills are required"),
  hardSkills: Yup.array().of(Yup.string()).required("Hard Skills are required"),
});

const VacancyFormHrmsPage: React.FC = () => {
  const { vacancyId } = useParams();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      vacancyName: "",
      jobPosition: "",
      jobLevelId: "",
      employmentStatusId: "",
      vacancyStatus: "Open",
      responsibilities: "",
      gender: "",
      minAge: 18,
      maxAge: "",
      minYearExperience: 0,
      minEducationLevelId: "",
      softSkills: [],
      hardSkills: [],
    },
  });

  const [jobLevels, setJobLevels] = useState([]);
  const [employmentStatuses, setEmploymentStatuses] = useState([]);
  const [softSkills, setSoftSkills] = useState([]);
  const [hardSkills, setHardSkills] = useState([]);
  const [educLevels, setEducLevels] = useState([]);

  useEffect(() => {
    const fetchMasterData = async () => {
      try {
        const data = await masterDataService.getMasterData([
          "jobLevels",
          "employmentStatuses",
          "softSkills",
          "hardSkills",
          "educLevels",
        ]);
        setJobLevels(data.jobLevels || []);
        setEmploymentStatuses(data.employmentStatuses || []);
        setSoftSkills(data.softSkills || []);
        setHardSkills(data.hardSkills || []);
        setEducLevels(data.eduLevels || []);
      } catch (error) {
        message.error("Failed to load master data");
      }
    };

    fetchMasterData();
  }, []);

  useEffect(() => {
    if (vacancyId) {
      const fetchVacancyDetails = async () => {
        try {
          const vacancyDetail = await vacanciesService.getVacancyDetail(
            vacancyId
          );
          setValue("vacancyName", vacancyDetail.data.vacancyName);
          setValue("jobPosition", vacancyDetail.data.jobPosition);
          setValue("jobLevelId", vacancyDetail.data.jobLevelId);
          setValue("employmentStatusId", vacancyDetail.data.employmentStatusId);
          setValue("vacancyStatus", vacancyDetail.data.vacancyStatus);
          setValue("responsibilities", vacancyDetail.data.responsibilities);
          setValue("gender", vacancyDetail.data.gender);
          setValue("minAge", vacancyDetail.data.minAge);
          setValue("maxAge", vacancyDetail.data.maxAge);
          setValue("minYearExperience", vacancyDetail.data.minYearExperience);
          setValue(
            "minEducationLevelId",
            vacancyDetail.data.minEducationLevelId
          );
          setValue(
            "softSkills",
            vacancyDetail.data.softSkills?.map((skill) => skill.id) || []
          );
          setValue(
            "hardSkills",
            vacancyDetail.data.hardSkills?.map((skill) => skill.id) || []
          );
        } catch (error) {
          message.error("Failed to fetch vacancy details");
        }
      };
      fetchVacancyDetails();
    }
  }, [vacancyId, setValue]);

  const onSubmit = async (data: any) => {
    try {
      const token = localStorage.getItem("authToken");
      const userSession = await getUserSession(token);

      if (vacancyId) {
        const updatedData = {
          ...data,
          employerId: userSession?.userData.id, // Menambahkan employerId
        };
        await vacanciesService.editVacancy(vacancyId, updatedData);
        toast.success("Vacancy updated successfully!");
      } else {
        // Menambahkan employerId ke data yang akan dikirim
        const updatedData = {
          ...data,
          employerId: userSession?.userData.id, // Menambahkan employerId
        };
        toast.success("Vacancy created successfully!");
        // Membuat vacancy dengan data yang telah diperbarui
        await vacanciesService.createVacancy(updatedData);
      }
      navigate("/hrms/job-management");
    } catch (error) {
      message.error("An error occurred");
    }
  };

  return (
    <div className="p-4">
      <Card
        title={vacancyId ? "Edit Vacancy" : "Create Vacancy"}
        bordered={false}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="Vacancy Name"
                labelCol={{ span: 24 }}
                help={errors.vacancyName ? errors.vacancyName.message : ""}
                validateStatus={errors.vacancyName ? "error" : ""}
              >
                <Controller
                  name="vacancyName"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Job Position"
                labelCol={{ span: 24 }}
                help={errors.jobPosition ? errors.jobPosition.message : ""}
                validateStatus={errors.jobPosition ? "error" : ""}
              >
                <Controller
                  name="jobPosition"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Job Level"
                labelCol={{ span: 24 }}
                help={errors.jobLevelId ? errors.jobLevelId.message : ""}
                validateStatus={errors.jobLevelId ? "error" : ""}
              >
                <Controller
                  name="jobLevelId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={jobLevels.map((jl) => ({
                        value: jl.id,
                        label: jl.name,
                      }))}
                    />
                  )}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Employment Status"
                labelCol={{ span: 24 }}
                help={
                  errors.employmentStatusId
                    ? errors.employmentStatusId.message
                    : ""
                }
                validateStatus={errors.employmentStatusId ? "error" : ""}
              >
                <Controller
                  name="employmentStatusId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={employmentStatuses.map((es) => ({
                        value: es.id,
                        label: es.name,
                      }))}
                    />
                  )}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Responsibilities"
                labelCol={{ span: 24 }}
                help={
                  errors.responsibilities ? errors.responsibilities.message : ""
                }
                validateStatus={errors.responsibilities ? "error" : ""}
              >
                <Controller
                  name="responsibilities"
                  control={control}
                  render={({ field }) => <Input.TextArea {...field} />}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Gender"
                labelCol={{ span: 24 }}
                help={errors.gender ? errors.gender.message : ""}
                validateStatus={errors.gender ? "error" : ""}
              >
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} placeholder="Select Gender" allowClear>
                      <Select.Option value="male">Male</Select.Option>
                      <Select.Option value="female">Female</Select.Option>
                    </Select>
                  )}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Vacancy Status"
                labelCol={{ span: 24 }}
                help={errors.vacancyStatus ? errors.vacancyStatus.message : ""}
                validateStatus={errors.vacancyStatus ? "error" : ""}
              >
                <Controller
                  name="vacancyStatus"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={[
                        { value: "Open", label: "Open" },
                        { value: "Closed", label: "Closed" },
                      ]}
                      disabled={!vacancyId} // Disable selection if not in edit mode
                    />
                  )}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Minimum Age"
                labelCol={{ span: 24 }}
                help={errors.minAge ? errors.minAge.message : ""}
                validateStatus={errors.minAge ? "error" : ""}
              >
                <Controller
                  name="minAge"
                  control={control}
                  render={({ field }) => <Input type="number" {...field} />}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Maximum Age"
                labelCol={{ span: 24 }}
                help={errors.maxAge ? errors.maxAge.message : ""}
                validateStatus={errors.maxAge ? "error" : ""}
              >
                <Controller
                  name="maxAge"
                  control={control}
                  render={({ field }) => <Input type="number" {...field} />}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Minimum Year Experience"
                labelCol={{ span: 24 }}
                help={
                  errors.minYearExperience
                    ? errors.minYearExperience.message
                    : ""
                }
                validateStatus={errors.minYearExperience ? "error" : ""}
              >
                <Controller
                  name="minYearExperience"
                  control={control}
                  render={({ field }) => <Input type="number" {...field} />}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Minimum Education Level"
                labelCol={{ span: 24 }}
                help={
                  errors.minEducationLevelId
                    ? errors.minEducationLevelId.message
                    : ""
                }
                validateStatus={errors.minEducationLevelId ? "error" : ""}
              >
                <Controller
                  name="minEducationLevelId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={educLevels.map((el) => ({
                        value: el.id,
                        label: el.name,
                      }))}
                    />
                  )}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Soft Skills"
                labelCol={{ span: 24 }}
                help={errors.softSkills ? errors.softSkills.message : ""}
                validateStatus={errors.softSkills ? "error" : ""}
              >
                <Controller
                  name="softSkills"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      mode="multiple"
                      options={softSkills.map((skill) => ({
                        value: skill.id,
                        label: skill.name,
                      }))}
                    />
                  )}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Hard Skills"
                labelCol={{ span: 24 }}
                help={errors.hardSkills ? errors.hardSkills.message : ""}
                validateStatus={errors.hardSkills ? "error" : ""}
              >
                <Controller
                  name="hardSkills"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      mode="multiple"
                      options={hardSkills.map((skill) => ({
                        value: skill.id,
                        label: skill.name,
                      }))}
                    />
                  )}
                />
              </Form.Item>
            </Col>
          </Row>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full py-2 mt-4 bg-brand-200 text-white rounded-lg font-semibold text-lg shadow-md hover:bg-brand-500 transition-all duration-300"
            >
              {vacancyId ? "Update Vacancy" : "Create Vacancy"}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default VacancyFormHrmsPage;
