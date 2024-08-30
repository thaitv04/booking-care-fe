import { Link } from "react-router-dom";
import { Col, Row, Drawer } from "antd";
import "./Header.css";
import "../../base.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import FormBooking from "../FormBooking";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [isFormBookingOpen, setIsFormBookingOpen] = useState(false);
  
  const showDrawer = () => {
    setOpen(!open);
  };
  const onClose = () => {
    setOpen(false);
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
      <Row>
        <header className="header">
          <Col
            xl={{ span: 3, offset: 1 }}
            lg={{ span: 3 }}
            sm={{ span: 10 }}
            xs={{ span: 10 }}
          >
            <div className="header-logo">
              <Link to="/">TamAnhHospital</Link>
            </div>
          </Col>
          <Col
            xl={{ span: 18, offset: 1 }}
            lg={{ span: 18, offset: 2 }}
            className="hiddenOnMobile"
          >
            <div className="navbar">
              <ul>
                <li>
                  <Link to="/" className="navbar_client_link">
                    Giới thiệu
                  </Link>
                </li>
                <li>
                  <Link to="/majors" className="navbar_client_link">
                    Chuyên khoa
                  </Link>
                </li>
                <li>
                  <Link to="/doctors" className="navbar_client_link">
                    Chuyên gia - Bác sĩ
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="navbar_client_link">
                    Liên hệ
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    className="navbar_booking_button"
                    onClick={showBookingForm}
                  >
                    Đặt lịch
                  </button>
                </li>
              </ul>
            </div>
          </Col>
          <Col
            sm={{ span: 2, offset: 12 }}
            xs={{ span: 2, offset: 10 }}
            className="showOnMobile"
          >
            <button className="navbar_button" onClick={showDrawer}>
              <FontAwesomeIcon icon={faBars} />
            </button>
          </Col>
          <Drawer
            title="Menu"
            placement="top"
            closable={true}
            onClose={onClose}
            open={open}
            key={"top"}
            height={350}
          >
            <ul className="navbarOnMobile">
              <li>
                <Link to="/" className="navbar_client_link">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link to="/majors" className="navbar_client_link">
                  Chuyên khoa
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="navbar_client_link">
                  Chuyên gia - Bác sĩ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="navbar_client_link">
                  Liên hệ
                </Link>
              </li>
              <li>
                <button type="button" className="navbar_booking_button">
                  Đặt lịch
                </button>
              </li>
            </ul>
          </Drawer>

          <FormBooking
            isFormBookingOpen={isFormBookingOpen}
            handleOkFormBooking={handleOkFormBooking}
            handleCancelFormBooking={handleCancelFormBooking}
          />
        </header>
      </Row>
    </>
  );
}
