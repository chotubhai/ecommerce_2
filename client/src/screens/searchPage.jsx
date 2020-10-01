import React, { useEffect, useState } from "react";
import { Menu, Input, List, Avatar,Layout } from "antd";
import axios from 'axios';
import {Link} from 'react-router-dom';
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Navbar } from "../components/navbar";
const { Search } = Input;
const {Header} = Layout;

export const SearchPage = () => {

  const [data,setData] = useState();

  useEffect(()=>{
  
    axios
      .post("http://54.144.49.79:5000/search", { q: window.location.search.split("=")[1] ,skip:0,limit:20})
      .then((res) => {
       console.log(res.data);
       setData(res.data);
      })
      .catch((e) => console.log(e));
  },[]);

  return (
    <>
       <Header>
          <div className="logo" />
          <Navbar />
        </Header>
      <div style={{ padding: "20px 0" }}>
        <List
          size="large"
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
          <List.Item extra={<p>Rs {" "}{item.discountPrice}</p>}>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<Link to={`productview?id=${item._id}`}>{item.name}</Link>}
                description={item.description.substring(0,200)}
              />
            </List.Item>
          )}
        />
      </div>
    </>
  );
};
