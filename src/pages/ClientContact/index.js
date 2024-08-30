/* eslint-disable jsx-a11y/iframe-has-title */
import { Button, Col, Form, Input, message, Row, Select, Space } from "antd";
import "./ClientContact.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMapLocation,
  faPaperPlane,
  faPhoneVolume,
} from "@fortawesome/free-solid-svg-icons";
import { createUser } from "../../services/UserServices";
import { Option } from "antd/es/mentions";
import { optionVocative } from "../../utils/DefaultData";

export default function ClientContact() {
  const onFinish = async (values) => {
    values.avatar =
      "https://th.bing.com/th/id/OIP.Y50bz_Lk7pNqt0yUxHY5XgHaLH?w=119&h=180&c=7&r=0&o=5&pid=1.7";
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

  const [form] = Form.useForm();

  return (
    <>
      <div className="contact">
        <h1 className="section_title_center">Liên hệ với chúng tôi</h1>
        <Row>
          <Col span={22} offset={1}>
            <Row gutter={24} style={{ marginTop: "-30px" }}>
              <Col
                xxl={{ span: 7, offset: 3 }}
                xl={{ span: 8, offset: 2 }}
                lg={{ span: 9, offset: 1 }}
                sm={{ span: 22, offset: 1 }}
                xs={{ span: 22, offset: 1 }}
              >
                <Space
                  direction="vertical"
                  size="middle"
                  style={{
                    display: "flex",
                  }}
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.798613712308!2d105.87479176207933!3d21.040742494106688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9eb81e4f33%3A0xb8bd43325479032c!2zQuG7h25oIFZp4buHbiDEkGEgS2hvYSBUw6JtIEFuaA!5e0!3m2!1svi!2s!4v1722579271663!5m2!1svi!2s"
                    width="100%"
                    height="300"
                    style={{ border: 0, borderRadius: "25px" }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />

                  <div className="contact_infor_item">
                    <div className="contact_infor_icon">
                      <FontAwesomeIcon
                        icon={faPhoneVolume}
                        className="contact_icon"
                      />
                    </div>
                    <div className="contact_infor_text">
                      <p>024 3872 3872 - 024 7106 6858</p>
                    </div>
                  </div>
                  <div className="contact_infor_item">
                    <div className="contact_infor_icon">
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className="contact_icon"
                      />
                    </div>
                    <div className="contact_infor_text">
                      <p>cskh@tamanhhospital.vn</p>
                    </div>
                  </div>
                  <div className="contact_infor_item">
                    <div className="contact_infor_icon">
                      <FontAwesomeIcon
                        icon={faMapLocation}
                        className="contact_icon"
                      />
                    </div>
                    <div className="contact_infor_text">
                      <p>
                        108 Phố Hoàng Như Tiếp, Phường Bồ Đề, Long Biên, Thành
                        phố Hà Nội
                      </p>
                    </div>
                  </div>
                </Space>
              </Col>

              <Col
                lg={{ span: 10 }}
                sm={{ span: 22, offset: 1 }}
                xs={{ span: 22, offset: 1 }}
              >
                <Form
                  layout="vertical"
                  form={form}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  style={{ marginTop: "30px" }}
                >
                  <Row gutter={24}>
                    {/* Danh xưng */}
                    <Col span={9}>
                      <Form.Item
                        label="Danh xưng"
                        name="vocative"
                        rules={[
                          {
                            required: true,
                            message: "Hãy chọn danh xưng của bạn!",
                          },
                        ]}
                      >
                        <Select
                          style={{ width: "100%" }}
                          placeholder="Chọn danh xưng"
                          size="large"
                        >
                          {optionVocative.map((option) => (
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

                    {/* Họ tên */}
                    <Col span={15}>
                      <Form.Item
                        label="Họ và tên"
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: "Hãy nhập tên của bạn!",
                          },
                        ]}
                      >
                        <Input placeholder="Nhập họ và tên" size="large" />
                      </Form.Item>
                    </Col>

                    {/* SĐT */}
                    <Col span={9}>
                      <Form.Item
                        label="Số điện thoại"
                        name="phoneNumber"
                        rules={[
                          {
                            pattern: /^[0-9]{0,12}$/,
                            message: "Hãy nhập đúng định dạng số điện thoại!",
                          },

                          {
                            required: true,
                            message: "Hãy nhập số điện thoại của bạn!",
                          },
                        ]}
                      >
                        <Input placeholder="Nhập số điện thoại" size="large" />
                      </Form.Item>
                    </Col>

                    {/*Gmail*/}
                    <Col span={15}>
                      <Form.Item
                        label="Gmail"
                        name="gmail"
                        rules={[
                          {
                            type: "email",
                            message: "Hãy nhập đúng định dạng của gmail!",
                          },

                          {
                            required: true,
                            message: "Hãy nhập gmail của bạn!",
                          },
                        ]}
                      >
                        <Input placeholder="Nhập gmail" size="large" />
                      </Form.Item>
                    </Col>

                    {/* Lời nhắn */}
                    <Col span={24}>
                      <Form.Item
                        label="Lời nhắn"
                        name="note"
                        rules={[
                          {
                            required: true,
                            message: "Hãy nhập lời nhắn của bạn!",
                          },
                        ]}
                      >
                        <Input.TextArea rows={6} showCount maxLength={255} />
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          size="large"
                          icon={<FontAwesomeIcon icon={faPaperPlane} />}
                        >
                          Gửi thông tin
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
}
