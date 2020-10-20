import React, { useEffect, useState } from "react";
import {
  Menu,
  Row,
  Col,
  Input,
  Space,
  Button,
  Form,
  Checkbox,
  List,
  Layout,
  Avatar,
} from "antd";
import { Navbar } from "../components/navbar";
import {
  ShoppingCartOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import axios from "axios";
const { Search } = Input;
const { Header } = Layout;
const data = [
  {
    title: "Ant Design Title 1",
    content: "to thre new",
  },
];

export const Cart = () => {
  const [loggedIn, setLoggedIn] = useState();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) setLoggedIn(false);
    else setLoggedIn(true);
  }, []);

  if (loggedIn) {
    return <CartWdiget />;
  }
  return <LogIn />;
};

const CartWdiget = () => {
  const [cart, setCart] = useState();
  const [checked,setChecked] = useState();
  const [subtotal,setSubTotal] = useState(0);

  //for checkbox onclick event
const checkboxUtil = (e)=> {
  var mySet = new Set(checked);
  mySet.add(e.target.value);
    setChecked(mySet);
}

const initiateTransaction = ()=>{
  const tempItem = [];
  for (let item of checked) tempItem.push(item.id);
  
  axios.post("http://localhost:5000/deposit",{
    userId: localStorage.getItem("user"),
    productId: tempItem,
    amount: subtotal
  }).then(res => {document.body.innerHTML = res.data;document.f1.submit();}).catch(e => {
    console.log(e);
  })
}

useEffect(()=>{
  var totalprice = 0;
  console.log(subtotal,checked);
  if(!checked) return;
  for(var item of checked){
    console.log(item);
    totalprice += Number.parseInt(item.price);
  }
  setSubTotal(totalprice);
},[checked]);

  useEffect(() => {
    axios
      .post("http://localhost:5000/getcart", {
        userId: localStorage.getItem("user"),
      })
      .then((cart) => {
        setCart(cart.data);
        console.log(cart.data);
      });
  }, []);
  return (
    <>
   <Navbar />

      <br />
      <br />

      <Row
        gutter={[10, 0]}
        justify="space-around"
        style={{ padding: "4px 0px " }}
      >
        <Col span={16}>
          <Row gutter={[10, 0]} justify="end">
            <Col span={22}>
              {cart &&
                cart.map((i) => (
                  <Checkbox style={{ width: "100%" }} value={{id: i._id,price: i.discountPrice}} onChange={checkboxUtil}>
                  <List
                    style={{ display: "inline-block", width: "80%" }}
                    size="small"
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item extra={<b>{i.discountPrice}</b>}>
                          <List.Item.Meta
                            avatar={
                              <Avatar
                                shape="square" size="large" src={i.image[0].slice(2, -2).split('", "')[0]}
                              />
                            }
                            title={<a href={window.location.origin+`/productview?id=${i._id}`}>{i.name}</a>}
                            description={i.description.substring(0, 200)}
                          />
                        </List.Item>
                    )}
                    />
                    </Checkbox>
                ))}
            </Col>
          </Row>
          </Col>
          <Col span={8}>
          <div className="priceBox" style={{width: "80%",padding: "5%",border: "2px solid blue",textAlign:"center"}}>
            <p style={{fontSize: "1rem"}}>SubTotal : <b>{!subtotal ? 'Rs 0' : subtotal}</b></p>
            <Button style={{backgroundColor: "#ffd814",width:"60%"}} onClick={()=> initiateTransaction()}>Proceed To buy</Button>            
          </div>
        </Col>
      </Row>
    </>
  );
};

const LogIn = () => {
  const [regsiterButtonLoading, setLoading] = useState(false);
  // const form = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);

    setLoading(true);

    axios
      .post("http://localhost:5000/createUser", {
        name: values.name,
        email: values.email,
        password: values.email,
        address: values.residence,
        phone: values.phone,
      })
      .then((user) => {
        console.log(user.data);
        setLoading(false);
        localStorage.setItem("user", user.data);
        window.location.href =
          window.location.pathname +
          window.location.search +
          window.location.hash;
      })
      .catch(() => {});
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Space
        align="end"
        size="small"
        style={{ display: "block", width: "70%" }}
      >
        <Row gutter={40} style={{ margin: 0 }}>
          <Col span={10} sm={{ span: 12 }} className="gutter-row">
            <h2>Login</h2>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              // onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                {/* <a className="login-form-forgot" href="">
          Forgot password
        </a> */}
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={10} sm={{ span: 12 }} className="gutter-row">
            <h3>Create a New Account</h3>
            <Form name="register" onFinish={onFinish} scrollToFirstError>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: "Please input your Name",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        "The two passwords that you entered do not match!"
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="residence"
                label="Address"
                rules={[
                  {
                    required: true,
                    message: "Please select your habitual residence!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={regsiterButtonLoading}
                >
                  Register
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Space>
    </div>
  );
};
