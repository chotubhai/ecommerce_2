import React, { useState, useEffect } from "react";
import { Menu, Input, AutoComplete, Tooltip, Button } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  ShoppingCartOutlined,
  UserOutlined,
  SearchOutlined,
} from "@ant-design/icons";
const { Search } = Input;

export const Navbar = () => {
  const [options, setOptions] = useState([]);
  const [q, setQ] = useState();

  const getRemmd = (value) => {
    setQ(value);
    axios
      .post("http://54.144.49.79:5000/autocomplete", { q: value })
      .then((res) => {
        const data = res.data.map(({ name: value, ...rest }) => ({
          value,
          ...rest,
        }));
        setOptions(data);
      })
      .catch((e) => console.log(e));
  };

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={["1"]}
      style={{ width: "100%" }}
    >
      <Menu.Item key="1">
        <AutoComplete
          style={{
            width: 300,
          }}
          options={options}
          onChange={getRemmd}
          placeholder="Search Item"
        />
      </Menu.Item>
      <Menu.Item>
        <Tooltip title="search">
          <Button
            shape="circle"
            icon={<SearchOutlined />}
            onClick={()=>
              window.location.href =
                window.location.origin +
                `/search?q=${q}`
            }
            style={{ padding: "0 10px" }}
          />
        </Tooltip>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/cart">
          <ShoppingCartOutlined />
        </Link>
      </Menu.Item>
      <Menu.Item key="3" style={{ right: 0, position: "relative" }}>
        <UserOutlined />
      </Menu.Item>
    </Menu>
  );
};
