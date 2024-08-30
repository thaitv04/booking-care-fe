/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  DatePicker,
  Flex,
  Form,
  Image,
  Input,
  Upload,
  Tabs,
} from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../CustomAntd.css";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function AdminSetting() {
  const id = useParams();
  const [form, form2] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);

  const dobChange = (date, dateString) => {
    setDateOfBirth(dateString);
  };

  const datePickkerStyle = {
    width: "100%",
  };

  // Gọi khi xem trước ảnh
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 18,
    },
  };

  const data = {
    id: "1",
    gmail: "hoangphamhuy275132@gmail.com",
    name: "Phạm Huy Hoàng",
    phoneNumber: "0985693949",
    username: "gacon123",
    dateOfBirth: "07/03/2003",
    image:
      "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ2dlIj6cKvUV7rgiBMxVKcNnIDV_xWUBgoysWfkz2sJwic6Chv",
  };

  useEffect(() => {
    if (data.id) {
      form.setFieldsValue({
        ...data,
        dateOfBirth: moment(data.dateOfBirth, "DD/MM/YYYY"),
      });
      setFileList([
        {
          uid: `-1`,
          name: `image.png`,
          status: "done",
          url: data.image,
        },
      ]);
    }
  }, [id.id, form]);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList || [];
  };

  const onFinish = (values) => {
    values.dateOfBirth = dateOfBirth;
    let finalValues = {
      id: id.id,
      ...values,
    };
    console.log(finalValues);
  };

  var onFinishFailed = (errorInfo) => {
    console.log("errorInfo");
  };

  const onFinish2 = (values) => {
    let finalValues = {
      ...values,
    };
    console.log(finalValues);
  };

  const formUpdateAdmin = (
    <>
      <Form
        layout="horizontal"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        {...formItemLayout}
      >
        {/* Họ và tên */}
        <Form.Item
          label="Họ và tên"
          name="name"
          rules={[
            {
              required: true,
              message: "Hãy nhập họ và tên!",
            },
          ]}
        >
          <Input placeholder="Nhập họ và tên" />
        </Form.Item>

        {/* Ngày sinh */}
        <Form.Item
          label="Ngày sinh"
          name="dateOfBirth"
          rules={[
            {
              required: true,
              message: "Hãy nhập ngày sinh!",
            },
          ]}
        >
          <DatePicker style={datePickkerStyle} onChange={dobChange} />
        </Form.Item>

        {/* Gmail */}
        <Form.Item
          label="Gmail"
          name="gmail"
          rules={[
            {
              required: true,
              message: "Hãy nhập gmail!",
            },
            {
              type: "email",
              message: "Hãy nhập đúng định dạng của gmail!",
            },
          ]}
        >
          <Input placeholder="Nhập gmail" />
        </Form.Item>

        {/* SĐT */}
        <Form.Item
          label="Số điện thoại"
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: "Hãy nhập số điện thoại!",
            },
            {
              pattern: /^[0-9]{0,12}$/,
              message: "Hãy nhập đúng định dạng số điện thoại!",
            },
          ]}
        >
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>

        {/* Tên đăng nhập */}
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
          <Input placeholder="Nhập tên đăng nhập" readOnly />
        </Form.Item>

        {/* Avatar */}
        <Form.Item
          name="image"
          label="Hình ảnh"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            maxCount={1}
          >
            {fileList.length >= 1 ? null : (
              <>
                <button
                  style={{
                    border: 0,
                    background: "none",
                  }}
                  type="button"
                >
                  <FontAwesomeIcon icon={faPlus} />
                  <div>Tải ảnh lên</div>
                </button>
              </>
            )}
          </Upload>
          {previewImage && (
            <Image
              wrapperStyle={{
                display: "none",
              }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              src={previewImage}
            />
          )}
        </Form.Item>

        {/* Nút */}
        <Flex justify="center">
          <Form.Item>
            <Flex justify="center" gap="large">
              <Button type="primary" htmlType="submit" size="large">
                Cập nhật
              </Button>
            </Flex>
          </Form.Item>
        </Flex>
      </Form>
    </>
  );

  const formChangePassword = (
    <>
      <Form
        layout="horizontal"
        form={form2}
        onFinish={onFinish2}
        onFinishFailed={onFinishFailed}
        {...formItemLayout}
      >
        {/* Mật khẩu cũ */}
        <Form.Item
          label="Mật khẩu cũ"
          name="oldPassword"
          rules={[
            {
              required: true,
              message: "Hãy nhập mật khẩu cũ!",
            },
          ]}
        >
          <Input.Password placeholder="Nhập mật khẩu cũ!" />
        </Form.Item>

        {/* Mật khẩu mới */}
        <Form.Item
          label="Mật khẩu mới"
          name="newPassword"
          rules={[
            {
              required: true,
              message: "Hãy nhập mật khẩu mới!",
            },
          ]}
        >
          <Input.Password placeholder="Nhập mật khẩu mới!" />
        </Form.Item>

        {/* Xác nhận mật khẩu */}
        <Form.Item
          label="Xác nhận mật khẩu"
          name="verifyPassword"
          dependencies={["newPassword"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Hãy xác nhận mật khẩu!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Mật khẩu xác nhận không trùng khớp!")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Xác nhận mật khẩu!" />
        </Form.Item>

        {/* Nút */}
        <Flex justify="center">
          <Form.Item>
            <Flex justify="center" gap="large">
              <Button type="primary" htmlType="submit" size="large">
                Cập nhật
              </Button>
            </Flex>
          </Form.Item>
        </Flex>
      </Form>
    </>
  );

  const tabItems = [
    {
      key: "1",
      label: "Cập nhật thông tin cá nhân",
      children: formUpdateAdmin,
    },
    {
      key: "2",
      label: "Đổi mật khẩu",
      children: formChangePassword,
    },
  ];

  return (
    <>
      <Tabs defaultActiveKey="1" items={tabItems} />
    </>
  );
}
