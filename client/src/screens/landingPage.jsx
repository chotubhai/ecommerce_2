import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Menu, Layout, Row, Col, Input, Carousel } from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Navbar } from "../components/navbar";
const { Header } = Layout;
const { Search } = Input;

const style = { textAlign: "center", padding: "8px 0" };
const imgStyle = { height: "100%", width: "100%", objectFit: "contain" };
const contentStyle = {
  height: "100vh",
  color: "#fff",
  // lineHeight: "160px",
  textAlign: "center",
  // background: "#364d79",
};

export const LandingPage = () => {
  const [topcategories, settopcategories] = useState();
  const [bestSellers, setBestSellers] = useState();
  //row breakpoint;
  const [bp, setBp] = useState(8);

const landingImg = ["https://img.global.news.samsung.com/in/wp-content/uploads/2017/09/691-CE-Diwali-Backdrop_v-02.jpg",
"https://i.pinimg.com/originals/77/3b/cd/773bcd5e5452e8539b8ae40214268117.jpg",
"https://d2cdo4blch85n8.cloudfront.net/wp-content/uploads/2020/01/New-Samsung-TVs-Unveiled-CES-2020-Featured-image.jpg",
"https://www.discountbonus.com/wp-content/uploads/2020/05/Massive-Hisense-4K-TV-deals-offer-lowest-prices-yet-this.jpg"
];

  useEffect(() => {
    if (document.body.clientWidth < 1024 && document.body.clientWidth >= 768) {
      setBp(8);
    } else if (
      document.body.clientWidth < 768 &&
      document.body.clientWidth >= 512
    ) {
      setBp(12);
    } else if (document.body.clientWidth < 512) {
      setBp(12);
    } else setBp(6);

    axios
      .get("http://localhost:5000/topcategoriesandsellers")
      .then((result) => {
        settopcategories(result.data[0].categoriesCount);
        setBestSellers(result.data[0].productCount);
        console.log(result.data[0].categoriesCount[0].image);
      });
  }, []);

  return (
    <>
      <Navbar />
      <Carousel autoplay style={{ height: "100vh" }}>
        {landingImg && landingImg.map(i => (
         <div className="div" style={contentStyle}>
         <img 
         style={{width: "100%",height: "100vh"}}
          src= {i}
          alt=""
          />
          </div>
        ))}
      </Carousel>

      <br />
      <h2>Top categories</h2>

      <Row gutter={[8, 24]}>
        {topcategories &&
          topcategories.map((i) => (
            <Col className="gutter-row" span={bp} style={{ height: "300px" }}>
              <img alt="" src={i.image} style={imgStyle} />
              <div style={style}>{i.name}</div>
            </Col>
          ))}
      </Row>
      <br />
      <br />
      <br />
      <br />
      <h2>Best Sellers</h2>

      <Row gutter={[8,24]}>
        {bestSellers &&
          bestSellers.map((i) => (
            <Col className="gutter-row" span={bp} style={{ height: "240px" }}>
              <a href={`productview?id=${i._id}`}>
                <img alt="" src={i.image} style={imgStyle} />
                <div style={style}>{i.name}</div>
              </a>
            </Col>
          ))}
      </Row>
      <br />
    </>
  );
};
