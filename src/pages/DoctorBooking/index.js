import {
  Button,
  Col,
  Collapse,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Space,
  Table,
} from "antd";
import "../../CustomAntd.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleExclamation,
  faCircleInfo,
  faCircleXmark,
  faEye,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Option } from "antd/es/mentions";
import { optionStatus2 } from "../../utils/DefaultData";
import { getAllBookings, updateBooking } from "../../services/BookingServices";

export default function DoctorBooking() {
  // eslint-disable-next-line no-unused-vars
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [dateBookingFrom, setdateBookingFrom] = useState(null);
  const [dateBookingTo, setdateBookingTo] = useState(null);
  const [data, setData] = useState([]);
  const [selectId, setSelectId] = useState(null);

  const dateBookingFromChange = (date, dateString) => {
    setdateBookingFrom(dateString);
  };
  const dateBookingToChange = (date, dateString) => {
    setdateBookingTo(dateString);
  };

  const [isModalDeny, setIsModalDeny] = useState(false);
  const closeDenyModal = () => {
    setIsModalDeny(false);
    setSelectId(null);
  };
  const openDenyModal = (id) => {
    setSelectId(id);
    setIsModalDeny(true);
  };
  const denyBooking = async () => {
    if (selectId) {
      try {
        closeConfirmModal();
        await updateBooking({ id: selectId, status: "deny" });
        const fetchApi = async () => {
          const result = await getAllBookings({});
          if (Array.isArray(result.data)) {
            setData(result.data);
          } else {
            setData([]);
          }
        };
        fetchApi();
        message.success("Thành công!");
      } catch (error) {
        console.error("Failed to delete doctor:", error);
        message.error("Thất bại.");
      }
    }
  };

  const [isModalConfirm, setIsModalConfirm] = useState(false);
  const closeConfirmModal = () => {
    setSelectId(null);
    setIsModalConfirm(false);
  };

  const openConfirmModal = (id) => {
    setSelectId(id);
    setIsModalConfirm(true);
  };

  const acceptBooking = async () => {
    if (selectId) {
      try {
        closeConfirmModal();
        await updateBooking({ id: selectId, status: "accept" });
        const fetchApi = async () => {
          const result = await getAllBookings({});
          if (Array.isArray(result.data)) {
            setData(result.data);
          } else {
            setData([]);
          }
        };
        fetchApi();
        message.success("Thành công!");
      } catch (error) {
        console.error("Failed to delete doctor:", error);
        message.error("Thất bại.");
      }
    }
  };

  const datePickkerStyle = {
    width: "100%",
  };

  const isFormBookingOpen = (record) => {
    setIsModalOpen(true);
    setSelectedBooking(record);
  };
  const handleOkFormBooking = () => {
    setIsModalOpen(false);
  };
  const handleCancelFormBooking = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "Ngày tạo",
      dataIndex: "createdDate",
      align: "center",
    },
    {
      title: "Họ tên",
      dataIndex: "fullname",
      align: "center",
    },
    {
      title: "Ngày sinh",
      dataIndex: "dateOfBirth",
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
      title: "Khoa khám",
      dataIndex: "major",
      align: "center",
    },
    {
      title: "Thời gian khám",
      dataIndex: "timeBooking",
      align: "center",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      align: "center",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<FontAwesomeIcon icon={faEye} />}
            onClick={() => isFormBookingOpen(record)}
            title="Xem"
            size="large"
          ></Button>

          {record.status === "Chờ xử lý" && (
            <>
              <Button
                type="primary"
                icon={<FontAwesomeIcon icon={faCircleCheck} />}
                onClick={() => openConfirmModal(record.id)}
                title="Chấp nhận"
                size="large"
              ></Button>

              <Button
                type="primary"
                icon={<FontAwesomeIcon icon={faCircleXmark} />}
                onClick={() => openDenyModal(record.id)}
                title="Từ chối"
                danger
                size="large"
              ></Button>
            </>
          )}
        </Space>
      ),
      width: "14%",
      align: "center",
    },
  ];

  // const data = [
  //   {
  //     id: "1",
  //     createdDate: "20/7/2024",
  //     dateOfBirth: "09/03/2003",
  //     major: "Gan",
  //     doctor: "Gà Con",
  //     gmail: "hoangphamhuy275132@gmail.com",
  //     fullname: "Phạm Huy Hoàng",
  //     gender: "Nam",
  //     note: "Ngộ độc gan cmnr",
  //     phoneNumber: "0985693949",
  //     status: "Chờ xử lý",
  //     timeBooking: "9h - 10h",
  //     dateBooking: "23/7/2024"
  //   },
  //   {
  //     id: "2",
  //     createdDate: "10/7/2024",
  //     dateOfBirth: "18/05/2003",
  //     major: "Nam khoa",
  //     doctor: "Bảnk",
  //     gmail: "hungtuancn@gmail.com",
  //     fullname: "Cù",
  //     phoneNumber: "0985123456",
  //     status: "Chờ xử lý",
  //     timeBooking: "21/7/2024",
  //   },
  // ];

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getAllBookings({});
      if (Array.isArray(result.data)) {
        setData(result.data);
      } else {
        setData([]);
      }
    };
    fetchApi();
  }, []);

  const dataWithKey = data.map((item) => ({ ...item, key: item.id }));

  var onFinish = async (values) => {
    values.dateBookingFrom = dateBookingFrom;
    values.dateBookingTo = dateBookingTo;
    try {
      const response = await getAllBookings(values);
      setData(response.data);
      console.log(data);
    } catch (error) {
      console.error("Failed:", error);
    }
    console.log("sucess", values);
  };

  var onFinishFailed = (errorInfo) => {
    console.log("errorInfo");
  };

  const [form] = Form.useForm();

  const formSearchBooking = (
    <>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Row gutter={24}>
          {/* Ngày đặt từ */}
          <Col span={8}>
            <Form.Item label="Ngày đặt từ" name="dateBookingFrom">
              <DatePicker
                style={datePickkerStyle}
                onChange={dateBookingFromChange}
              />
            </Form.Item>
          </Col>

          {/* Ngày đặt đến */}
          <Col span={8}>
            <Form.Item label="Ngày đặt đến" name="dateBookingTo">
              <DatePicker
                style={datePickkerStyle}
                onChange={dateBookingToChange}
              />
            </Form.Item>
          </Col>

          {/* Trạng thái */}
          <Col span={8}>
            <Form.Item label="Chọn trạng thái" name="status">
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Chon trạng thái"
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
                {optionStatus2.map((option) => (
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

          <Col span={24}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
              >
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
      children: formSearchBooking,
    },
  ];

  return (
    <>
      <Space direction="vertical" size="large" style={{ display: "flex" }}>
        <h1>Danh sách đặt lịch</h1>
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

      <Modal
        title={<p className="ant-modal-title">Thông tin lịch khám</p>}
        open={isModalOpen}
        onOk={handleOkFormBooking}
        onCancel={handleCancelFormBooking}
        zIndex={10}
      >
        {selectedBooking && (
          <Form layout="vertical">
            <Form.Item label="Họ và tên">
              <Input value={selectedBooking.fullname} readOnly />
            </Form.Item>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Ngày sinh">
                  <Input value={selectedBooking.dateOfBirth} readOnly />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Số điện thoại">
                  <Input value={selectedBooking.phoneNumber} readOnly />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Gmail">
              <Input value={selectedBooking.gmail} readOnly />
            </Form.Item>
            <Form.Item label="Khoa khám">
              <Input value={selectedBooking.major} readOnly />
            </Form.Item>
            <Form.Item label="Bác sĩ khám">
              <Input value={selectedBooking.doctor} readOnly />
            </Form.Item>
            <Form.Item label="Mô tả">
              <Input.TextArea rows={4} value={selectedBooking.note} readOnly />
            </Form.Item>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Thời gian khám">
                  <Input
                    value={
                      selectedBooking.dateBooking +
                      " : " +
                      selectedBooking.timeBooking
                    }
                    readOnly
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Trạng thái">
                  <Input value={selectedBooking.status} readOnly />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        )}
      </Modal>

      {/* Alert Deny */}
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
        open={isModalDeny}
        centered
        width={600}
        footer={[
          <Button type="primary" size="large" ghost onClick={closeDenyModal}>
            Hủy
          </Button>,
          <Button type="primary" size="large" danger onClick={denyBooking}>
            Từ chối
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
          Bạn có chắc chắn muốn từ chối lịch hẹn này?
        </p>
      </Modal>

      {/* Alert Confirm */}
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
        open={isModalConfirm}
        centered
        width={650}
        footer={[
          <Button
            type="primary"
            size="large"
            danger
            ghost
            onClick={closeConfirmModal}
          >
            Hủy
          </Button>,
          <Button type="primary" size="large" onClick={acceptBooking}>
            Đồng ý
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
          Bạn có chắc chắn muốn khám bệnh cho lịch hẹn này?
        </p>
      </Modal>
    </>
  );
}
