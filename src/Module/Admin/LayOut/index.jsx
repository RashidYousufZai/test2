// Import necessary modules and components
import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { Route, Routes, useLocation } from "react-router-dom";
import axios from "axios";
import SideBar from "../../../Components/AdminComponets/SideBar";
import AdminTable from "../pages/Table";
import Dashboard from "../pages/Dashboard";
import Upload from "../pages/Upload";
import CreateUser from "../pages/CreateUser";
import TopStories from "../pages/TopStories";
import BreakingNews from "../pages/BreakingNews";
import Report from "../Report";
import TagsAndCategory from "../pages/TagsAndCategory";
import Ads from "../pages/Ads";
import Comments from "../pages/Comments";
import Live from "../pages/Live";
import Poll from "../pages/Poll";
import { API_URL } from "../../../../API";

const { Sider, Content } = Layout;

const contentStyle = {
  textAlign: "center",
  height: "100%",
  minHeight: "100vh",
  color: "#fff",
  padding: "20px",
};

const siderStyle = {
  minHeight: "100vh",
  height: "100%",
  position: "fixed",
  zIndex: 1,
  overflowY: "auto",
};

const siderStyle2 = {
  minHeight: "100vh",
  height: "100%",
};

const AdminLayout = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const [access, setAccess] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/user?id=${localStorage.getItem("id")}`)
      .then((user) => {
        if (user.data[0].role === "admin") {
          setAccess([
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
          ]);
        } else {
          setAccess(user?.data[0]?.acsses);
        }
      });
  }, [location]);

  const accessibleRoutes = [
    { path: "dashboard", element: <Dashboard /> },
    { path: "users", element: <AdminTable /> },
    { path: "upload", element: <Upload /> },
    { path: "topstories", element: <TopStories /> },
    { path: "breakingnews", element: <BreakingNews /> },
    { path: "report", element: <Report /> },
    { path: "content", element: <TagsAndCategory /> },
    { path: "live", element: <Live /> },
    { path: "ads", element: <Ads /> },
    { path: "comment", element: <Comments /> },
    { path: "poll", element: <Poll /> },
    { path: "creatuser", element: <CreateUser /> },
  ];

  return (
    <Layout>
      <Sider style={siderStyle}>
        <SideBar />
      </Sider>
      <Sider style={siderStyle2}></Sider>
      <Content style={contentStyle}>
        <Routes>
          {/* <Route path={"dashboard"} element={<Dashboard />} /> */}
          {accessibleRoutes
            .filter((route) => access.includes(route.path))
            .map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          <Route
            path="*"
            element={<div style={{ color: "black" }}>No Access</div>}
          />
        </Routes>
      </Content>
    </Layout>
  );
};

export default AdminLayout;
