import React, { useEffect, useState } from "react";
import "./style/index.css";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { FaRegCirclePlay, FaGreaterThan } from "react-icons/fa6";
import VideoCard from "../../Components/MainPage/VideoCard";
import ImageCard from "../../Components/MainPage/ImageCard";
import img1 from "../../assets/img-main1.png";
import img2 from "../../assets/img-main-2.png";
import img3 from "../../assets/Rectangle 33.png";
import img4 from "../../assets/Rectangle 28.png";
import img5 from "../../assets/img-5.png";
import img6 from "../../assets/Group 50.png";
import Mac from "../../assets/Rectangle 86.png";
import img7 from "../../assets/Rectangle 67.png";
import img8 from "../../assets/Rectangle 50.png";
import slider from "../../assets/slider (2).png";
import StoriesCard from "../../Components/MainPage/StoriesCard";
import NewsCard from "../../Components/MainPage/NewsCard";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { Col, Modal, Progress, Radio, Row } from "antd";
import { API_URL } from "../../../API";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const [sliderItem, setSliderItem] = useState(0);
  const [showItem, setShowItem] = useState(true);
  const [userData, setUserData] = useState([]);
  const [Article, setArticle] = useState([]);
  const [video, setVideo] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [ArticleTop, setArticleTop] = useState(null);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [val, setVal] = useState("");
  const sliderItems = [slider, img1, img2, img4];
  const { t } = useTranslation();
  const [midAd, setMidAd] = useState({});
  const [bottomAd, setBottomAd] = useState({});
  const navigation = useNavigate();
  useEffect(() => {
    axios.get(`${API_URL}/ads?active=true&side=mid`).then((data) => {
      console.log(data.data, "mid");
      setMidAd(data.data.reverse()[0]);
    });
    axios.get(`${API_URL}/ads?active=true&side=bottom`).then((data) => {
      console.log(data.data);
      setBottomAd(data.data.reverse()[0]);
    });
  }, []);
  const showModal2 = () => {
    setIsModal2Open(true);
  };
  const handleCancel2 = () => {
    setIsModal2Open(false);
  };
  useEffect(() => {
    axios
      .get(`${API_URL}/article?pagenation=true&limit=6&type=img`)
      .then((data) => {
        console.log(data.data);
        setArticle(data.data);
      })
      .catch(() => {});
  }, []);
  useEffect(() => {
    axios
      .get(`${API_URL}/article?pagenation=true&limit=4&type=vid`)
      .then((data) => {
        console.log(data.data);
        setVideo(data.data);
      })
      .catch(() => {});
  }, []);
  useEffect(() => {
    axios
      .get(`${API_URL}/article?pagenation=true&limit=6&type=img&page=2`)
      .then((data) => {
        console.log(data.data);
        setLatestNews(data.data);
      })
      .catch(() => {});
  }, []);
  useEffect(() => {
    axios
      .get(`${API_URL}/article?id=6524337309c3cf5a3cca172a`)
      .then((data) => {
        console.log(data.data);
        setArticleTop(data.data[0]);
      })
      .catch(() => {});
  }, []);
  useEffect(() => {
    axios
      .get(`${API_URL}/poll`)
      .then((users) => {
        setUserData(users.data.reverse()[0]);
      })
      .catch((err) => {
        console.log("err=>>>", err);
      });
  }, []);
  console.log(userData);
  return (
    <>
      <div className="main-page-conatiner">
        <div className="container3">
          <div className="main-page-flash-news container">
            <div className="flash-news-1">{t("fn")}</div>
            <div className="flash-news-2">
              <div className="flash-news-2-text">
                पुरानी पेंशन योजना की बहाली को लेकर आज रामलीला मैदान में रैली
              </div>
              <div className="flash-news-2-icons">
                <IoMdArrowDropleft size={25} />
                <IoMdArrowDropright size={25} />
              </div>
            </div>
          </div>
        </div>
        <div className="main-conatiner container container3">
          <div className="main-rigth-side">
            <div className="image-conatiner">
              <div className="main-conatiner-image-1">
                <ImageCard
                  height="100%"
                  width="100%"
                  img={ArticleTop?.image}
                  text={ArticleTop?.title}
                  id={ArticleTop?._id}
                />
              </div>
              <div
                className="main-conatiner-image-2"
                style={{
                  marginLeft: "10px",
                }}
              >
                <ImageCard
                  height="100%"
                  width="100%"
                  img={img2}
                  text="Maharashtra Forest Staff Killed By Wil..."
                />
              </div>
            </div>
            <div className="main-page-slider-setting">
              {sliderItem == 1 ? (
                <div
                  style={{
                    height: "270px",
                    width: "100%",
                    // justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "rgba(0,0,0,0.1)",
                    borderRadius: 10,
                    marginTop: 10,
                  }}
                >
                  {/* <div
                    style={{
                      fontWeight: "600",
                      fontSize: 18,
                      textAlign: "start",
                      fontFamily: "Poppins",
                    }}
                  >
                    {userData?.question}
                  </div>
                  <Radio.Group style={{display:"flex",flexDirection:"column"}}>
                    {userData.options.map((e,i)=>{
                      return (
                       e ==""?<></>: <Radio value={i}>{e}</Radio>
                      )
                    })}
                  </Radio.Group> */}
                  <div
                    style={{
                      width: "400px",
                      height: "180px",
                      background: "White",
                      marginTop: 10,
                      borderRadius: 10,
                      padding: 10,
                    }}
                  >
                    <div
                      style={{
                        fontWeight: "600",
                        fontSize: 18,
                        textAlign: "start",
                        fontFamily: "Poppins",
                      }}
                    >
                      {userData?.question}
                    </div>
                    <Radio.Group
                      value={val ? val : null}
                      style={{ width: "100%", marginTop: "20px" }}
                    >
                      <Row gutter={12}>
                        {userData.options.map((e, i) => {
                          return e == "" ? (
                            <></>
                          ) : (
                            <Col xs={12}>
                              <div
                                key={i}
                                style={{
                                  width: "90%",
                                  height: "40px",
                                  borderRadius: 10,
                                  border: "1px solid black",
                                  marginBottom: 10,
                                  alignItems: "center",
                                  display: "flex",
                                  paddingLeft: "10px",
                                  textTransform: "capitalize",
                                }}
                              >
                                <Radio
                                  onClick={() =>
                                    val == e ? setVal("") : setVal(e)
                                  }
                                  value={e}
                                  disabled={
                                    val ? (val == e ? false : true) : false
                                  }
                                >
                                  <div
                                    style={{
                                      fontSize: "18px",
                                      fontWeight: "600",
                                      marginTop: "-10px",
                                    }}
                                  >
                                    {e}
                                  </div>
                                </Radio>
                                {val && <Progress percent={30} size="small" />}
                              </div>
                            </Col>
                          );
                        })}
                      </Row>
                    </Radio.Group>
                  </div>
                </div>
              ) : (
                <img
                  src={sliderItems[sliderItem]}
                  alt=""
                  className={`slider-img ${showItem ? "show" : ""}`}
                />
              )}
              <div className="main-page-slider-items">
                <div
                  className={`slider-item ${
                    sliderItem == 0 ? "slider-item-active" : ""
                  }`}
                  onClick={() => {
                    setShowItem(false);
                    setTimeout(() => {
                      setShowItem(true);
                      setSliderItem(0);
                    }, 1000);
                  }}
                ></div>
                <div
                  className={`slider-item ${
                    sliderItem == 1 ? "slider-item-active" : ""
                  }`}
                  onClick={() => {
                    setShowItem(false);
                    setTimeout(() => {
                      setShowItem(true);
                      setSliderItem(1);
                    }, 1000);
                  }}
                ></div>
                <div
                  className={`slider-item ${
                    sliderItem == 2 ? "slider-item-active" : ""
                  }`}
                  onClick={() => {
                    setShowItem(false);
                    setTimeout(() => {
                      setShowItem(true);
                      setSliderItem(2);
                    }, 1000);
                  }}
                ></div>
                <div
                  className={`slider-item ${
                    sliderItem == 3 ? "slider-item-active" : ""
                  }`}
                  onClick={() => {
                    setShowItem(false);
                    setTimeout(() => {
                      setShowItem(true);
                      setSliderItem(3);
                    }, 1000);
                  }}
                ></div>
              </div>
            </div>
            <div className="more-text">
              {"more"}{" "}
              <FaGreaterThan
                style={{
                  marginLeft: "6px",
                }}
              />
            </div>
          </div>
          <div className="main-left-side">
            <div className="main-left-side-top">
              <div>{t("ts")}</div>
            </div>
            <div className="top-stories-all-cards">
              {Article?.map((data) => {
                let title = data.title.split(" ").join("-");
                return (
                  <StoriesCard
                    OnPress={() =>
                      navigation(`/details/${title}?id=${data._id}`)
                    }
                    image={data?.image}
                    text={data?.title}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="main-news-area">
          <div className="news-main-side-left">
            <div className="main-news-heading">{t("ln")}</div>
            <div className="news-cards-area container3">
              {latestNews.map((data) => {
                let title = data.title.split(" ").join("-");
                return (
                  <div className="news-card-items-area" key={data?._id}>
                    <NewsCard
                      data={data}
                      onPress={() =>
                        navigation(`/details/${title}?id=${data._id}`)
                      }
                    />
                  </div>
                );
              })}

              {/* <div className="news-card-items-area">
                <NewsCard />
              </div>
              <div className="news-card-items-area">
                <NewsCard />
              </div>
              <div className="news-card-items-area">
                <NewsCard />
              </div>
              <div className="news-card-items-area">
                <NewsCard />
              </div>
              <div className="news-card-items-area">
                <NewsCard />
              </div> */}
            </div>
            <div className="more-text">
              {"more"}{" "}
              <FaGreaterThan
                style={{
                  marginLeft: "6px",
                }}
              />
            </div>
          </div>
          <div className="news-main-side-rigth">
            <div className="news-main-rigth-part1">
              <div className="main-news-heading">{t("bn")}</div>
              <div className="news-cards-area container3">
                <div className="news-card-items-area2 ">
                  <NewsCard />
                </div>
                <div className="news-card-items-area2">
                  <NewsCard />
                </div>
                <div className="news-card-items-area2">
                  <NewsCard />
                </div>
              </div>
              <div className="more-text">
                {"more"}{" "}
                <FaGreaterThan
                  style={{
                    marginLeft: "6px",
                  }}
                />
              </div>
            </div>
            <div className="news-main-rigth-part2">
              <a
                href={midAd?.link}
                target="_blank"
                style={{ position: "relative" }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "20px",
                    backgroundColor: "white",
                    position: "absolute",
                    top: 16,
                    textAlign: "center",
                  }}
                >
                  advertisement
                </div>
                <img
                  style={{ cursor: "pointer" }}
                  src={midAd?.imgLink}
                  alt=""
                />
                <div
                  style={{
                    width: "100%",
                    height: "80px",
                    backgroundColor: "white",
                    position: "absolute",
                    bottom: 0,
                    paddingLeft: 10,
                  }}
                >
                  <div style={{ fontSize: "16px", fontFamily: "Poppins" }}>
                    {midAd?.slugName}
                  </div>
                  <a href={midAd?.link}>{midAd?.link}</a>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="main-page-videos-conatiner container2 container3">
          <div className="main-page-video-heading">{t("v")}</div>
          <div className="video-cards">
            <div className="video-card-box-1">
              <VideoCard data={video && video[0]} />
              <VideoCard data={video && video[1]} />
            </div>
            <div className="divider-box">
              <div className="divider"></div>
            </div>
            <div className="video-box">
              <div className="video-items-box">
                <FaRegCirclePlay size={50} color="red" style={{ zIndex: 1 }} />
                <div className="video-text-box">
                  <div>
                    War Of Words Between Babar, Shaheen After Pakistan's Asia
                    Cup Exit: Report
                  </div>
                </div>
              </div>
            </div>
            <div className="divider-box">
              <div className="divider"></div>
            </div>
            <div className="video-card-box-1">
              <VideoCard data={video && video[2]} />
              <VideoCard data={video && video[3]} />
            </div>
          </div>
        </div>
        <div className="main-page-technology-container container2 container3">
          <div className="main-page-technology-heading">{t("t")}</div>
          <div className="main-page-technology-area">
            <div>
              <div className="main-page-technology-first-column">
                <div
                  style={{
                    marginTop: "10px",
                  }}
                >
                  <ImageCard
                    style={{
                      fontSize: "15px",
                      fontWeight: 400,
                      height: "40px",
                      borderRadius: 0,
                    }}
                    height="200px"
                    width="100%"
                    img={img4}
                    text="iPhone 15, iPhone 15 Plus, iPhone 15 Pro, iPhone 15 Pro Max Preorders Be..."
                  />
                </div>
                <div
                  style={{
                    marginTop: "10px",
                  }}
                >
                  <ImageCard
                    style={{
                      fontSize: "15px",
                      fontWeight: 400,
                      height: "40px",
                      borderRadius: 0,
                    }}
                    height="200px"
                    width="100%"
                    img={img3}
                    text="iPhone 15, iPhone 15 Plus, iPhone 15 Pro, iPhone 15 Pro Max Preorders Be..."
                  />
                </div>
              </div>
              <div className="main-page-technology-first-column">
                <div
                  style={{
                    marginTop: "10px",
                  }}
                >
                  <StoriesCard
                    height="120px"
                    width="80%"
                    color="transparent"
                    image={img5}
                    text={
                      "iPhone 15 price in India starts at Rs. 79,900 for the base model with 128GB of storage, while the iPhone 15 Plus with the same amount of storage starts at Rs. 89,900.."
                    }
                  />
                </div>
                <div
                  style={{
                    marginTop: "10px",
                  }}
                >
                  <StoriesCard
                    height="120px"
                    width="80%"
                    color="transparent"
                    image={img5}
                    text={
                      "iPhone 15 price in India starts at Rs. 79,900 for the base model with 128GB of storage, while the iPhone 15 Plus with the same amount of storage starts at Rs. 89,900.."
                    }
                  />
                </div>
                <div
                  style={{
                    marginTop: "10px",
                  }}
                >
                  <StoriesCard
                    height="120px"
                    width="80%"
                    color="transparent"
                    image={img5}
                    text={
                      "iPhone 15 price in India starts at Rs. 79,900 for the base model with 128GB of storage, while the iPhone 15 Plus with the same amount of storage starts at Rs. 89,900.."
                    }
                  />
                </div>
                <div className="more-text">
                  {"more"}{" "}
                  <FaGreaterThan
                    style={{
                      marginLeft: "6px",
                    }}
                  />
                </div>
              </div>
              <div className="main-page-technology-third-column">
                <VideoCard color="black" width="100%" />
                <VideoCard color="black" width="100%" />
                <div className="more-text">
                  {"more"}{" "}
                  <FaGreaterThan
                    style={{
                      marginLeft: "6px",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="visual-stories-main-container container container3">
          <div className="main-page-technology-heading">{t("vs")}</div>
          <div className="visual-stories-main-container2 container3">
            <div className="visual-stories-main-container-part1">
              <div
                style={{
                  margin: "0 7px",
                }}
                className="visual-stories-main-container-main-area"
              >
                <ImageCard
                  style={{
                    fontSize: "14px",
                    fontWeight: 400,
                    height: "60px",
                  }}
                  height="270px"
                  width="250px"
                  border="10px"
                  img={img6}
                  text="iPhone 15, iPhone 15 Plus, iPhone 15 Pro, iPhone 15 Pro Max Preord..."
                />
              </div>
              <div
                style={{
                  margin: "0 7px",
                }}
                className="visual-stories-main-container-main-area"
              >
                <ImageCard
                  style={{
                    fontSize: "14px",
                    fontWeight: 400,
                    height: "60px",
                  }}
                  height="270px"
                  width="250px"
                  border="10px"
                  img={img6}
                  text="iPhone 15, iPhone 15 Plus, iPhone 15 Pro, iPhone 15 Pro Max Preord..."
                />
              </div>
              <div
                style={{
                  margin: "0 7px",
                }}
                className="visual-stories-main-container-main-area"
              >
                <ImageCard
                  style={{
                    fontSize: "14px",
                    fontWeight: 400,
                    height: "60px",
                  }}
                  height="270px"
                  width="250px"
                  border="10px"
                  img={img6}
                  text="iPhone 15, iPhone 15 Plus, iPhone 15 Pro, iPhone 15 Pro Max Preord..."
                />
              </div>
            </div>
            <div className="visual-stories-main-container-part2">
              <a href={midAd?.link} target="_blank">
                <img
                  style={{ cursor: "pointer" }}
                  src={bottomAd?.imgLink}
                  alt=""
                />
              </a>
            </div>
          </div>
        </div>
        <div className="main-video-gallery-main-container container2 container3">
          <div className="main-page-video-heading2">{t("ph")}</div>
          <div className="main-video-gallery-imgs">
            <img src={img8} alt="" />
            <img src={img8} alt="" />
            <img src={img8} alt="" />
            <img src={img8} alt="" />
            <img src={img8} alt="" />
            <img src={img8} alt="" />
            <img src={img8} alt="" />
            <img src={img8} alt="" />
          </div>
          <div className="scroll-line"></div>
        </div>
      </div>
      {/* <Modal
          title="Polling Modal"
          open={isModal2Open}
          onCancel={handleCancel2}
          onOk={()=>{
            sessionStorage.setItem("data","yes")
            handleCancel2()
          }}
        >
          <div>{userData.question}</div>
          <Radio.Group>
          <Radio value={1}>{userData.option1}</Radio>
          <br />
          <Radio value={2}>{userData.option2}</Radio>
          </Radio.Group>
        </Modal> */}
    </>
  );
};

export default MainPage;
