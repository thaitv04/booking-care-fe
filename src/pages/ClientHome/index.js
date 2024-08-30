import Carosel from "../../components/Carosel";
import "./ClientHome.css";
import "../../base.css";
import { Card, Col, Row } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStethoscope,
  faNotesMedical,
  faBriefcaseMedical,
  faCircleCheck,
  faHeadphones,
  faArrowRight,
  faUserDoctor,
  faUser,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Meta from "antd/es/card/Meta";
import FormBooking from "../../components/FormBooking";
import { useEffect, useState } from "react";
import { getAllMajors } from "../../services/MajorServices";

export default function ClientHome() {
  const [isFormBookingOpen, setIsFormBookingOpen] = useState(false);
  const [optionMajor, setOptionMajor] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getAllMajors({});
      if (Array.isArray(result.data)) {
        setOptionMajor(result.data.slice(0,6));
      } else {
        setOptionMajor([]);
      }
    };
    fetchApi();
  }, []);

  const truncateDescription = (description, maxLength) => {
    return description.length > maxLength
      ? description.substring(0, maxLength) + "..."
      : description;
  };

  const showBookingForm = () => {
    setIsFormBookingOpen(true);
  };
  const handleOkFormBooking = () => {
    setIsFormBookingOpen(false);
  };
  const handleCancelFormBooking = () => {
    setIsFormBookingOpen(false);
  };
  return (
    <>
      <Carosel />

      {/* Home overview */}
      <Row>
        <Col
          xl={{ span: 18, offset: 3 }}
          lg={{ span: 22, offset: 1 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
        >
          <div className="home_overview">
            <Row gutter={[20, 24]}>
              <Col lg={{ span: 8 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                <div className="home_overview_item">
                  <div className="home_overview_icon">
                    <FontAwesomeIcon
                      icon={faNotesMedical}
                      className="home_overview_fa"
                    />
                  </div>
                  <div className="home_overview_intro">
                    <p className="home_overview_title">Chuyên khoa</p>
                    <p className="home_overview_description">
                      Hệ thống chuyên khoa đa dạng, mang đến dịch vụ chăm sóc
                      sức khỏe toàn diện.
                    </p>
                    <Link className="link_with_line home_overview_link">
                      + Danh sách chuyên khoa
                    </Link>
                  </div>
                </div>
              </Col>
              <Col lg={{ span: 8 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                <div className="home_overview_item">
                  <div className="home_overview_icon">
                    <FontAwesomeIcon
                      icon={faStethoscope}
                      className="home_overview_fa"
                    />
                  </div>
                  <div className="home_overview_intro">
                    <p className="home_overview_title">Đội ngũ chuyên gia</p>
                    <p className="home_overview_description">
                      Quy tụ các chuyên gia đầu ngành, bác sĩ giàu kinh nghiệm,
                      tận tâm, chu đáo.
                    </p>
                    <Link className="link_with_line home_overview_link">
                      + Danh sách bác sĩ
                    </Link>
                  </div>
                </div>
              </Col>
              <Col lg={{ span: 8 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                <div className="home_overview_item">
                  <div className="home_overview_icon">
                    <FontAwesomeIcon
                      icon={faBriefcaseMedical}
                      className="home_overview_fa"
                    />
                  </div>
                  <div className="home_overview_intro">
                    <p className="home_overview_title">Dịch vụ 24/7</p>
                    <p className="home_overview_description">
                      Nhân viên cấp cứu luôn sẵn sàng 24 giờ một ngày, bảy ngày
                      một tuần.
                    </p>
                    <Link className="link_with_line home_overview_link">
                      + Liên hệ với chúng tôi
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      {/* Home about us*/}
      <div className="home_about">
        <Row>
          <Col lg={{ span: 11, offset: 1 }} className="hiddenOnMobile">
            <img
              src="https://assets-global.website-files.com/65bb1ade509e90321a2f3fb7/65bb1ade509e90321a2f40e6_doctor-with-record.png"
              alt="about us"
              className="home_about_img hiddenOnMobile"
            />
          </Col>
          <Col
            lg={{ span: 11 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
            className="home_about_right"
          >
            <div className="home_about_content">
              <h2 className="section_title">
                Chào mừng đến với Bệnh viện Tâm Anh
              </h2>
              <p className="section_text">
                Đội ngũ chuyên gia được đào tạo bài bản cùng những công nghệ
                chữa bệnh mới nhất sẽ giúp bạn phục hồi sức khỏe một cách nhanh
                chóng và dễ dàng.
              </p>
              <div className="home_about_box">
                <Row gutter={[24, 24]}>
                  <Col lg={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                    <div className="home_about_item">
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className="home_about_icon"
                      />
                      <span className="home_about_text">
                        Trang thiết bị hiện đại
                      </span>
                    </div>
                  </Col>
                  <Col lg={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                    <div className="home_about_item">
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className="home_about_icon"
                      />
                      <span className="home_about_text">
                        Quy trình toàn diện, khoa học
                      </span>
                    </div>
                  </Col>
                  <Col lg={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                    <div className="home_about_item">
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className="home_about_icon"
                      />
                      <span className="home_about_text">
                        Chuyên gia đầu ngành - Chuyên viên chuyên nghiệp
                      </span>
                    </div>
                  </Col>
                  <Col lg={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                    <div className="home_about_item">
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className="home_about_icon"
                      />
                      <span className="home_about_text">
                        Dịch vụ cao cấp - Chi phí hợp lý
                      </span>
                    </div>
                  </Col>
                  <Col span={24}>
                    <button type="button" className="home_about_button" onClick={showBookingForm}>
                      Đặt lịch khám
                    </button>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      {/*Home major*/}
      <div className="home_major">
        <h2 className=" section_title_center">Chuyên khoa</h2>
        <Row>
          <Col
            lg={{ span: 18, offset: 3 }}
            md={{ span: 22, offset: 1 }}
            xs={{ span: 22, offset: 1 }}
          >
            <Row gutter={[24, 66]}>
            {optionMajor.map((major) => (
                <Col
                  lg={{ span: 8 }}
                  md={{ span: 12 }}
                  sm={{ span: 24 }}
                  xs={{ span: 24 }}
                  key={major.id}
                >
                  <div className="home_major_item">
                    <div className="home_major_image">
                      <img
                        src={major.image}
                        alt={major.name}
                      />
                    </div>
                    <Link className="home_major_name">
                      {major.name}
                    </Link>
                    <p className="home_major_intro">
                    {truncateDescription(major.shortDescription, 200)}
                    </p>
                    <Link className="link_with_line home_major_link">
                      + Xem chi tiết
                    </Link>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
        <div className="home_major_footer">
          <button className="home_major_button" type="button">
            Xem danh sách chuyên khoa
          </button>
        </div>
      </div>

      {/*Home doctor */}
      <div className="home_doctor">
        <Row>
          <Col
            lg={{ span: 18, offset: 3 }}
            sm={{ span: 22, offset: 1 }}
            xs={{ span: 22, offset: 1 }}
          >
            <Row gutter={[30, 24]}>
              <Col lg={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                <p className="section_title">
                  Nhận tư vấn từ những chuyên gia hàng đầu
                </p>
                <p className="section_text ">
                  Quy tụ đội ngũ chuyên gia đầu ngành, bác sĩ chuyên môn cao,
                  giàu kinh nghiệm.
                </p>
              </Col>
              <Col lg={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                <div className="home_doctor_box">
                  <Link className="home_doctor_item">
                    <div className="home_doctor_item_left">
                      <div className="home_doctor_box_icon">
                        <FontAwesomeIcon
                          icon={faUserDoctor}
                          style={{ color: "var(--blue1)", marginRight: "10px" }}
                          className="home_doctor_icon"
                        />
                      </div>
                      <div className="home_doctor_box_text">
                        <p
                          className="section_text"
                          style={{ marginBottom: "0px" }}
                        >
                          Xem danh sách bác sĩ
                        </p>
                      </div>
                    </div>
                    <div className="home_doctor_item_right">
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        style={{ color: "#ffffff" }}
                        className="home_doctor_icon"
                      />
                    </div>
                  </Link>
                  <Link className="home_doctor_item">
                    <div className="home_doctor_item_left">
                      <div className="home_doctor_box_icon">
                        <FontAwesomeIcon
                          icon={faHeadphones}
                          style={{ color: "var(--blue1)", marginRight: "10px" }}
                          className="home_doctor_icon"
                        />
                      </div>
                      <div className="home_doctor_box_text">
                        <p
                          className="section_text"
                          style={{ marginBottom: "0px" }}
                        >
                          Hỗ trợ 24x7
                        </p>
                      </div>
                    </div>
                    <div className="home_doctor_item_right">
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        style={{ color: "#ffffff" }}
                        className="home_doctor_icon"
                      />
                    </div>
                  </Link>
                  <Link className="home_doctor_item">
                    <div className="home_doctor_item_left">
                      <div className="home_doctor_box_icon">
                        <FontAwesomeIcon
                          icon={faBriefcaseMedical}
                          style={{ color: "var(--blue1)", marginRight: "10px" }}
                          className="home_doctor_icon"
                        />
                      </div>
                      <div className="home_doctor_box_text">
                        <p
                          className="section_text"
                          style={{ marginBottom: "0px" }}
                        >
                          Dịch vụ cao cấp
                        </p>
                      </div>
                    </div>
                    <div className="home_doctor_item_right">
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        style={{ color: "#ffffff" }}
                        className="home_doctor_icon"
                      />
                    </div>
                  </Link>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>

      {/*Home article */}
      <div className="home_article">
        <h2 className=" section_title_center" style={{ marginBottom: "50px" }}>
          Tin tức
        </h2>
        <Row>
          <Col
            lg={{ span: 18, offset: 3 }}
            md={{ span: 22, offset: 1 }}
            xs={{ span: 22, offset: 1 }}
          >
            <Row gutter={[24, 66]}>
              <Col
                lg={{ span: 8 }}
                md={{ span: 12 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
              >
                <Link className="home_article_item">
                  <Card
                    hoverable
                    cover={
                      <img
                        alt="example"
                        src="https://tamanhhospital.vn/wp-content/uploads/2024/04/case-15-nam-co-giat-mat-gay-mat-ngu-meo-mieng.jpg"
                      />
                    }
                  >
                    <p className="home_article_major">Thần kinh</p>
                    <Meta
                      title="15 năm co giật mặt gây mất ngủ, méo miệng"
                      style={{ fontSize: "20px" }}
                    />
                    <Row className="home_article_info">
                      <Col
                        lg={{ span: 12 }}
                        sm={{ span: 24 }}
                        xs={{ span: 24 }}
                      >
                        <FontAwesomeIcon
                          icon={faUser}
                          style={{ color: "var(--blue1)", marginRight: "10px" }}
                        />
                        <span className="home_article_author">
                          Phạm Huy Hoàng
                        </span>
                      </Col>
                      <Col
                        lg={{ span: 12 }}
                        sm={{ span: 24 }}
                        xs={{ span: 24 }}
                      >
                        <FontAwesomeIcon
                          icon={faCalendar}
                          style={{ color: "var(--blue1)", marginRight: "10px" }}
                        />
                        <span className="home_article_author">07/03/2024</span>
                      </Col>
                    </Row>
                    <Link className="link_with_line home_major_link">
                      + Xem chi tiết
                    </Link>
                  </Card>
                </Link>
              </Col>
              <Col
                lg={{ span: 8 }}
                md={{ span: 12 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
              >
                <Link className="home_article_item">
                  <Card
                    hoverable
                    cover={
                      <img
                        alt="example"
                        src="https://tamanhhospital.vn/wp-content/uploads/2024/04/case-15-nam-co-giat-mat-gay-mat-ngu-meo-mieng.jpg"
                      />
                    }
                  >
                    <p className="home_article_major">Thần kinh</p>
                    <Meta
                      title="15 năm co giật mặt gây mất ngủ, méo miệng"
                      style={{ fontSize: "20px" }}
                    />
                    <Row className="home_article_info">
                      <Col
                        lg={{ span: 12 }}
                        sm={{ span: 24 }}
                        xs={{ span: 24 }}
                      >
                        <FontAwesomeIcon
                          icon={faUser}
                          style={{ color: "var(--blue1)", marginRight: "10px" }}
                        />
                        <span className="home_article_author">
                          Phạm Huy Hoàng
                        </span>
                      </Col>
                      <Col
                        lg={{ span: 12 }}
                        sm={{ span: 24 }}
                        xs={{ span: 24 }}
                      >
                        <FontAwesomeIcon
                          icon={faCalendar}
                          style={{ color: "var(--blue1)", marginRight: "10px" }}
                        />
                        <span className="home_article_author">07/03/2024</span>
                      </Col>
                    </Row>
                    <Link className="link_with_line home_major_link">
                      + Xem chi tiết
                    </Link>
                  </Card>
                </Link>
              </Col>
              <Col
                lg={{ span: 8 }}
                md={{ span: 12 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
              >
                <Link className="home_article_item">
                  <Card
                    hoverable
                    cover={
                      <img
                        alt="example"
                        src="https://tamanhhospital.vn/wp-content/uploads/2024/04/case-15-nam-co-giat-mat-gay-mat-ngu-meo-mieng.jpg"
                      />
                    }
                  >
                    <p className="home_article_major">Thần kinh</p>
                    <Meta
                      title="15 năm co giật mặt gây mất ngủ, méo miệng"
                      style={{ fontSize: "20px" }}
                    />
                    <Row className="home_article_info">
                      <Col
                        lg={{ span: 12 }}
                        sm={{ span: 24 }}
                        xs={{ span: 24 }}
                      >
                        <FontAwesomeIcon
                          icon={faUser}
                          style={{ color: "var(--blue1)", marginRight: "10px" }}
                        />
                        <span className="home_article_author">
                          Phạm Huy Hoàng
                        </span>
                      </Col>
                      <Col
                        lg={{ span: 12 }}
                        sm={{ span: 24 }}
                        xs={{ span: 24 }}
                      >
                        <FontAwesomeIcon
                          icon={faCalendar}
                          style={{ color: "var(--blue1)", marginRight: "10px" }}
                        />
                        <span className="home_article_author">07/03/2024</span>
                      </Col>
                    </Row>
                    <Link className="link_with_line home_major_link">
                      + Xem chi tiết
                    </Link>
                  </Card>
                </Link>
              </Col>
              <Col
                lg={{ span: 8 }}
                md={{ span: 12 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
              >
                <Link className="home_article_item">
                  <Card
                    hoverable
                    cover={
                      <img
                        alt="example"
                        src="https://tamanhhospital.vn/wp-content/uploads/2024/04/case-15-nam-co-giat-mat-gay-mat-ngu-meo-mieng.jpg"
                      />
                    }
                  >
                    <p className="home_article_major">Thần kinh</p>
                    <Meta
                      title="15 năm co giật mặt gây mất ngủ, méo miệng"
                      style={{ fontSize: "20px" }}
                    />
                    <Row className="home_article_info">
                      <Col
                        lg={{ span: 12 }}
                        sm={{ span: 24 }}
                        xs={{ span: 24 }}
                      >
                        <FontAwesomeIcon
                          icon={faUser}
                          style={{ color: "var(--blue1)", marginRight: "10px" }}
                        />
                        <span className="home_article_author">
                          Phạm Huy Hoàng
                        </span>
                      </Col>
                      <Col
                        lg={{ span: 12 }}
                        sm={{ span: 24 }}
                        xs={{ span: 24 }}
                      >
                        <FontAwesomeIcon
                          icon={faCalendar}
                          style={{ color: "var(--blue1)", marginRight: "10px" }}
                        />
                        <span className="home_article_author">07/03/2024</span>
                      </Col>
                    </Row>
                    <Link className="link_with_line home_major_link">
                      + Xem chi tiết
                    </Link>
                  </Card>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
        <div className="home_major_footer">
          <button className="home_major_button" type="button">
            Xem thêm
          </button>
        </div>
      </div>

      {/*Form */}
      <FormBooking
        isFormBookingOpen={isFormBookingOpen}
        handleOkFormBooking={handleOkFormBooking}
        handleCancelFormBooking={handleCancelFormBooking}
      />
    </>
  );
}
