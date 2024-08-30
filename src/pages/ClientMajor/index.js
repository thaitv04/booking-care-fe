import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import "./ClientMajor.css";
import "../../base.css";
import Carosel from "../../components/Carosel";
import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";
import { getAllMajors } from "../../services/MajorServices";

export default function ClientMajor() {
  const onSearch = (value, _e, info) => console.log(value);
  const [optionMajor, setOptionMajor] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getAllMajors({});
      if (Array.isArray(result.data)) {
        setOptionMajor(result.data);
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
  return (
    <>
      <Carosel />
      <div className="major">
        <h2 className=" section_title_center">Chuyên khoa</h2>
        <Row>
          <Col xxl={{span: 8, offset: 8}} xl={{span: 10, offset: 7}} md={{span: 12, offset: 6}} sm={{span: 14, offset: 5}} xs={{span: 18, offset: 3}}>
            <Search
              placeholder="Nhập tên chuyên khoa"
              onSearch={onSearch}
              enterButton
              className="search_bar_client"
              size="large"
            />
          </Col>
        </Row>
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
      </div>
    </>
  );
}
