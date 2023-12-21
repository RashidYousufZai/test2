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

  // Map route names to display labels
  const routeLabels = {
    users: "Create User",
    upload: "Upload",
    topstories: "Top Stories",
    breakingnews: "Breaking News",
    report: "Report",
    content: "Tags&Category",
    live: "Live",
    ads: "Advertisement",
    comment: "Comments",
    poll: "Poll",
    creatuser: "Create User",
    dashboard: "Articles",
  };

  const renderMenuItem = (key, icon, route, to) => {
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
          {routeLabels[route] || route}
        </Link>
      </Menu.Item>
    );
  };

  return (
    <Menu theme="dark" mode="inline">
      {access.map((route, index) =>
        renderMenuItem(
          index,
          <BiRadioCircleMarked size={25} />,
          route,
          `/dashboard/${route}`
        )
      )}

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
