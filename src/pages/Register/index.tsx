import { Link } from "react-router-dom";
import { Layout, Button, Row, Col, Typography, Form, Input, Checkbox } from "antd";

import { LoginPayloadType } from "@/common/types";

const { Title } = Typography;
const { Content } = Layout;

const Register = () => {
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
          <Title className="mb-15">Register</Title>
          <Title className="font-regular text-muted" level={5}>
            Create a new account to sign in
          </Title>
          <Form onFinish={onFinish} onFinishFailed={onFinishFailed} layout="vertical" className="row-col">
            <Form.Item
              className="name"
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your fullname!",
                },
              ]}
            >
              <Input placeholder="Name" />
            </Form.Item>

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

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>
                I agree the{" "}
                <a href="#" className="font-bold text-dark">
                  Terms and Conditions
                </a>
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                SIGN UP
              </Button>
            </Form.Item>
            <p className="font-semibold text-muted">
              Already have an account?{" "}
              <Link to="/" className="font-bold text-dark">
                Sign In
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

export default Register;
