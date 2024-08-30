import {
  Button,
  Modal,
  Space,
  Tabs,
  Timeline,
  Form,
  Input,
  Row,
  Col,
  // DatePicker,
  // Select,
  message,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserSlash,
  faEye,
  // faMagnifyingGlass,
  faStethoscope,
  faCircleExclamation,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
// import { Option } from "antd/es/mentions";
// import { optionStatus } from "../../utils/DefaultData";
import {
  getCalendars,
  updateBooking,
} from "../../services/BookingServices";

export default function DoctorCalendar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  // const [dayBookingFrom, setDayBookingFrom] = useState(null);
  // const [dayBookingTo, setDayBookingTo] = useState(null);
  const [selectId, setSelectId] = useState(null);
  const [processedData, setProcessedData] = useState([]);

  // const dayBookingFromChange = (date, dateString) => {
  //   setDayBookingFrom(dateString);
  // };
  // const dayBookingToChange = (date, dateString) => {
  //   setDayBookingTo(dateString);
  // };

  const processBookingData = (data) => {
    return data.map((dayData) => {
      const bookingsArray = Array.isArray(dayData.bookings)
        ? dayData.bookings
        : [];
      const groupedBookings = bookingsArray.reduce((acc, booking) => {
        const existing = acc.find((b) => b.time === booking.timeBooking);
        if (existing) {
          existing.bookings.push(booking);
        } else {
          acc.push({ time: booking.timeBooking, bookings: [booking] });
        }
        return acc;
      }, []);
      return { ...dayData, bookings: groupedBookings };
    });
  };

  const isFormBookingOpen = (item) => {
    setIsModalOpen(true);
    setSelectedBooking(item);
  };
  const handleOkFormBooking = () => {
    setIsModalOpen(false);
  };
  const handleCancelFormBooking = () => {
    setIsModalOpen(false);
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
        closeDenyModal();
        await updateBooking({ id: selectId, status: "failure" });
        const fetchApi = async () => {
          const result = await getCalendars();
          if (Array.isArray(result.data)) {
            const processed = processBookingData(result.data);
            setProcessedData(processed);
          } else {
            setProcessedData(null);
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
        await updateBooking({ id: selectId, status: "success" });
        const fetchApi = async () => {
          const result = await getCalendars();
          if (Array.isArray(result.data)) {
            const processed = processBookingData(result.data);
            setProcessedData(processed);
            console.log(processedData)
          } else {
            setProcessedData(null);
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

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getCalendars();
      if (Array.isArray(result.data)) {
        const processed = processBookingData(result.data);
        setProcessedData(processed);
      } else {
        setProcessedData(null);
      }
    };
    fetchApi();
  }, []);
  
  return (
    <>
      <Space direction="vertical" size="large" style={{ display: "flex" }}>
        <h1>Lịch Khám Bệnh</h1>
        {/* <Collapse
          className="custom-collapse"
          defaultActiveKey={["1"]}
          expandIconPosition="end"
          items={items}
        /> */}
        {processedData && (
          <Tabs defaultActiveKey="Monday">
            {processedData.map((dayData) => (
              <Tabs.TabPane tab={dayData.day} key={dayData.day}>
                <Timeline mode="left">
                  {dayData.bookings.map((group, index) => (
                    <Timeline.Item key={index} label={group.time}>
                      {group.bookings.map((item, subIndex) => (
                        <Row
                          gutter={16}
                          key={`booking-${subIndex}`}
                          style={{ marginBottom: "10px" }}
                        >
                          <Col span={4}>{item.fullname}</Col>
                          <Col span={2}>{item.dateOfBirth}</Col>
                          <Col span={1}>{item.gender}</Col>
                          <Col span={2}>{item.phoneNumber}</Col>
                          <Col span={6}>{item.note}</Col>
                          <Col span={2}>{item.status}</Col>
                          <Col span={6}>
                            <Button
                              type="primary"
                              icon={<FontAwesomeIcon icon={faEye} />}
                              style={{ marginLeft: 8 }}
                              onClick={() => isFormBookingOpen(item)}
                              ghost
                            >
                              Xem
                            </Button>
                            {item.status === "Đã xử lý" && (
                              <>
                                <Button
                                  type="primary"
                                  icon={
                                    <FontAwesomeIcon icon={faStethoscope} />
                                  }
                                  style={{ marginLeft: 8 }}
                                  onClick={() => openConfirmModal(item.id)}
                                >
                                  Khám
                                </Button>

                                <Button
                                  type="primary"
                                  icon={<FontAwesomeIcon icon={faUserSlash} />}
                                  style={{ marginLeft: 8 }}
                                  danger
                                  onClick={() => openDenyModal(item.id)}
                                >
                                  Không đến
                                </Button>
                              </>
                            )}
                          </Col>
                        </Row>
                      ))}
                    </Timeline.Item>
                  ))}
                </Timeline>
              </Tabs.TabPane>
            ))}
          </Tabs>
        )}
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
                <Form.Item label="Giới tính">
                  <Input value={selectedBooking.gender} readOnly />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Gmail">
              <Input value={selectedBooking.gmail} readOnly />
            </Form.Item>
            <Form.Item label="Số điện thoại">
              <Input value={selectedBooking.phoneNumber} readOnly />
            </Form.Item>
            <Form.Item label="Khoa khám">
              <Input value={selectedBooking.major} readOnly />
            </Form.Item>
            <Form.Item label="Thời gian khám">
              <Input
                value={
                  selectedBooking.dayBooking +
                  " : " +
                  selectedBooking.timeBooking
                }
                readOnly
              />
            </Form.Item>
            <Form.Item label="Mô tả">
              <Input.TextArea rows={4} value={selectedBooking.note} readOnly />
            </Form.Item>
            <Form.Item label="Trạng thái">
              <Input value={selectedBooking.status} readOnly />
            </Form.Item>
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
          Xác nhận bệnh nhân không đến khám?
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
          Xác nhận thăm khám thành công?
        </p>
      </Modal>
    </>
  );
}
