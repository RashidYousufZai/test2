import {
  Button,
  Card,
  Col,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Tag,
  message,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../../../API";

const Poll = () => {
  const [userData, setUserData] = useState([]);
  const [filterItem, setfilterItem] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [text, setText] = useState("");
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [optionLen, setOptionLen] = useState(2);
  const [options, setOptions] = useState([
    { option1: "", option2: "", option3: "", option4: "" },
  ]);
  useEffect(() => {
    axios
      .get(`${API_URL}/poll`)
      .then((users) => {
        setUserData(users.data.reverse());
        console.log(users);
      })
      .catch((err) => {
        console.log("err=>>>", err);
      });
  }, []);

  const onAdd = () => {
    axios
      .post(`${API_URL}/poll`, {
        question: question,
        options: [option1, option2, option3&&option3, option4&&option4],
      })
      .then((users) => {
        setUserData(users.data.data);
        message.success("Successfully Added");
        handleCancel();
      })
      .catch((err) => {
        console.log(err);
        message.error("Successfully Not Added");
      });
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: (_, { _id }) => <a>{_id}</a>,
    },
    {
      title: "Question",
      dataIndex: "question",
      key: "question",
    },
    {
      title: "Options",
      dataIndex: "options",
      key: "options",
    },
  ];
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
        Poll
      </h1>
      <Card style={{ height: "100%" }}>
        <Row gutter={20}>
          <Col span={4}>
            <Space style={{ marginLeft: 10 }}>
              <Button
                type="primary"
                style={{ backgroundColor: "green" }}
                onClick={showModal}
              >
                Add
              </Button>
            </Space>
          </Col>
          <Col span={24} style={{ marginTop: 20 }}>
            <Table columns={columns} dataSource={userData} />
          </Col>
        </Row>
      </Card>
      <Modal
        title="Upload Poll"
        open={isModalOpen}
        onOk={onAdd}
        onCancel={handleCancel}
      >
        <Input
          value={question}
          style={{
            width: 310,
            height: 50,
          }}
          placeholder="Enter Your Question"
          onChange={(e) => setQuestion(e.target.value)}
        />
        <br />
        <Input
          value={option1}
          style={{
            width: 150,
            height: 50,
            marginTop: 10,
            marginRight: 10,
          }}
          placeholder="Enter Option 1"
          onChange={(e) => setOption1(e.target.value)}
        />
        <Input
          value={option2}
          style={{
            width: 150,
            height: 50,
            marginTop: 10,
          }}
          placeholder="Enter Option 2"
          onChange={(e) => setOption2(e.target.value)}
        />
        <br />
        {optionLen>=3&&<Input
          value={option3}
          style={{
            width: 150,
            height: 50,
            marginTop: 10,
            marginRight: 10,
          }}
          placeholder="Enter Option 3"
          onChange={(e) => setOption3(e.target.value)}
        />}
       {
        optionLen==4&& <Input
        value={option4}
        style={{
          width: 150,
          height: 50,
          marginTop: 10,
        }}
        placeholder="Enter Option 4"
        onChange={(e) => setOption4(e.target.value)}
      />
       }
        {
          optionLen==4?<div>
          <a onClick={()=>setOptionLen(optionLen-1)} href="javascript:void(0)">option less</a>
        </div>:<div>
          <a onClick={()=>setOptionLen(optionLen+1)} href="javascript:void(0)">Add New</a>
        </div>
        }
      </Modal>
    </>
  );
};

export default Poll;
