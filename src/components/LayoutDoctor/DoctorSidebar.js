import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartSimple,
  faUserDoctor,
  faCalendarDay,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const URL = "/doctor";

const items = [
  {
    key: "1",
    icon: <FontAwesomeIcon icon={faChartSimple} className="home_overview_fa" />,
    label: "Dashboard",
    path: URL,
  },
  {
    key: "2",
    icon: <FontAwesomeIcon icon={faCalendarDay} className="home_overview_fa" />,
    label: "Lịch hẹn",
    path: URL + "/booking",
  },
  {
    key: "3",
    icon: <FontAwesomeIcon icon={faClock} />,
    label: "Lịch khám bệnh",
    path: URL + "/calendar",
  },
];

export default function DoctorSidebar({ collapsed }) {
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
        <FontAwesomeIcon icon={faUserDoctor} />
        {!collapsed && <span style={{ marginLeft: "10px" }}>Doctor</span>}
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
