import { Button, Col, Flex, Form, Input, message, Row, Select } from "antd";
import "../../base.css";
import "./ClientDoctor.css";
import { Link } from "react-router-dom";
import Carosel from "../../components/Carosel";
import "../ClientMajor/ClientMajor.css";
import { Option } from "antd/es/mentions";
import { optionDegree, optionMajor } from "../../utils/DefaultData";
import { createUser, getAllUsers } from "../../services/UserServices";
import { useEffect, useState } from "react";

export default function ListDoctorClient() {
  const [data, setData] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getAllUsers({"status": 1});
      if (Array.isArray(result.data)) {
        setData(result.data);
      } else {
        setData([]);
      }
    };
    fetchApi();
  }, []);

  const onFinish = async (values) => {
    let finalValues = {
      ...values,
    };
    try {
      const response = await createUser(finalValues);
      message.success(response.message);
    } catch (error) {
      message.error("Thất bại");
      console.error("Failed:", error);
    }
    console.log(finalValues);
  };

  var onFinishFailed = (errorInfo) => {
    console.log("errorInfo");
  };

  const truncateDescription = (description, maxLength) => {
    return description.length > maxLength
      ? description.substring(0, maxLength) + "..."
      : description;
  };

  return (
    <>
      <Carosel />
      <div className="major">
        <h2 className=" section_title_center">Chuyên gia - Bác sĩ</h2>
        <Row className="search_bar_client">
          <Col span={24}>
            <Row>
              {/* Tìm theo tên */}
              <Col
                xxl={{ span: 16, offset: 4 }}
                sm={{ span: 22, offset: 1 }}
                xs={{ span: 22, offset: 1 }}
              >
                <Form
                  layout="vertical"
                  form={form}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <Row gutter={24}>
                    {/* Họ tên */}
                    <Col xl={{span: 7}} sm={{span: 12}} xs={{span: 24}}>
                      <Form.Item label="Họ và tên" name="name">
                        <Input placeholder="Nhập họ và tên" size="large"/>
                      </Form.Item>
                    </Col>

                    {/*Trình độ */}
                    <Col xl={{span: 7}} sm={{span: 12}} xs={{span: 24}}>
                      <Form.Item label="Chọn trình độ" name="degree">
                        <Select
                          showSearch
                          size="large"
                          style={{ width: "100%" }}
                          placeholder="Chon trình độ"
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            (option?.label.toLowerCase() ?? "").includes(
                              input.toLowerCase()
                            )
                          }
                          filterSort={(optionA, optionB) =>
                            (optionA?.key ?? "")
                              .toLowerCase()
                              .localeCompare((optionB?.key ?? "").toLowerCase())
                          }
                        >
                          {optionDegree.map((option) => (
                            <Option
                              key={option.value}
                              value={option.value}
                              label={option.label}
                            >
                              {option.label}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>

                    {/*Chuyên khoa */}
                    <Col xl={{span: 7}} sm={{span: 12}} xs={{span: 24}}>
                      <Form.Item label="Chọn chuyên khoa" name="major">
                        <Select
                          showSearch
                          size="large"
                          style={{ width: "100%" }}
                          placeholder="Chọn chuyên khoa"
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            (option?.label.toLowerCase() ?? "").includes(
                              input.toLowerCase()
                            )
                          }
                          filterSort={(optionA, optionB) =>
                            (optionA?.key ?? "")
                              .toLowerCase()
                              .localeCompare((optionB?.key ?? "").toLowerCase())
                          }
                        >
                          {optionMajor.map((option) => (
                            <Option
                              key={option.id}
                              value={option.id}
                              label={option.name}
                            >
                              {option.name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>

                    {/* Nút */}
                    <Flex align="end">
                      <Col span={3}>
                        <Form.Item>
                          <Button type="primary" htmlType="submit" size="large">
                            Tìm kiếm
                          </Button>
                        </Form.Item>
                      </Col>
                    </Flex>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col
            xxl={{ span: 18, offset: 3}}
            lg={{ span: 20, offset: 2 }}
            md={{ span: 22, offset: 1 }}
            xs={{ span: 22, offset: 1 }}
          >
            <Row gutter={[24, 66]}>
              {data.map((doctor) => (
                <Col
                lg={{ span: 8 }}
                md={{ span: 12 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
              >
                <div className="doctor_item">
                  <div className="doctor_image">
                    <img
                      src={doctor.avatar}
                      alt={doctor.name}
                    />
                  </div>
                  <Link className="major_name" to={`/doctors/${doctor.id}`}>
                    {doctor.degree}.{doctor.name}
                  </Link>
                  <p className="major_intro doctor_major">
                    {doctor.major}
                  </p>
                  <p className="major_intro">
                    {truncateDescription(doctor.description, 200)}
                  </p>
                  <Link className="link_with_line major_link" to={`/doctors/${doctor.id}`}>
                    + Xem chi tiết
                  </Link>
                </div>
              </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
}
