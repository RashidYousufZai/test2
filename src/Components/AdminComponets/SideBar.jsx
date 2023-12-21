import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "antd";
import axios from "axios";
import { OnEdit } from "../../Context";
import { API_URL } from "../../../API";
import { RiAdminFill } from "react-icons/ri";
import { BiRadioCircleMarked } from "react-icons/bi";
import { CiLogout } from "react-icons/ci";

const SideBar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [role, setRole] = useState("");
  const [access, setAccess] = useState([]);
  const { setOnEdit } = useContext(OnEdit);
  const location = useLocation();

  useEffect(() => {
    axios
      .get(`${API_URL}/user?id=${localStorage.getItem("id")}`)
      .then((user) => {
        console.log(user.data, "d");
        setRole(user.data[0].role);
        setAccess(user?.data[0]?.acsses);
        if (user.data[0].role === "admin") {
          setIsAdmin(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [location]);

  const adminRoutes = [
    "users",
    "upload",
    "topstories",
    "breakingnews",
    "report",
    "content",
    "live",
    "ads",
    "comment",
    "poll",
    "creatuser",
  ];

  const renderMenuItem = (key, icon, label, to) => {
    return (
      <Menu.Item key={key} icon={icon}>
        <Link
          style={{
            textTransform: "uppercase",
            fontSize: 14,
            fontWeight: "600",
            fontFamily: "Poppins",
          }}
          to={to}
        >
          {label}
        </Link>
      </Menu.Item>
    );
  };

  return (
    <Menu theme="dark" mode="inline">
      {isAdmin
        ? adminRoutes.map((route, index) =>
            renderMenuItem(
              index,
              <BiRadioCircleMarked size={25} />,
              route,
              `/dashboard/${route}`
            )
          )
        : access.map((route, index) =>
            renderMenuItem(
              index,
              <BiRadioCircleMarked size={25} />,
              route,
              `/dashboard/${route}`
            )
          )}

      {/* {role !== "author" && role !== "journalist" && (
        <Menu.Item key="createuser" icon={<BiRadioCircleMarked size={25} />}>
          <Link
            style={{
              textTransform: "uppercase",
              fontSize: 14,
              fontWeight: "600",
              fontFamily: "Poppins",
            }}
            to="/dashboard/createuser"
          >
            CreateUser
          </Link>
        </Menu.Item>
      )} */}

      <Menu.Item
        style={{
          position: "absolute",
          bottom: 40,
        }}
        onClick={() => {
          localStorage.clear();
        }}
        key="four"
        icon={<CiLogout size={25} />}
      >
        <Link
          style={{ fontSize: 14, fontWeight: "600", fontFamily: "Poppins" }}
          to="/"
        >
          LogOut
        </Link>
      </Menu.Item>
      <Menu.Item
        style={{
          position: "absolute",
          bottom: 0,
        }}
        key="ten"
        icon={<RiAdminFill size={22} />}
      >
        <div
          style={{
            textTransform: "uppercase",
            fontSize: 14,
            fontWeight: "600",
            fontFamily: "Poppins",
          }}
        >
          {role}
        </div>
      </Menu.Item>
    </Menu>
  );
};

export default SideBar;
