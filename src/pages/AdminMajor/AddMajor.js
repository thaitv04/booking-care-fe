/* eslint-disable react-hooks/exhaustive-deps */
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Flex, Form, Image, Input, message, Space, Upload } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../CustomAntd.css";
import {
  createMajor,
  getMajorById,
  updateMajor,
} from "../../services/MajorServices";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function AddMajor() {
  const navigate = useNavigate();

  const backToListMajors = () => {
    navigate("/admin/majors");
  };

  const { id } = useParams();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  //Gọi khi xem trước ảnh
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

  useEffect(() => {
    if (id) {
      const fetchApi = async () => {
        const result = await getMajorById(id);
        if (result) {
          form.setFieldsValue(result.data);
          setFileList([
            {
              uid: `-1`,
              name: `image.png`,
              status: "done",
              url: result.data.image,
            },
          ]);
        }
      };
      fetchApi();
    }
  }, [id, form]);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList || [];
  };

  const onFinish = async (values) => {
    if(id) {
      values.id = id;
    }
    if (fileList.length === 0) {
      message.error("Hãy tải ảnh chuyên khoa!");
      return;
    }

    const formData = new FormData();
    if (fileList.length > 0) {
      formData.append("file", fileList[0].originFileObj);
    }
    formData.append("majordto", JSON.stringify(values));

    try {
      if (id) {
        const response = await updateMajor(formData);
        message.success("Đã sửa thành công");
        console.log(response);
      } else {
        const response = await createMajor(formData);
        message.success("Đã tạo thành công");
        console.log(response);
      }
    } catch (error) {
      message.error("Thất bại");
      console.error("Failed:", error);
    }
    console.log(values);
  };

  var onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  const formAddMajor = (
    <>
      <Form
        layout="horizontal"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        {...formItemLayout}
      >
        {/* Tên chuyên khoa */}
        <Form.Item
          label="Tên chuyên khoa"
          name="name"
          rules={[
            {
              required: true,
              message: "Hãy điền tên chuyên khoa!",
            },
          ]}
        >
          <Input placeholder="Nhập tên chuyên khoa" />
        </Form.Item>

        {/* Mô tả ngắn */}
        <Form.Item
          label="Mô tả ngắn"
          name="shortDescription"
          rules={[
            {
              required: true,
              message: "Hãy điền mô tả ngắn cho chuyên khoa!",
            },
          ]}
        >
          <Input placeholder="Nhập mô tả ngắn" />
        </Form.Item>

        {/* Mô tả */}
        <Form.Item
          label="Mô tả"
          name="description"
          rules={[
            {
              required: true,
              message: "Hãy điền mô tả cho chuyên khoa!",
            },
          ]}
        >
          <Input.TextArea rows={6} showCount maxLength={5000} />
        </Form.Item>

        <Form.Item
          name="image"
          label="Hình ảnh"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            listType="picture-card"
            fileList={fileList}
            beforeUpload={(file) => {
              if (file.size > 2100000) {
                message.error("Dung lượng ảnh chỉ được tối đa 2MB");
                return Upload.LIST_IGNORE;
              }
              setFileList([file]);
              return false;
            }}
            onPreview={handlePreview}
            onChange={handleChange}
            maxCount={1}
            customRequest={({ file, onSuccess }) => {
              setFileList([file]);
              onSuccess();
            }}
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
                {fileList[0]?.name}
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

        <Flex justify="center">
          <Form.Item>
            <Flex justify="center" gap="large">
              <Button type="primary" htmlType="submit" size="large">
                {id ? "Cập nhật" : "Thêm"}
              </Button>
              <Button
                type="primary"
                danger
                onClick={backToListMajors}
                size="large"
              >
                Quay lại
              </Button>
            </Flex>
          </Form.Item>
        </Flex>
      </Form>
    </>
  );

  return (
    <>
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        <h1>{id ? "Sửa thông tin chuyên khoa" : "Thêm mới chuyên khoa"}</h1>
        {formAddMajor}
      </Space>
    </>
  );
}
