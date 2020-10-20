import React, { useState, useEffect } from "react";
import { Menu, Input, AutoComplete, Tooltip, Button } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  ShoppingCartOutlined,
  UserOutlined,
  SearchOutlined,
} from "@ant-design/icons";
// import MenuItem from "antd/lib/menu/MenuItem";
const { SubMenu } = Menu;
const { Search } = Input;

export const Navbar = () => {
  const [options, setOptions] = useState([]);
  const [q, setQ] = useState();

  const getRemmd = (value) => {
    setQ(value);
    axios
      .post("http://localhost:5000/autocomplete", { q: value })
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
    <div className="nav" style={{ display: "flex" }}>
      <div className="left" style={{ margin: "auto 0",padding:"0 10px" }}>
        <h4>LOGO</h4>
      </div>
      <div className="centre" style={{ flex: "1" }}>
        <Menu mode="horizontal">
          <Menu.Item style={{
                width: "50%",
              }}>
            <AutoComplete
              style={{
                width: "100%",
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
                onClick={() =>
                  (window.location.href =
                    window.location.origin + `/search?q=${q}`)
                }
                style={{ padding: "0 10px" }}
              />
            </Tooltip>
          </Menu.Item>
        </Menu>
      </div>
      <div className="right">
        <Menu mode="horizontal">
          <Menu.Item key="2">
            <Link to="/cart">
              <ShoppingCartOutlined />
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <UserOutlined />
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
};

{
  /* <Menu.Item>
        <h4>LOGO</h4>
      </Menu.Item>
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
<SubMenu style={{float: 'right'}}

>
      <Menu.Item >
        <Tooltip title="search">
          <Button
            shape="circle"
            icon={<SearchOutlined />}
            onClick={() =>
              (window.location.href = window.location.origin + `/search?q=${q}`)
            }
            style={{ padding: "0 10px" }}
          />
        </Tooltip>
      </Menu.Item>
      <Menu.Item key="2" >
        <Link to="/cart">
          <ShoppingCartOutlined />
        </Link>
      </Menu.Item>
      <Menu.Item key="3"  >
        <UserOutlined />
      </Menu.Item>
    </SubMenu> */
}
