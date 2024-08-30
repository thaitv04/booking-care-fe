import { Carousel } from "antd";
import "./Carosel.css";

export default function Carosel() {
  return (
    <>
      <Carousel autoplay autoplaySpeed={7300}>
        <div className="carosel_item">
          <img src="https://tamanhhospital.vn/wp-content/uploads/2020/12/banner-chuyen-gia-bac-si-desk.jpg" alt="banner" className="carosel_image"/>
        </div>
        <div className="carosel_item">
          <img src="https://tamanhhospital.vn/wp-content/uploads/2023/06/banner-kham-vip-ivf-desk.jpg" alt="banner" className="carosel_image"/>
        </div>
        <div className="carosel_item">
          <img src="https://tamanhhospital.vn/wp-content/uploads/2020/12/banner-chuyen-muc-benh-hoc-desk.jpg" alt="banner" className="carosel_image"/>
        </div>
      </Carousel>
    </>
  );
}
