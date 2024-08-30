import {
  Button,
  Col,
  Collapse,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  Table,
} from "antd";
import "../../CustomAntd.css";
import { Option } from "antd/es/mentions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateRight,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { optionDegree, optionGender, optionMajor } from "../../utils/DefaultData";

export default function ListDoctorLeave() {
  const [leaveFrom, setLeaveFrom] = useState(null);
  const [leaveTo, setLeaveTo] = useState(null);

  const leaveFromChange = (date, dateString) => {
    setLeaveFrom(dateString);
  };
  const leaveToChange = (date, dateString) => {
    setLeaveTo(dateString);
  };

  const [isModalRecover, setIsModalRecover] = useState(false);
  const closeRecoverModal = () => {
    setIsModalRecover(false);
  };

  const openRecoverModal = () => {
    setIsModalRecover(true);
  };

  const datePickkerStyle = {
    width: "100%",
  };

  const columns = [
    {
      title: "Họ tên",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "Ngày sinh",
      dataIndex: "dateOfBirth",
      align: "center",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      align: "center",
    },
    {
      title: "Gmail",
      dataIndex: "gmail",
      align: "center",
    },
    {
      title: "SĐT",
      dataIndex: "phoneNumber",
      align: "center",
    },
    {
      title: "Kinh nghiệm",
      dataIndex: "experience",
      sorter: {
        compare: (a, b) => a.experience - b.experience,
        multiple: 3,
      },
      align: "center",
    },
    {
      title: "Bằng cấp",
      dataIndex: "certification",
      sorter: {
        compare: (a, b) => a.certification - b.certification,
        multiple: 2,
      },
      align: "center",
    },
    {
      title: "Trình độ",
      dataIndex: "degree",
      align: "center",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<FontAwesomeIcon icon={faArrowRotateRight} />}
            onClick={openRecoverModal}
          >
            Khôi phục
          </Button>
        </Space>
      ),
      width: "15%",
      align: "center",
    },
  ];

  const data = [
    {
      id: "abc",
      gmail: "hoangphamhuy275132@gmail.com",
      name: "Phạm Huy Hoàng",
      phoneNumber: "0985693949",
      experience: 15,
      certification: 25,
      degree: "GS",
      gender: "Nam",
      dateOfBirth : "07/03/2003"
    },
    {
      id: "2",
      name: "Cù Ngọc Tuấn Hưng",
      gmail: "hungtuancn@gmail.com",
      phoneNumber: "0959493949",
      experience: 5,
      certification: 1,
      degree: "BS",
      gender: "Nam",
      dateOfBirth : "18/05/2003"
    },
    {
      id: "3",
      name: "Trần Đình Hoan",
      gmail: "hungtuancn@gmail.com",
      phoneNumber: "0959493949",
      experience: 5,
      certification: 1,
      degree: "BS",
      gender: "Nam",
      dateOfBirth : "18/05/2003"
    },
    {
      id: "4",
      name: "Đỗ Văn Hùng",
      gmail: "hungtuancn@gmail.com",
      phoneNumber: "0959493949",
      experience: 5,
      certification: 1,
      degree: "BS",
      gender: "Nam",
      dateOfBirth : "18/05/2003"
    },
    {
      id: "5",
      name: "Lê Tuấn Hưng",
      gmail: "hungtuancn@gmail.com",
      phoneNumber: "0959493949",
      experience: 5,
      certification: 1,
      degree: "BS",
      gender: "Nam",
      dateOfBirth : "18/05/2003"
    },
    {
      id: "6",
      name: "Đào Xuân Đông",
      gmail: "hungtuancn@gmail.com",
      phoneNumber: "0959493949",
      experience: 5,
      certification: 1,
      degree: "BS",
      gender: "Nam",
      dateOfBirth : "18/05/2003"
    },
  ];

  const dataWithKey = data.map((item) => ({ ...item, key: item.id }));

  var onFinish = (values) => {
    values.leaveFrom = leaveFrom;
    values.leaveTo = leaveTo;
    let finalValues = { ...values };
    console.log("sucess", finalValues);
  };

  var onFinishFailed = (errorInfo) => {
    console.log("errorInfo");
  };

  const [form] = Form.useForm();

  const formSearchDoctor = (
    <>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Row gutter={24}>
          {/* Họ tên */}
          <Col span={6}>
            <Form.Item label="Họ và tên" name="name">
              <Input placeholder="Nhập họ và tên" />
            </Form.Item>
          </Col>

          {/* Địa chỉ */}
          <Col span={6}>
            <Form.Item label="Địa chỉ" name="address">
              <Input placeholder="Nhập địa chỉ" />
            </Form.Item>
          </Col>

          {/*Gmail*/}
          <Col span={6}>
            <Form.Item
              label="Gmail"
              name="gmail"
              rules={[
                {
                  type: "email",
                  message: "Hãy nhập đúng định dạng của gmail!",
                },
              ]}
            >
              <Input placeholder="Nhập gmail" />
            </Form.Item>
          </Col>

          {/* SĐT */}
          <Col span={6}>
            <Form.Item
              label="Số điện thoại"
              name="phoneNumber"
              rules={[
                {
                  pattern: /^[0-9]{0,12}$/,
                  message: "Hãy nhập đúng định dạng số điện thoại!",
                },
              ]}
            >
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>
          </Col>

          {/* Giới tính */}
          <Col span={6}>
            <Form.Item label="Giới tính" name="gender">
              <Select style={{ width: "100%" }} placeholder="Chọn giới tính">
                {optionGender.map((option) => (
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

          {/* Dân tộc */}
          <Col span={6}>
            <Form.Item label="Dân tộc" name="ethnicity">
              <Input placeholder="Nhập dân tộc bác sĩ" />
            </Form.Item>
          </Col>

          {/* Năm rời đi từ */}
          <Col span={6}>
            <Form.Item label="Năm rời đi từ" name="leaveFrom">
              <DatePicker
                picker="year"
                style={datePickkerStyle}
                onChange={leaveFromChange}
              />
            </Form.Item>
          </Col>

          {/* Năm ròi đi đến */}
          <Col span={6}>
            <Form.Item label="Năm rời đi đến" name="leaveTo">
              <DatePicker
                picker="year"
                style={datePickkerStyle}
                onChange={leaveToChange}
              />
            </Form.Item>
          </Col>

          {/* Số bằng cấp từ */}
          <Col span={6}>
            <Form.Item label="Số bằng cấp từ" name="certificationFrom">
              <InputNumber min={1} style={datePickkerStyle} />
            </Form.Item>
          </Col>

          {/* Số bằng cấp đến */}
          <Col span={6}>
            <Form.Item label="Số bằng cấp đến" name="certificationTo">
              <InputNumber min={1} style={datePickkerStyle} />
            </Form.Item>
          </Col>

          {/*Trình độ */}
          <Col span={6}>
            <Form.Item label="Chọn trình độ" name="degree">
              <Select
                showSearch
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
          <Col span={6}>
            <Form.Item label="Chọn chuyên khoa" name="majorId">
              <Select
                showSearch
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
                  <Option key={option.id} value={option.id} label={option.name}>
                    {option.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit" size="large">
                Tìm kiếm
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );

  const items = [
    {
      key: "1",
      label: "Tìm kiếm",
      children: formSearchDoctor,
    },
  ];

  return (
    <>
      <Space direction="vertical" size="large" style={{ display: "flex" }}>
        <h1>Danh sách bác sĩ</h1>
        <Collapse
          className="custom-collapse"
          defaultActiveKey={["1"]}
          expandIconPosition="end"
          items={items}
        />

        <Table
          columns={columns}
          dataSource={dataWithKey}
          pagination={{ pageSize: 5 }}
          bordered="true"
        />
      </Space>

      {/* Alert Recover Password */}
      <Modal
        title={
          <span>
            <FontAwesomeIcon
              icon={faCircleInfo}
              style={{
                color: "#1677FF",
                fontSize: "60px",
                textAlign: "center",
              }}
            />
          </span>
        }
        closable={false}
        open={isModalRecover}
        centered
        width={600}
        footer={[
          <Button type="primary" size="large" danger ghost onClick={closeRecoverModal}>
            Hủy
          </Button>,
          <Button type="primary" size="large" onClick={closeRecoverModal}>
            Khôi phục
          </Button>,
        ]}
      >
        <p
          style={{
            textAlign: "center",
            marginTop: "15px",
            fontWeight: "bold",
            fontSize: "24px",
          }}
        >
          Bạn có chắc chắn muốn khôi phục bác sĩ này?
        </p>
      </Modal>
    </>
  );
}
