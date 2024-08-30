import { faAward, faStethoscope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Flex, Row, Space } from "antd";
import React from "react";

export default function DoctorDetail() {
  const styleIcon = {
    fontSize: "45px",
  };
  const data = {
    id: "1",
    name: "Nguyễn Thị Liên Hương",
    description: "BS Nguyễn Thị Liên Hương đã có hơn 20 năm kinh nghiệm trong lĩnh vực Mô phôi học. Bên cạnh công tác chuyên môn, bác sĩ Liên Hương còn dành nhiều thời gian cho hoạt động nghiên cứu khoa học và đóng góp nhiều công trình nghiên cứu, bài báo khoa học trong lĩnh vực Mô phôi học.\nKhông chỉ là một bác sĩ tài năng với nhiều công trình nghiên cứu có giá trị, TS.BS Liên Hương còn là Giảng viên kiêm nhiệm bộ môn Mô – Công nghệ Phôi tại Đại học Y Hà Nội. Nhiều thế hệ bác sĩ ưu tú của ngành Mô phôi học Việt Nam đã được tiếp lửa yêu nghề và trưởng thành dưới sự hướng dẫn của TS.BS Nguyễn Thị Liên Hương.\nSau nhiều năm công tác tại Bệnh viện Phụ sản Trung ương, bác sĩ Liên Hương chính thức trở thành một thành viên của Trung tâm Hỗ trợ sinh sản, Bệnh viện Đa khoa Tâm Anh Hà Nội với vị trí Phó Giám đốc Trung tâm, phụ trách LAB IVF. “Là một đơn vị được đầu tư mạnh mẽ và toàn diện, đặc biệt hệ thống phòng LAB tại IVFTA sở hữu những thiết bị, công nghệ hiện đại nhất trong ngành hỗ trợ sinh sản. Đội ngũ chuyên viên LAB IVFTA đáp ứng được những tiêu chuẩn cao về trình độ chuyên môn và luôn giữ vững cái tâm với nghề, luôn nỗ lực chắt chiu cơ hội làm mẹ, làm cha cho những gia đình hiếm muộn.” – bác sĩ Liên Hương chia sẻ.",
    degree: "GS",
    experience: 10,
    certification: 16,
    major: "Trung tâm hỗ trợ sinh sản",
    avatar: "https://tamanhhospital.vn/wp-content/uploads/2011/01/bac-si-nguyen-thi-lien-huong-avt.png",
    gender: "Nữ"
  }

  return (
    <>
      <div className="background"></div>
      <Row>
        <Col span={22} offset={1}>
          <Row className="doctor_detail_box">
            <Col
              lg={{ span: 10 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
              className="doctor_image_container"
            >
              <div className="doctor_image_box">
                <img src={data.avatar} alt={data.name} />
              </div>
            </Col>
            
            <Col
              lg={{ span: 13, offset: 1 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
            >
              <div className="doctor_info_box_above">
                <h1 className="doctor_detail_name">
                  {data.degree}.{data.name}
                </h1>
                <p className="doctor_detail_major">{data.major}</p>
                <div className="doctor_detail_achievement">
                  <Row gutter={60}>
                    <Col span={6}>
                      <div className="doctor_detail_experinece_box">
                        <Flex justify="center" vertical>
                          <Space
                            direction="vertical"
                            size="small"
                            style={{
                              display: "flex",
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faStethoscope}
                              style={styleIcon}
                              className="icon_doctor_detail"
                            />
                            <p className="doctor_detail_experinece_text">
                              Kinh nghiệm
                            </p>
                            <p className="doctor_detail_experinece">
                              {data.experience}
                            </p>
                          </Space>
                        </Flex>
                      </div>
                    </Col>

                    <Col span={6}>
                      <div className="doctor_detail_experinece_box">
                        <Flex justify="center" vertical>
                          <Space
                            direction="vertical"
                            size="small"
                            style={{
                              display: "flex",
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faAward}
                              style={styleIcon}
                              className="icon_doctor_detail"
                            />
                            <p className="doctor_detail_experinece_text">
                              Giải thường
                            </p>
                            <p className="doctor_detail_experinece">
                              {data.certification}
                            </p>
                          </Space>
                        </Flex>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>

              <div className="doctor_info_box_under">
              <p className="doctor_detail_description">
                  {data.description.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </p>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
