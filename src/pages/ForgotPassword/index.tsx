import { Link } from "react-router-dom";
import { Layout, Button, Row, Col, Typography, Form, Input, Space } from "antd";

import { LoginPayloadType } from "../../common/types";

const { Title } = Typography;
const { Content } = Layout;

const ForgotPassword = () => {
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = async (values: LoginPayloadType) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Content className="signin">
      <Row gutter={[24, 0]} justify="space-around">
        <Col xs={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 2 }} md={{ span: 12 }}>
          <Title className="mb-15">Forgot Password</Title>
          <Title className="font-regular text-muted" level={5}>
            Enter your email and to get reset link
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

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                SEND
              </Button>
            </Form.Item>

            <Form.Item>
              <Space>
                <Link className="login-form-forgot" to="/">
                  Sign In
                </Link>

                <Link className="login-form-forgot" to="/register">
                  Sign Up
                </Link>
              </Space>
            </Form.Item>
          </Form>
        </Col>
        <Col className="sign-img" style={{ padding: 12 }} xs={{ span: 24 }} lg={{ span: 12 }} md={{ span: 12 }}>
          <img src={"/images/img-signin.jpg"} alt="" />
        </Col>
      </Row>
    </Content>
  );
};

export default ForgotPassword;
