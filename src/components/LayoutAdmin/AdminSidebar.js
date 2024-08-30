import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartSimple,
  faBookMedical,
  faUserDoctor,
  faSheetPlastic,
  faHospitalUser,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const URL = "/admin";

const items = [
  {
    key: "1",
    icon: <FontAwesomeIcon icon={faChartSimple} className="home_overview_fa" />,
    label: "Dashboard",
    path: URL,
  },
  {
    key: "2",
    icon: <FontAwesomeIcon icon={faBookMedical} className="home_overview_fa" />,
    label: "Chuyên khoa",
    path: URL + "/majors",
  },
  {
    key: "3",
    icon: <FontAwesomeIcon icon={faUserDoctor} className="home_overview_fa" />,
    label: "Bác sĩ",
    children: [
      {
        key: "3-1",
        label: "Bác sĩ đang làm việc",
        path: URL + "/doctors",
      },
      {
        key: "3-2",
        label: "Bác sĩ nghỉ hưu",
        path: URL + "/doctors/leave",
      },
    ],
  },
  {
    key: "4",
    icon: <FontAwesomeIcon icon={faHospitalUser} />,
    label: "Lịch khám bệnh",
    path: URL + "/bookings",
  },
  {
    key: "5",
    icon: <FontAwesomeIcon icon={faSheetPlastic} />,
    label: "Bài viết",
    path: URL + "/articles",
  },
];

export default function AdminSidebar({ collapsed }) {
  return (
    <>
      <p
        style={{
          color: "white",
          padding: "0 10px",
          textAlign: "center",
          fontSize: "21px",
          fontWeight: "bold",
          lineHeight: "60px",
        }}
      >
        <FontAwesomeIcon icon={faUserTie} />
        {!collapsed && <span style={{ marginLeft: "10px" }}>Admin</span>}
      </p>
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
      {items.map((item) => {
        if (item.children) {
          return (
            <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
              {item.children.map((child) => (
                <Menu.Item key={child.key}>
                  <Link to={child.path}>{child.label}</Link>
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          );
        } else {
          return (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.path}>{item.label}</Link>
            </Menu.Item>
          );
        }
      })}
    </Menu>
    </>
  );
}
