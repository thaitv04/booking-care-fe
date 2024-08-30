import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import "./Footer.css";
import "../../base.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faYoutube,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faLocationDot,
  faEnvelope,
  faPhoneVolume,
} from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <>
      <footer>
        <Row gutter={[24, 24]}>
          <Col md={{ span: 12 }} xs={{ span: 24 }}>
            <div>
              <p className="footer_title">TamAnhHospital</p>
              <Row gutter={[16, 8]}>
                <Col span={3} offset={1}>
                  <Link
                    to="https://www.facebook.com/benhvientamanh"
                    className="footer_link"
                  >
                    <FontAwesomeIcon
                      icon={faFacebookF}
                      className="footer_icon"
                    />
                  </Link>
                </Col>
                <Col span={3} offset={1}>
                  <Link
                    to="https://www.facebook.com/benhvientamanh"
                    className="footer_link"
                  >
                    <FontAwesomeIcon icon={faYoutube} className="footer_icon" />
                  </Link>
                </Col>
                <Col span={3} offset={1}>
                  <Link
                    to="https://www.facebook.com/benhvientamanh"
                    className="footer_link"
                  >
                    <FontAwesomeIcon
                      icon={faInstagram}
                      className="footer_icon"
                    />
                  </Link>
                </Col>
                <Col span={3} offset={1}>
                  <Link
                    to="https://www.facebook.com/benhvientamanh"
                    className="footer_link"
                  >
                    <FontAwesomeIcon icon={faTwitter} className="footer_icon" />
                  </Link>
                </Col>
              </Row>
              <p className="footer_text">
                CÔNG TY CỔ PHẦN BỆNH VIỆN ĐA KHOA TÂM ANH
              </p>
              <p className="footer_text">Số đăng ký kinh doanh: 0102362369</p>
              <p className="footer_text">
                Cấp bởi Sở kế hoạch và đầu tư Thành phố Hà Nội, đăng ký lần đầu
                ngày 11 tháng 9 năm 2007
              </p>
            </div>
          </Col>

          <Col sm={{ span: 12 }} xs={{ span: 24 }}>
            <div>
              <p className="footer_title">Liên hệ</p>
              <Row gutter={16}>
                <Col span={2}>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="footer_icon_2"
                  />
                </Col>
                <Col span={22}>
                  <p className="footer_text">
                    108 Phố Hoàng Như Tiếp, P. Bồ Đề, Q. Long Biên, Tp. Hà Nội
                  </p>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={2}>
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="footer_icon_2"
                  />
                </Col>
                <Col span={22}>
                  <p className="footer_text">cskh@tamanhhospital</p>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={2}>
                  <FontAwesomeIcon
                    icon={faPhoneVolume}
                    className="footer_icon_2"
                  />
                </Col>
                <Col span={22}>
                  <p className="footer_text">024 3872 3872</p>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </footer>
    </>
  );
}
