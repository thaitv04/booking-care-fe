import {
  Button,
  Col,
  Collapse,
  DatePicker,
  Flex,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Select,
  Space,
  Table,
} from "antd";
import "../../CustomAntd.css";
import { Option } from "antd/es/mentions";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faCircleInfo,
  faPen,
  faRotateLeft,
  faTrash,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { deleteUser, getAllUsers } from "../../services/UserServices";
import {
  optionDegree,
  optionGender,
} from "../../utils/DefaultData";
import { getAllMajors } from "../../services/MajorServices";

export default function ListDoctor() {
  const [dateOfBirthFrom, setDateOfBirthFrom] = useState(null);
  const [dateOfBirthTo, setDateOfBirthTo] = useState(null);
  const [optionMajor, setOptionMajor] = useState([]);
  const [data, setData] = useState([]);
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [selectId, setSelectId] = useState(null);
  const closeDeleteModal = () => {
    setSelectId(null);
    setIsModalDelete(false);
  };
  const openDeleteModal = (id) => {
    setSelectId(id);
    setIsModalDelete(true);
  };

  const deleteDoctor = async () => {
    if (selectId) {
      try {
        await deleteUser(selectId);
        const fetchApi = async () => {
          const result = await getAllUsers({"status": 1});
          if (Array.isArray(result.data)) {
            setData(result.data);
          } else {
            setData([]);
          }
        };
        fetchApi();
        message.success("Thành công!")
        closeDeleteModal();
      } catch (error) {
        console.error("Failed to delete doctor:", error);
        message.error("Thất bại.")
      }
    }
  };

  const [isModalReset, setIsModalReset] = useState(false);
  const closeResetModal = () => {
    setIsModalReset(false);
  };

  const openReseteModal = () => {
    setIsModalReset(true);
  };

  const inputNumberStyle = {
    width: "100%",
  };

  const dobFromChange = (date, dateString) => {
    setDateOfBirthFrom(dateString);
  };

  const dobToChange = (date, dateString) => {
    setDateOfBirthTo(dateString);
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
        <Space size="small">
          <Link to={`${record.id}/edit`}>
            <Button
              type="primary"
              icon={<FontAwesomeIcon icon={faPen} />}
              title="Sửa"
            />
          </Link>

          <Button
            type="primary"
            icon={<FontAwesomeIcon icon={faRotateLeft} />}
            title="Đặt lại mật khẩu"
            onClick={openReseteModal}
          />

          <Button
            type="primary"
            icon={<FontAwesomeIcon icon={faTrash} />}
            danger
            title="Xóa"
            onClick={() => openDeleteModal(record.id)}
          />
        </Space>
      ),
      width: "10%",
      align: "center",
    },
  ];

  // const data = [
  //   {
  //     id: "abc",
  //     gmail: "hoangphamhuy275132@gmail.com",
  //     name: "Phạm Huy Hoàng",
  //     phoneNumber: "0985693949",
  //     experience: 15,
  //     certification: 25,
  //     degree: "GS",
  //     gender: "Nam",
  //     dateOfBirth : "07/03/2003"
  //   },
  //   {
  //     id: "2",
  //     name: "Cù Ngọc Tuấn Hưng",
  //     gmail: "hungtuancn@gmail.com",
  //     phoneNumber: "0959493949",
  //     experience: 5,
  //     certification: 1,
  //     degree: "BS",
  //     gender: "Nam",
  //     dateOfBirth : "18/05/2003"
  //   },
  //   {
  //     id: "3",
  //     name: "Trần Đình Hoan",
  //     gmail: "hungtuancn@gmail.com",
  //     phoneNumber: "0959493949",
  //     experience: 5,
  //     certification: 1,
  //     degree: "BS",
  //     gender: "Nam",
  //     dateOfBirth : "18/05/2003"
  //   },
  //   {
  //     id: "4",
  //     name: "Đỗ Văn Hùng",
  //     gmail: "hungtuancn@gmail.com",
  //     phoneNumber: "0959493949",
  //     experience: 5,
  //     certification: 1,
  //     degree: "BS",
  //     gender: "Nam",
  //     dateOfBirth : "18/05/2003"
  //   },
  //   {
  //     id: "5",
  //     name: "Lê Tuấn Hưng",
  //     gmail: "hungtuancn@gmail.com",
  //     phoneNumber: "0959493949",
  //     experience: 5,
  //     certification: 1,
  //     degree: "BS",
  //     gender: "Nam",
  //     dateOfBirth : "18/05/2003"
  //   },
  //   {
  //     id: "6",
  //     name: "Đào Xuân Đông",
  //     gmail: "hungtuancn@gmail.com",
  //     phoneNumber: "0959493949",
  //     experience: 5,
  //     certification: 1,
  //     degree: "BS",
  //     gender: "Nam",
  //     dateOfBirth : "18/05/2003"
  //   },
  // ];

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getAllMajors({});
      if (Array.isArray(result.data)) {
        setOptionMajor(result.data);
      } else {
        setOptionMajor([]);
      }
    };
    fetchApi();
  }, []);

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

  const dataWithKey = data.map((item) => ({ ...item, key: item.id }));

  const onFinish = async (values) => {
    values.dateOfBirthFrom = dateOfBirthFrom;
    values.dateOfBirthTo = dateOfBirthTo;
    let finalValues = {
      ...values,
    };
    try {
      const response = await getAllUsers(finalValues);
      setData(response.data);
      console.log(data);
    } catch (error) {
      console.error("Failed:", error);
    }
    console.log("Success", finalValues);
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

          {/* Ngày sinh từ*/}
          <Col span={6}>
            <Form.Item label="Ngày sinh từ" name="dateOfBirthFrom">
              <DatePicker style={inputNumberStyle} onChange={dobFromChange} />
            </Form.Item>
          </Col>

          {/* Ngày sinh đến */}
          <Col span={6}>
            <Form.Item label="Ngày sinh đến" name="dateOfBirthTo">
              <DatePicker style={inputNumberStyle} onChange={dobToChange} />
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

          {/* Số năm kinh nghiệm từ */}
          <Col span={6}>
            <Form.Item label="Số năm kinh nghiệm từ" name="experienceFrom">
              <InputNumber min={1} max={40} style={inputNumberStyle} />
            </Form.Item>
          </Col>

          {/* Số năm kinh nghiệm đến */}
          <Col span={6}>
            <Form.Item label="Số năm kinh nghiệm đến" name="experienceTo">
              <InputNumber min={1} max={40} style={inputNumberStyle} />
            </Form.Item>
          </Col>

          {/* Số bằng cấp từ */}
          <Col span={6}>
            <Form.Item label="Số bằng cấp từ" name="certificationFrom">
              <InputNumber min={1} style={inputNumberStyle} />
            </Form.Item>
          </Col>

          {/* Số bằng cấp đến */}
          <Col span={6}>
            <Form.Item label="Số bằng cấp đến" name="certificationTo">
              <InputNumber min={1} style={inputNumberStyle} />
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
            <Form.Item label="Chọn chuyên khoa" name="major">
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
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        <h1>Thông tin bác sĩ</h1>
        <Collapse
          className="custom-collapse"
          defaultActiveKey={["1"]}
          expandIconPosition="end"
          items={items}
        />
        <Flex justify="flex-end">
          <Link to="/admin/doctors/create">
            <Button
              type="primary"
              icon={<FontAwesomeIcon icon={faUserPlus} />}
              size="large"
            >
              Thêm mới
            </Button>
          </Link>
        </Flex>
        <Table
          columns={columns}
          dataSource={dataWithKey}
          pagination={{ pageSize: 5 }}
          bordered="true"
        />
      </Space>

      {/* Alert Delete */}
      <Modal
        title={
          <span>
            <FontAwesomeIcon
              icon={faCircleExclamation}
              style={{
                color: "#FF4D4F",
                fontSize: "60px",
                textAlign: "center",
              }}
            />
          </span>
        }
        closable={false}
        open={isModalDelete}
        centered
        width={600}
        footer={[
          <Button type="primary" size="large" ghost onClick={closeDeleteModal}>
            Hủy
          </Button>,
          <Button type="primary" size="large" danger onClick={deleteDoctor}>
            Xóa
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
          Bạn có chắc chắn muốn xóa bác sĩ này?
        </p>
      </Modal>

      {/* Alert Reset Password */}
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
        open={isModalReset}
        centered
        width={650}
        footer={[
          <Button type="primary" size="large" danger ghost onClick={closeResetModal}>
            Hủy
          </Button>,
          <Button type="primary" size="large" onClick={closeResetModal}>
            Đặt lại
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
          Bạn chắc chắn muốn đặt lại mật khẩu cho bác sĩ này?
        </p>
      </Modal>
    </>
  );
}
