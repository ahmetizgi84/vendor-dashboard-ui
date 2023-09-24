import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout, Button, Row, Col, Typography, Form, Input, Switch } from "antd";

import { LoginPayloadType } from "../../common/types";
import { apiLoginAsync } from "../../common/api-utils";
import { _setAuthState, _setUsername } from "../../store/auth";
import { setAuthState } from "../../store/auth/actions";

function onChange(checked: any) {
  console.log(`switch to ${checked}`);
}
const { Title } = Typography;
const { Content } = Layout;

const Login = () => {
  const navigate = useNavigate();

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  // /**
  //  *
  //  * @todo
  //  * 1. http://localhost:5173/ CORS setup
  //  * 2. token cacheSet
  //  * 3. Private & Public routes will be seperated
  //  * 4. Error Boundary
  //  * 5. Admin uı prepared w/ antd ui kit
  //  */

  const [loading, setLoading] = useState(false);

  async function onFinish(values: LoginPayloadType) {
    console.log("Received values of form: ", values);
    try {
      setLoading(true);
      const data = await apiLoginAsync(values);
      console.log("data: ", data);
      setAuthState(true);
    } catch (error) {
      console.log("error: ", error);
      return {
        error: "Invalid login attempt",
      };
    } finally {
      setLoading(false);
    }

    navigate("/");
  }

  return (
    <Content className="signin">
      <Row gutter={[24, 0]} justify="space-around">
        <Col xs={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 2 }} md={{ span: 12 }}>
          <Title className="mb-15">Sign In</Title>
          <Title className="font-regular text-muted" level={5}>
            Enter your email and password to sign in
          </Title>
          <Form onFinish={onFinish} onFinishFailed={onFinishFailed} layout="vertical" className="row-col">
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
              <Input placeholder="Email" />
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
              <Input placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Form.Item name="remember" className="aligin-center" style={{ flex: 1 }} valuePropName="checked" noStyle>
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
              <Button type="primary" htmlType="submit" style={{ width: "100%" }} loading={loading} disabled={loading}>
                LOGIN
              </Button>
            </Form.Item>
            <p className="font-semibold text-muted">
              Don't have an account?{" "}
              <Link to="/register" className="text-dark font-bold">
                Sign Up
              </Link>
            </p>
          </Form>
        </Col>
        <Col className="sign-img" style={{ padding: 12 }} xs={{ span: 24 }} lg={{ span: 12 }} md={{ span: 12 }}>
          <img src={"/images/img-signin.jpg"} alt="" />
        </Col>
      </Row>
    </Content>
  );
};

export default Login;
