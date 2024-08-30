import {
  faArrowRightFromBracket,
  faChevronDown,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, Dropdown, Image } from "antd";
import { useNavigate } from "react-router-dom";
import { clearAuth } from "../../utils/axiosConfig";

const avatarStyles = {
  cursor: "pointer",
  backgroundColor: "#001529",
  border: "1px solid #001529",
  color: "#FFFFFF",
};

const buttonStyles = {
  border: "none",
  width: "150px",
  fontSize: "18px"
};

export default function DoctorHeader() {
  const navigate = useNavigate();

  const goToDoctorSettings = () => {
    navigate("/doctor/settings");
  };

  const logout = () => {
    clearAuth();
    navigate("/login");
  }

  const items = [
    {
      key: "1",
      label: (
        <Image
          width={150}
          height={150}
          src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ2dlIj6cKvUV7rgiBMxVKcNnIDV_xWUBgoysWfkz2sJwic6Chv"
        />
      ),
    },
    {
      key: "2",
      label: (
        <Button
          style={buttonStyles}
          icon={
            <FontAwesomeIcon icon={faGear} style={{ marginRight: "7px" }} />
          }
          onClick={goToDoctorSettings}
        >
          Cài đặt
        </Button>
      ),
    },
    {
      key: "3",
      label: (
        <Button style={buttonStyles} onClick={logout}>
          <FontAwesomeIcon
            icon={faArrowRightFromBracket}
            style={{ marginRight: "7px" }}
          />
          Đăng xuất
        </Button>
      ),
    },
  ];

  return (
    <>
      <Dropdown
        menu={{
          items,
        }}
        trigger={["click"]}
        placement="bottom"
      >
        <button style={avatarStyles}>
          <Avatar
            shape="square"
            size="large"
            src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ2dlIj6cKvUV7rgiBMxVKcNnIDV_xWUBgoysWfkz2sJwic6Chv"
          />
          <FontAwesomeIcon icon={faChevronDown} style={{ marginLeft: "7px" }} />
        </button>
      </Dropdown>
    </>
  );
}
