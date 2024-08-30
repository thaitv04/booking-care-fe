import { Button, Col, Flex, Form, Image, Input, Row, Space, message } from "antd";
import "../../CustomAntd.css";
import "./Login.css";
import { login } from '../../services/AuthServices';
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await login(values);
      message.success('Đăng nhập thành công');
      console.log(response);
      const role = window.localStorage.getItem("role");
      if(role === "ROLE_DOCTOR") {
        navigate("/doctor"); 
      } else {
        navigate("/admin"); 
      }
    } catch (error) {
      message.error("Thất bại");
      console.error('Login failed:', error);
    }
  };

  var onFinishFailed = (errorInfo) => {
    console.log("errorInfo");
  };

  const boxStyle = {
    width: "100%",
    height: "100%",
  };

  return (
    <>
      <div className="loginPage">
        <Row style={boxStyle}>
          <Flex style={boxStyle} align="center" justify="start">
            <Col
              xxl={{ span: 8, offset: 2 }}
              xl={{ span: 10, offset: 7 }}
              md={{ span: 14, offset: 5 }}
              sm={{ span: 20, offset: 2 }}
              xs={{ span: 22, offset: 1 }}
            >
              <div className="loginArea">
                <Space
                  direction="vertical"
                  size="large"
                  style={{ display: "flex" }}
                >
                  <Flex justify="center">
                    <Image
                      src="https://healthguardmedicine.com/wp-content/uploads/2023/06/health-guard.png"
                      width={100}
                    />
                  </Flex>
                  <h1 style={{ textAlign: "center", color: "var(--blue1)" }}>
                    BỆNH VIỆN ĐA KHOA TÂM ANH
                  </h1>
                  <h2 style={{ textAlign: "center" }}>Đăng nhập</h2>
                  <Form
                    layout="vertical"
                    form={form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                  >
                    <Form.Item
                      label="Tên đăng nhập"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Hãy nhập tên đăng nhập!",
                        },
                      ]}
                    >
                      <Input placeholder="Nhập tên đăng nhập" size="large" />
                    </Form.Item>

                    <Form.Item
                      label="Mật khẩu"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Hãy nhập mật khẩu!",
                        },
                      ]}
                    >
                      <Input.Password
                        placeholder="Nhập mật khẩu"
                        size="large"
                      />
                    </Form.Item>

                    <Flex justify="center">
                      <Form.Item>
                        <Flex justify="center" gap="large">
                          <Button type="primary" htmlType="submit" size="large">
                            Đăng nhập
                          </Button>
                        </Flex>
                      </Form.Item>
                    </Flex>
                  </Form>
                </Space>
              </div>
            </Col>
          </Flex>
        </Row>
      </div>
    </>
  );
}
