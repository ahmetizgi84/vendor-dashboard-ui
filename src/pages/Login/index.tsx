import { Link, useNavigate } from "react-router-dom";
import {
  Layout,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Switch,
} from "antd";
import { useState } from "react";

import { TLoginPayloadDTO } from "@/common/types";
import { useAuth } from "@/store/auth/hooks";
import { apiLoginAsync } from "@/store/auth/api";

const { Title } = Typography;
const { Content } = Layout;

function onChange(checked: any) {
  console.log(`switch to ${checked}`);
}

// /**
//  *
//  * @todo
//  * 1. http://localhost:5173/ CORS setup
//  * 2. token cacheSet
//  * 3. Private & Public routes will be seperated
//  * 4. Error Boundary
//  * 5. Admin uı prepared w/ antd ui kit
//  */

const Login = () => {
  const navigate = useNavigate();
  const { isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  async function onFinish(values: TLoginPayloadDTO) {
    try {
      await apiLoginAsync(values);
    } catch (error) {
      return;
    }
    navigate("/");
  }

  const setTestUser = () => {
    setEmail("john@example.com");
    setPassword("12345678");
  };

  return (
    <Content className="signin">
      <Row gutter={[24, 0]} justify="space-around">
        <Col
          xs={{ span: 24, offset: 0 }}
          lg={{ span: 6, offset: 2 }}
          md={{ span: 12 }}
        >
          <Title className="mb-15">Sign In</Title>
          <Title className="font-regular text-muted" level={5}>
            Enter your email and password to sign in
          </Title>
          <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
            className="row-col"
          >
            <Form.Item
              className="username"
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input placeholder="Email" value={email} />
            </Form.Item>

            <Form.Item
              className="username"
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input placeholder="Password" value={password} />
            </Form.Item>

            <Form.Item>
              <Form.Item
                name="remember"
                className="aligin-center"
                style={{ flex: 1 }}
                valuePropName="checked"
                noStyle
              >
                <span>
                  <Switch defaultChecked onChange={onChange} />
                  Remember me
                </span>
              </Form.Item>

              <Link className="login-form-forgot" to="/forgot-password">
                Forgot password
              </Link>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
                loading={isLoading}
                disabled={isLoading}
              >
                LOGIN
              </Button>
            </Form.Item>
            {/* <Form.Item>
              <Button
                type="default"
                style={{ width: "100%" }}
                loading={isLoading}
                disabled={isLoading}
                onClick={setTestUser}
              >
                Set Test User
              </Button>
            </Form.Item> */}
            <p className="font-semibold text-muted">
              Don't have an account?{" "}
              <Link to="/register" className="text-dark font-bold">
                Sign Up
              </Link>
            </p>
          </Form>
        </Col>
        <Col
          className="sign-img"
          style={{ padding: 12 }}
          xs={{ span: 24 }}
          lg={{ span: 12 }}
          md={{ span: 12 }}
        >
          <img src={"/images/img-signin.jpg"} alt="" />
        </Col>
      </Row>
    </Content>
  );
};

export default Login;
