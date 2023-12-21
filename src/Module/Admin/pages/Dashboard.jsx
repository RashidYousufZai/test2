import {
  Button,
  Card,
  Col,
  DatePicker,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Tag,
  message,
  Image,
} from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { OnEdit as onEditContext } from "../../../Context";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../../API";
import moment from "moment/moment";

const { TextArea } = Input;

const { RangePicker } = DatePicker;

const Dashboard = () => {
  // const Dashboard = ({ isAdmin }) => {
  const [articleData, setArticleData] = useState([]);
  const [filterItem, setfilterItem] = useState("keyword");
  const [filterItemResponse, setfilterItemResponse] = useState([]);
  const [qusetion, setQuestion] = useState("");
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalReportedOpen, setIsModalReportedOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const { onEdit, setOnEdit, id, setId } = useContext(onEditContext);
  const [visible, setVisible] = useState("");
  const navigation = useNavigate();
  useEffect(() => {
    axios.get(`${API_URL}/article`).then((article) => {
      setArticleData(article.data.reverse());
      console.log(article);
    });
  }, [axios]);
  const handleDeleteCancel = () => {
    setIsModalDeleteOpen(false);
    setCurrentUser({});
  };
  const ShowDeleteModal = (user) => {
    console.log(user);
    setCurrentUser(user);
    setIsModalDeleteOpen(true);
  };
  const handleReportedCancel = () => {
    setIsModalReportedOpen(false);
    setCurrentUser({});
  };
  const ShowReportedModal = (user) => {
    console.log(user);
    setCurrentUser(user);
    setIsModalReportedOpen(true);
    console.log(user, "user");
  };
  // const onFilter = () => {
  //   let filter = "";
  //   for (let i = 0; i < filterItemResponse.length; i++) {
  //     const element = filterItemResponse[i];
  //     filter += `${element.main}=${element.value}&`;
  //   }
  //   console.log(filter);

  //   axios
  //     .get(`${API_URL}/article?${filter}`)
  //     .then((article) => {
  //       setArticleData(article?.data);
  //       console.log(article);
  //       setfilterItemResponse([]);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  const onFilter = () => {
    if (!filterItemResponse) {
      console.error("filterItemResponse is null or undefined");
      return;
    }

    let filter = "";
    for (let i = 0; i < filterItemResponse.length; i++) {
      const element = filterItemResponse[i];
      if (element.main === "date" && element.value) {
        filter = `${element.main}=${element.value.join(",")}&`;
      } else if (element.main === "newsType" && element.value === "all") {
        // Skip filtering for "All" option in newsType
      } else {
        filter += `${element.main}=${element.value}&`;
      }
    }
    console.log(filter);

    axios
      .get(`${API_URL}/article?${filter}`)
      .then((article) => {
        setArticleData(article?.data);
        console.log(article);
        setfilterItemResponse([]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const OnDelete = () => {
    axios
      .delete(`${API_URL}/article?id=${currentUser._id}`)
      .then(() => {
        message.success("Article Has Successfully Deleted");
        setCurrentUser("");
        setIsModalDeleteOpen(false);
      })
      .catch((err) => {
        console.log(err);
        message.error("Article Has Not Deleted");
        setCurrentUser("");
        setIsModalDeleteOpen(false);
      });
  };
  const OnReported = () => {
    axios
      .post(`${API_URL}/report`, {
        adminId: localStorage.getItem("id"),
        userId: currentUser.UserID,
        articleId: currentUser._id,
        question: qusetion,
      })
      .then((res) => {
        message.success("Article Was Successfully Reported");
        setCurrentUser("");
        setIsModalReportedOpen(false);
        console.log(res.data);
        setQuestion("");
      })
      .catch((err) => {
        console.log(err);
        message.error("Article Was Not Successfully Reported");
        setCurrentUser("");
        setIsModalReportedOpen(false);
      });
  };

  const columns = [
    {
      title: "Serial No.",
      dataIndex: "serialNumber",
      key: "serialNumber",
      render: (_, record, index) => (
        <div style={{ width: "70px" }}>{index + 1}</div>
      ),
    },
    {
      title: "News Id",
      dataIndex: "_id",
      key: "_id",
      sorter: (a, b) => a._id.localeCompare(b._id),
    },
    {
      title: "Date",
      key: "createdAt",
      dataIndex: "createdAt",
      render: (date) => (
        <div style={{ width: "100px" }}>
          {moment(date).format("YYYY-MM-DD")}
        </div>
      ),
      sorter: (a, b) => moment(a.createdAt) - moment(b.createdAt),
    },

    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (_, { type, image, _id }) => {
        let bool = type == "img" ? true : false;
        return bool ? (
          <Image
            width={100}
            style={{
              width: "100px",
              height: "100px",
            }}
            src={image ? image : ""}
            preview={{
              visible: _id == visible,
              src: image,
              onVisibleChange: (value) => {
                setVisible(visible ? "" : _id);
              },
            }}
          />
        ) : (
          // <img
          //   style={{ width: "100px", height: "100px" }}
          //   src={image ? image : ""}
          // />
          <Image
            width={100}
            style={{
              width: "100px",
              height: "100px",
            }}
            src={image ? image : ""}
            preview={{
              imageRender: () => (
                <video muted width="40%" controls src={image ? image : ""} />
              ),
              toolbarRender: () => null,
            }}
          />
        );
      },
    },
    {
      title: "Headline",
      dataIndex: "title",
      key: "title",
      render: (text) => {
        let tt = "";
        if (tt.length < 15) {
          for (let icon = 0; icon < text.length; icon++) {
            const element = text[icon];
            tt += element;
          }
        }
        return <a>{tt + "..."}</a>;
      },
    },
    {
      title: "News Type",
      key: "newsType",
      dataIndex: "publish",
      render: (data, { newsType }) => (
        <a>{newsType ? newsType : "breakingNews"}</a>
      ),
    },
    {
      title: "News",
      dataIndex: "discription",
      key: "discription",
      render: (text) => {
        let tt = "";
        let times = text.length > 50 ? 50 : text.length;

        for (let icon = 0; icon < times; icon++) {
          tt += text[icon];
        }
        return <a>{tt + "..."}</a>;
      },
    },

    {
      title: "Content Type",
      key: "type",
      dataIndex: "type",
      render: (_, { type }) => (
        <>
          <Tag color={"gold"}>
            {type == "img" ? "Image" : type == "vid" ? "Video" : "Image"}
          </Tag>
        </>
      ),
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: () => (
        <>
          <Tag color={"green"}>LIVE</Tag>
        </>
      ),
    },
    {
      title: "Offline/Online",
      key: "status",
      dataIndex: "offline",
      render: () => (
        <>
          <Tag color={"cyan"}>ONLINE</Tag>
        </>
      ),
    },
    {
      title: "Actions",
      key: "action",
      render: (user) => (
        <Space size="middle">
          <a
            onClick={() => {
              setOnEdit(true);
              setId(user._id);
              navigation("upload?edit=true");
            }}
          >
            edit
          </a>
          <a
            onClick={() => {
              ShowDeleteModal(user);
            }}
          >
            Delete
          </a>
          {/* {isAdmin ? (
            <a onClick={() => ShowReportedModal(user)}>Report Article</a>
          ) : (
            <></>
          )} */}
        </Space>
      ),
    },
    {
      title: "Tags",
      key: "keyWord",
      dataIndex: "keyWord",
      render: (_, { keyWord }) => (
        <>
          {keyWord.map((e, index) => {
            return (
              <Tag color="blue" key={index}>
                {e}
              </Tag>
            );
          })}
        </>
      ),
    },

    {
      title: "Reported By",
      key: "reportedBy",
      dataIndex: "Reported",
      render: (data, { reportedBy }) => (
        <a>{reportedBy ? reportedBy : "Agencies"}</a>
      ),
    },
    // {
    //   title: "Published By",
    //   key: "publishBy",
    //   dataIndex: "publish",
    //   render: (data, { publishBy }) => <a>{publishBy ? publishBy : "Admin"}</a>,
    // },
    {
      title: "Published By",
      key: "publishBy",
      dataIndex: "publish",
      render: (data, { publishBy }) => (
        <a>{publishBy ? publishBy.split("@")[0] : "Admin"}</a>
      ),
    },
    {
      title: "Language",
      key: "language",
      dataIndex: "language",
      render: (data) => (
        <>
          <Tag>{data?.language ? data.language : "English"}</Tag>
        </>
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
        Articles
      </h1>
      <Card>
        <Row gutter={12}>
          {/* <Col span={6}>
            <Select
              style={{ width: "100%" }}
              defaultValue="keyword"
              onChange={(e) => setfilterItem(e)}
              options={[
                {
                  value: "keyword",
                  label: "By Tags",
                },
                {
                  value: "category",
                  label: "By Category",
                },
                {
                  value: "search",
                  label: "By Headline",
                },
                {
                  value: "id",
                  label: "By ID",
                },
                {
                  value: "date",
                  label: "By Date",
                },
                {
                  value: "newsType",
                  label: "News Type",
                },
                {
                  value: "type",
                  label: "Content Type",
                },
              ]}
            />
          </Col> */}
          <Col span={6}>
            <RangePicker
              style={{ width: "100%" }}
              // placeholder="By Date"
              onChange={(_, dateString) => {
                console.log(dateString);
                setfilterItemResponse([
                  ...filterItemResponse,
                  { value: dateString, main: "date" },
                ]);
              }}
            />
          </Col>
          <Col span={6}>
            <Select
              style={{ width: "100%" }}
              defaultValue="breakingNews"
              onChange={(e) =>
                setfilterItemResponse([
                  ...filterItemResponse,
                  { value: e, main: "newsType" },
                ])
              }
              options={[
                {
                  value: "all",
                  label: "All",
                },
                {
                  value: "breakingNews",
                  label: "Breaking News",
                },
                {
                  value: "topStories",
                  label: "Top Stories",
                },
              ]}
            />
          </Col>
          <Col span={6}>
            <Select
              style={{ width: "100%" }}
              defaultValue="img"
              onChange={(e) =>
                setfilterItemResponse([
                  ...filterItemResponse,
                  { value: e, main: "type" },
                ])
              }
              options={[
                {
                  value: "img",
                  label: "Images",
                },
                {
                  value: "vid",
                  label: "Videos",
                },
              ]}
            />
          </Col>

          <Col span={6}>
            <Input
              onChange={(e) =>
                setfilterItemResponse([
                  ...filterItemResponse,
                  { value: e.target.value, main: "search" },
                ])
              }
              placeholder="headline"
              style={{ width: "100%" }}
            />
          </Col>
          <Col span={6} style={{ marginTop: 10 }}>
            <Input
              onChange={(e) =>
                setfilterItemResponse([
                  ...filterItemResponse,
                  {
                    value: e.target.value,
                    main: "category",
                  },
                ])
              }
              placeholder="category"
              style={{ width: "100%" }}
            />
          </Col>
          <Col style={{ marginTop: 10 }} span={6}>
            <Input
              onChange={(e) =>
                setfilterItemResponse([
                  ...filterItemResponse,
                  {
                    value: e.target.value,
                    main: "keyword",
                  },
                ])
              }
              placeholder="tags"
              style={{ width: "100%" }}
            />
          </Col>
          <Col style={{ marginTop: 10 }} span={6}>
            <Input
              onChange={(e) =>
                setfilterItemResponse([
                  ...filterItemResponse,
                  { value: e.target.value, main: "id" },
                ])
              }
              placeholder="id"
              style={{ width: "100%" }}
            />
          </Col>
          <Col style={{ marginTop: 10 }} span={4}>
            <Button style={{ width: "100%" }} type="primary" onClick={onFilter}>
              Filter
            </Button>
          </Col>
          <Col span={24}>
            <Table
              scroll={{
                x: 1300,
              }}
              columns={columns}
              dataSource={articleData}
            />
          </Col>
        </Row>
      </Card>
      <Modal
        title="Delete User"
        open={isModalDeleteOpen}
        onOk={OnDelete}
        onCancel={handleDeleteCancel}
        okText="Yes"
      >
        <div
          style={{
            margin: "20px 0",
            textAlign: "center",
            color: "red",
            fontSize: 30,
            fontWeight: "700",
          }}
        >
          Are You Sure
        </div>
      </Modal>
      <Modal
        title="Report User"
        open={isModalReportedOpen}
        onOk={OnReported}
        onCancel={handleReportedCancel}
        okText="Report"
      >
        <TextArea
          style={{ width: "100%", height: "100px", margin: "10px 0" }}
          showCount
          maxLength={200}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default Dashboard;
