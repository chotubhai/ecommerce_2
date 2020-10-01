import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
import { Menu, Layout, Row, Col, Input, Carousel } from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Navbar } from "../components/navbar";
const { Header } = Layout;
const { Search } = Input;

const style = { textAlign: "center", padding: "8px 0" };
const imgStyle = { height: "100%",
  width: "100%",
  objectFit: "contain"};
const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  // background: "#364d79",
};

export const LandingPage = () => {
  const [topcategories, settopcategories] = useState();
  const [bestSellers, setBestSellers] = useState();

  useEffect(() => {
    axios
      .get("http://54.144.49.79:5000/topcategoriesandsellers")
      .then((result) => {
        settopcategories(result.data[0].categoriesCount);
        setBestSellers(result.data[0].productCount);
        console.log(result.data[0].categoriesCount[0].image);
      });
  }, []);

  return (
    <>
      <Layout className="layout">
      <Header>
          <div className="logo" />
          <Navbar />
        </Header>
      </Layout>
      <Carousel autoplay>
        <div>
          {/* <h3 style={contentStyle}>1</h3> */}
          <img alt="" src="https://rukminim1.flixcart.com/flap/1676/460/image/d4a6e6051ed14150.jpg?q=50" />
        </div>
        <div>
          {/* <h3 style={contentStyle}>2</h3> */}
          <img alt="" src="https://rukminim1.flixcart.com/flap/1688/280/image/8811eac60e6755f3.jpg?q=50" />
        </div>
        <div>
          {/* <h3 style={contentStyle}>3</h3> */}
          <img alt="" src="https://rukminim1.flixcart.com/flap/1688/280/image/b63fd453fa121931.jpg?q=50" />
        </div>
        <div>
          {/* <h3 style={contentStyle}>4</h3> */}
          <img alt="" src="https://rukminim1.flixcart.com/flap/1688/280/image/1476e25e6ab94527.jpg?q=50" />
        </div>
      </Carousel>

      <br />
      <h2>Top categories</h2>

      <Row gutter={[16,48]}>
        <Col className="gutter-row" span={6} style={{height: "240px"}}>
          {topcategories && (
            <>
              <img alt="" src={topcategories[0].image} style={imgStyle}/>
              <div style={style}>{topcategories[0].name}</div>
            </>
          )}
          {/* <div style={style}></div> */}
        </Col>
        <Col className="gutter-row" span={6} style={{height: "240px"}}>
          {topcategories && (
            <>
              <img alt="" src={topcategories[1].image} style={imgStyle}/>
              <div style={style}>{topcategories[1].name}</div>
            </>
          )}
        </Col>
        <Col className="gutter-row" span={6} style={{height: "240px"}}>
          {topcategories && (
            <>
              <img alt="" src={topcategories[2].image} style={imgStyle}/>
              <div style={style}>{topcategories[2].name}</div>
            </>
          )}
        </Col>
        <Col className="gutter-row" span={6} style={{height: "240px"}}>
          {topcategories && (
            <>
              <img alt="" src={topcategories[6].image} style={imgStyle}/>
              <div style={style}>{topcategories[6].name}</div>
            </>
          )}
        </Col>
      </Row>
      <br />
      <Row gutter={[16,48]}>
        <Col className="gutter-row" span={6} style={{height: "240px"}}>
          {topcategories && (
            <>
              <img alt="" src={topcategories[3].image} style={imgStyle}/>
              <div style={style}>{topcategories[3].name}</div>
            </>
          )}
        </Col>
        <Col className="gutter-row" span={6} style={{height: "240px"}}>
          {topcategories && (
            <>
              <img alt="" src={topcategories[4].image} style={imgStyle}/>
              <div style={style}>{topcategories[4].name}</div>
            </>
          )}
        </Col>
        <Col className="gutter-row" span={6} style={{height: "240px"}}>
          {topcategories && (
            <>
              <img alt="" src={topcategories[5].image} style={imgStyle}/>
              <div style={style}>{topcategories[5].name}</div>
            </>
          )}
        </Col>
        <Col className="gutter-row" span={6} style={{height: "240px"}}>
          {topcategories && (
            <>
              <img alt="" src={topcategories[7].image} style={imgStyle}/>
              <div style={style}>{topcategories[7].name}</div>
            </>
          )}
        </Col>
      </Row>
      <br />
      <br/><br/><br/>
      <h2>Best Sellers</h2>

      <Row gutter={[16,48]}>
        <Col className="gutter-row" span={6} style={{height: "240px"}}>
          {bestSellers && (
            <a href={`productview?id=${bestSellers[0]._id}`}>
              <img alt="" src={bestSellers[0].image} style={imgStyle}/>
              <div style={style}>{bestSellers[0].name}</div>
              </a>
          )}
        </Col>
        <Col className="gutter-row" span={6} style={{height: "240px"}}>
          {bestSellers && (
           <a href={`productview?id=${bestSellers[1]._id}`}>
              <img alt="" src={bestSellers[1].image} style={imgStyle}/>
              <div style={style}>{bestSellers[1].name}</div>
            </a>
          )}
        </Col>
        <Col className="gutter-row" span={6} style={{height: "240px"}}>
          {bestSellers && (
            <a href={`productview?id=${bestSellers[2]._id}`}>
              <img alt="" src={bestSellers[2].image} style={imgStyle}/>
              <div style={style}>{bestSellers[2].name}</div>
            </a>
          )}
        </Col>
        <Col className="gutter-row" span={6} style={{height: "240px"}}>
          {bestSellers && (
            <a href={`productview?id=${bestSellers[7]._id}`}>
              <img alt="" src={bestSellers[7].image} style={imgStyle}/>
              <div style={style}>{bestSellers[7].name}</div>
            </a>
          )}
        </Col>
      </Row>
      <br />
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={6} style={{height: "240px"}}>
          {bestSellers && (
            <a href={`productview?id=${bestSellers[3]._id}`}>
              <img alt="" src={bestSellers[3].image} style={imgStyle}/>
              <div style={style}>{bestSellers[3].name}</div>
            </a>
          )}
        </Col>
        <Col className="gutter-row" span={6} style={{height: "240px"}}>
          {bestSellers && (
           <a href={`productview?id=${bestSellers[4]._id}`}>
              <img alt="" src={bestSellers[4].image} style={imgStyle}/>
              <div style={style}>{bestSellers[4].name}</div>
            </a>
          )}
        </Col>
        <Col className="gutter-row" span={6} style={{height: "240px"}}>
          {bestSellers && (
           <a href={`productview?id=${bestSellers[5]._id}`}>
              <img alt="" src={bestSellers[5].image} style={imgStyle}/>
              <div style={style}>{bestSellers[5].name}</div>
            </a>
          )}
        </Col>
        <Col className="gutter-row" span={6} style={{height: "240px"}}>
          {bestSellers && (
           <a href={`productview?id=${bestSellers[6]._id}`}>
              <img alt="" src={bestSellers[6].image} style={imgStyle}/>
              <div style={style}>{bestSellers[6].name}</div>
            </a>
          )}
        </Col>
      </Row>
      <br/><br/><br/>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={6} style={{height: "240px"}}>
          {bestSellers && (
            <a href={`productview?id=${bestSellers[11]._id}`}>
              <img alt="" src={bestSellers[11].image} style={imgStyle}/>
              <div style={style}>{bestSellers[11].name}</div>
            </a>
          )}
        </Col>
        <Col className="gutter-row" span={6} style={{height: "240px"}}>
          {bestSellers && (
           <a href={`productview?id=${bestSellers[8]._id}`}>
              <img alt="" src={bestSellers[8].image} style={imgStyle}/>
              <div style={style}>{bestSellers[8].name}</div>
            </a>
          )}
        </Col>
        <Col className="gutter-row" span={6} style={{height: "240px"}}>
          {bestSellers && (
           <a href={`productview?id=${bestSellers[9]._id}`}>
              <img alt="" src={bestSellers[9].image} style={imgStyle}/>
              <div style={style}>{bestSellers[9].name}</div>
            </a>
          )}
        </Col>
        <Col className="gutter-row" span={6} style={{height: "240px"}}>
          {bestSellers && (
           <a href={`productview?id=${bestSellers[10]._id}`}>
              <img alt="" src={bestSellers[10].image} style={imgStyle}/>
              <div style={style}>{bestSellers[10].name}</div>
            </a>
          )}
        </Col>
      </Row>
      <br />
    </>
  );
};
