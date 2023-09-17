import { useState } from "react";
import { Form, Input, Button, Checkbox, Card } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import { apiLoginAsync } from "../../common/api-utils";
import { LoginPayloadType } from "../../common/types";

/**
 *
 * @todo
 * 1. http://localhost:5173/ CORS setup
 * 2. token cacheSet
 * 3. Private & Public routes will be seperated
 * 4. Error Boundary
 * 5. Admin uı prepared w/ antd ui kit
 */

const Login = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: LoginPayloadType) => {
    console.log("Received values of form: ", values);
    setLoading(true);
    const data = await apiLoginAsync(values);
    console.log("data: ", data);
    setLoading(false);
  };

  return (
    <Card title="Login" bordered={false}>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
              type: "email",
            },
          ]}
        >
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Link className="login-form-forgot" to="/forgot-password">
            Forgot password
          </Link>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button" loading={loading} disabled={loading}>
            Log in
          </Button>
          Or <Link to="/register">register now!</Link>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Login;
