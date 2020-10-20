import React, { useEffect, useState, createRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Menu,
  Layout,
  Row,
  Col,
  Input,
  Slider,
  Carousel,
  Image,
  Space,
  Button,
} from "antd";
import { Navbar } from "../components/navbar";
import "./productstyle.css";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
const { Header, Content } = Layout;
const { Search } = Input;

const style = { background: "#0092ff", padding: "8px 0", height: "50vh" };

export const ProductViewPage = () => {
  const [productData, setProductData] = useState();
  const [images, setImages] = useState();
  const [specification, setspecification] = useState();

  const addTocart = () => {
    const userId = localStorage.getItem('user');
    if (!userId) window.location.href = window.location.origin + "/cart";
    else
      axios.post("http://localhost:5000/addtocart", {
        userId,
        productId: window.location.search.split("=")[1],
      });
  };

  useEffect(() => {
    console.log(
      `http://localhost:5000/getproduct/${window.location.search.split("=")[1]}`
    );

    axios
      .get(
        `http://localhost:5000/getproduct/${
          window.location.search.split("=")[1]
        }`
      )
      .then((result) => {
        setProductData(result.data);
        try {
          setspecification(
            JSON.parse(result.data.specifcation.split("=>").join(":"))
              .product_specification
          );
        } catch {
          setspecification(null);
        }

        setImages(result.data.image[0].slice(2, -2).split('", "'));
      });
  }, []);

  const slider = createRef();

  return (
    <>
       <Navbar />
      <Layout className="layout">

        <br />
        <br />

        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center">
          <Col className="gutter-row" span={10}>
            {images && (
              <Carousel dots={false} ref={slider}>
                {images.map((index) => (
                  <div>
                    <Image
                      src={index}
                      fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
                    />
                  </div>
                ))}
              </Carousel>
            )}
            <Slider
              step={1}
              min={0}
              max={images && images.length}
              onChange={(index) => {
                console.log(slider.current.goTo(index));
              }}
            />
          </Col>

          <Col className="gutter-row" span={10}>
            <Space direction="vertical">
              <h2>{productData && productData.name}</h2>
              <h4>
                Discount Price &#x20a8;{" "}
                {productData && productData.discountPrice}
              </h4>
              <p>
                {" "}
                Retail Price{" "}
                <p style={{ textDecoration: "line-through" }}>
                  {" "}
                  &#x20a8; {productData && productData.retailPrice}
                </p>
              </p>
              <p style={{ fontSize: "18px" }}>
                {productData && productData.description}
              </p>
              <Button type="primary" onClick={addTocart}>
                <ShoppingCartOutlined /> Add To Cart
              </Button>
            </Space>
          </Col>
        </Row>
        {specification && (
          <Content style={{ padding: "50px 50px" }}>
            <h2>Specification</h2>
            <Row>
              <Col span={12}>
                {specification.map((i, index) => {
                  if (index < specification.length / 2)
                    return (
                      <h3>
                        {i.key}
                        {"  :  "}
                        {i.value}
                      </h3>
                    );
                })}
              </Col>
              <Col span={12}>
                {specification.map((i, index) => {
                  if (index > specification.length / 2)
                    return (
                      <h3>
                        {i.key}
                        {"  :  "}
                        {i.value}
                      </h3>
                    );
                })}
              </Col>
            </Row>
          </Content>
        )}

        <h2 style={{ padding: "50px 50px" }}>Related Product</h2>

        <div class="items">
          <div class="item item1">01</div>
          <div class="item item2">02</div>
          <div class="item item3">03</div>
          <div class="item item4">04</div>
          <div class="item item5">05</div>
          <div class="item item6">06</div>
          <div class="item item7">07</div>
          <div class="item item8">08</div>
        </div>
      </Layout>
    </>
  );
};
