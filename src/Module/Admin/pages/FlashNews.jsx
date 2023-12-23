import {
  Button,
  Card,
  Col,
  DatePicker,
  Image,
  Input,
  Layout,
  Row,
  Select,
  Table,
  message,
} from "antd";
import Upload from "antd/es/upload/Upload";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { json } from "react-router-dom";
import { API_URL } from "../../../../API";

const { Header, Footer, Sider, Content } = Layout;
const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 100,
  lineHeight: "64px",
  backgroundColor: "#7dbcea",
  width: "100%",
};
const { RangePicker } = DatePicker;
const FlashNews = () => {
  const [img, setImg] = useState(null);
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [Update, setUpdate] = useState(false);
  const [userData, setUserData] = useState([]);
  const [visible, setVisible] = useState("");
  const [date, setDate] = useState("");
  const [side, setSide] = useState("");
  const [noOfImpression, setNoOfImpression] = useState("");
  const [Impression, setImpression] = useState(0);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setImpression((prevImpression) => prevImpression + 1);
  }, []);
  useEffect(() => {
    console.log("h");
    axios
      .get(`${API_URL}/flashnews`)
      .then((users) => {
        setUserData(users.data.reverse());
        console.log(users);
      })
      .catch((err) => {
        console.log("err=>>>", err);
      });
  }, []);
  const onUpload = () => {
    setLoading(true);
    axios
      .post(`${API_URL}/flashnews?id=${localStorage.getItem("id")}`, {
        link: link,
        slugName: title,
      })
      .then((data) => {
        message.success("Your Ad was successfully Uploaded");
        setLink("");
        setLoading(false);
        setTitle("");
      })
      .catch(() => {
        message.error("Your Ad was not successfully Uploaded");
        setLoading(false);
      });
  };
  const columns = [
    {
      title: "Title",
      dataIndex: "slugName",
      key: "slugName",
    },
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
      render: (_, { link }) => (
        <a href={link} target="_blank">
          {link}
        </a>
      ),
    },
  ];
  return (
    <>
      <h1
        style={{
          color: "rgba(0,0,0,0.8)",
          marginBottom: 10,
          textAlign: "left",
          fontFamily: "Poppins",
        }}
      >
        Flash News
      </h1>
      <Card style={{ width: "100%", height: "100%" }}>
        <Row gutter={6}>
          <Col span={6}>
            <Input
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Col>
          <Col span={6}>
            <Input
              placeholder="Enter Link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </Col>

          <Col style={{ marginTop: 0 }} span={6}>
            <Button
              style={{ width: "100%" }}
              loading={loading}
              type="primary"
              onClick={onUpload}
            >
              Upload{" "}
            </Button>
          </Col>
        </Row>

        <Row>
          <Col span={24} style={{ marginTop: 20 }}>
            <Table columns={columns} dataSource={userData} />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default FlashNews;
