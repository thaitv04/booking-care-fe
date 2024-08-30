import { Button, Col, DatePicker, Form, Input, Modal, Row, Select } from "antd";
import "./FormBooking.css";
import { Option } from "antd/es/mentions";
import { useEffect, useState } from "react";
import { createBooking } from "../../services/BookingServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { getAllMajors } from "../../services/MajorServices";
import { getAllUsers } from "../../services/UserServices";
import { getAllTimes } from "../../services/TimeServices";
import moment from "moment";

export default function FormBooking({
  isFormBookingOpen,
  handleOkFormBooking,
  handleCancelFormBooking,
}) {
  const [optionDoctor, setOptionDoctor] = useState([]);
  const [optionMajor, setOptionMajor] = useState([]);
  const [doctorId, setDoctorId] = useState(false);
  const [optionTime, setOptionTime] = useState([]);

  const onChangeDateBooking = async (date, dateString) => {
    console.log(date);
    console.log(dateString)
    try {
      const response = await getAllTimes({ doctorId: doctorId, date: dateString });
      setOptionTime(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Failed:", error);
    }
    console.log(date, dateString);
  };

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getAllMajors({});
      if (Array.isArray(result.data)) {
        setOptionMajor(result.data);
        console.log(result.data);
      } else {
        setOptionMajor([]);
      }
    };
    fetchApi();
  }, []);

  const changeMajor = async (value) => {
    try {
      const response = await getAllUsers({ major: value, status: 1 });
      setOptionDoctor(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Failed:", error);
    }
  };

  const changeDoctor = async (value) => setDoctorId(value);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => {
    setIsModalOpen(false);
  };

  var onFinish = async (values) => {
    values.dateOfBirth = values.dateOfBirth.format("DD-MM-YYYY");
    values.dateBooking = values.dateBooking.format("DD-MM-YYYY");
    setIsModalOpen(true);
    console.log(values);
    try {
      const response = await createBooking(values);
      setIsModalOpen(true);
      console.log(response);
      console.log("success", values);
    } catch (error) {
      console.error("Failed:", error);
    }
    handleOkFormBooking();
  };

  var onFinishFailed = (errorInfo) => {
    console.log("errorInfo");
  };
  return (
    <>
      <>
        <Modal
          title={<p className="ant-modal-title">Đặt lịch khám</p>}
          open={isFormBookingOpen}
          // onOk={handleOkFormBooking}
          onCancel={handleCancelFormBooking}
          footer={[]}
          zIndex={10}
        >
          <Form
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            {/*Họ tên */}
            <Form.Item
              label="Họ và tên"
              name="fullname"
              rules={[
                {
                  required: true,
                  message: "Hãy điền họ và tên của bạn!",
                },
              ]}
            >
              <Input placeholder="Họ và tên" />
            </Form.Item>

            <Row gutter={24}>
              <Col md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                {/*Ngày sinh */}
                <Form.Item
                  label="Ngày sinh"
                  name="dateOfBirth"
                  rules={[
                    {
                      required: true,
                      message: "Hãy điền ngày sinh của bạn!",
                    },
                  ]}
                >
                  <DatePicker
                    placeholder="Chọn ngày sinh"
                    format="MM/DD/YYYY"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>

              <Col md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                {/*Số điện thoại */}
                <Form.Item
                  label="Số điện thoại"
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                      message: "Hãy điền số điện thoại của bạn!",
                    },
                    {
                      pattern: /^[0-9]{0,12}$/,
                      message: "Hãy nhập đúng định dạng số điện thoại!",
                    },
                  ]}
                >
                  <Input placeholder="Số điện thoại" />
                </Form.Item>
              </Col>
            </Row>

            {/*Gmail */}
            <Form.Item
              label="Gmail"
              name="gmail"
              rules={[
                {
                  required: true,
                  message: "Hãy điền địa chỉ gmail của bạn!",
                },
                {
                  type: "email",
                  message: "Hãy nhập đúng định dạng của gmail!",
                },
              ]}
            >
              <Input placeholder="Địa chỉ Gmail" />
            </Form.Item>

            {/*Địa chỉ */}
            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Hãy điền địa chỉ của bạn!",
                },
              ]}
            >
              <Input placeholder="Địa chỉ" />
            </Form.Item>

            {/*Chuyên khoa */}
            <Form.Item
              label="Chọn chuyên khoa"
              name="majorId"
              rules={[
                {
                  required: true,
                  message: "Hãy chọn chuyên khoa bạn muốn khám!",
                },
              ]}
            >
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Chon chuyên khoa"
                onChange={changeMajor}
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
                  <Option key={option.id} value={option.id} label={option.name}>
                    {option.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {/*Bác sĩ */}
            <Form.Item
              label="Chọn bác sĩ"
              name="doctorId"
              rules={[
                {
                  required: true,
                  message: "Hãy chọn bác sĩ bạn muốn!",
                },
              ]}
            >
              <Select
                showSearch
                style={{ width: "100%" }}
                onChange={changeDoctor}
                placeholder="Chon bác sĩ"
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
                {optionDoctor.map((option) => (
                  <Option key={option.id} value={option.id} label={option.name}>
                    {option.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Row gutter={24}>
              <Col md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                {/*Ngày khám */}
                <Form.Item
                  label="Chọn ngày khám"
                  name="dateBooking"
                  rules={[
                    {
                      required: true,
                      message: "Hãy chọn ngày bạn muốn thăm khám!",
                    },
                  ]}
                >
                  <DatePicker
                    placeholder="Chọn ngày khám"
                    format="DD-MM-YYYY"
                    onChange={onChangeDateBooking}
                    style={{ width: "100%" }}
                    disabledDate={(current) =>
                      current && current < moment().startOf("day")
                    }
                    disabled={!doctorId}
                  />
                </Form.Item>
              </Col>

              <Col md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                {/*Khung giờ khám */}
                <Form.Item
                  label="Chọn khung giờ khám"
                  name="timeBookingId"
                  rules={[
                    {
                      required: true,
                      message: "Hãy chọn khung giờ bạn muốn khám!",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Chọn khung giờ khám"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "").includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.key ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.key ?? "").toLowerCase())
                    }
                  >
                    {optionTime.map((option) => (
                      <Option
                        key={option.id}
                        value={option.id}
                        label={option.time}
                      >
                        {option.time}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            {/*Địa chỉ */}
            <Form.Item
              label="Triệu chứng"
              name="note"
              rules={[
                {
                  required: true,
                  message: "Hãy điền triệu chứng của bạn!",
                },
              ]}
            >
              <Input.TextArea placeholder="Triệu chứng" rows={5} />
            </Form.Item>

            <Form.Item className="submitArea">
              <Row>
                <Col sm={{ span: 8, offset: 8 }} xs={{ span: 14, offset: 5 }}>
                  <Row gutter={[20, 24]}>
                    <Col span={12}>
                      <Button key="back" onClick={handleCancelFormBooking}>
                        Quay lại
                      </Button>
                    </Col>
                    <Col span={12}>
                      <Button type="primary" htmlType="submit">
                        Đặt lịch
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title={
            <span>
              <FontAwesomeIcon
                icon={faCircleInfo}
                style={{
                  color: "#1677ff",
                  fontSize: "60px",
                  textAlign: "center",
                }}
              />
            </span>
          }
          open={isModalOpen}
          onOk={handleOk}
          closable={false}
          centered
          width={600}
          footer={[
            <Button type="primary" size="large" onClick={handleOk}>
              OK
            </Button>,
          ]}
        >
          <p>
            Hãy mở gmail của bạn và kích vào đường link để hoàn tất việc đặt
            lịch khám.
          </p>
          <p>(Chú ý: Người gửi là tamanhhospital2024@gmail.com)</p>
        </Modal>
      </>
    </>
  );
}
