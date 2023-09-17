import { Form, Input, Button, Card } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { LoginPayloadType } from "../../common/types";

const ForgotPassword = () => {
  const onFinish = (values: LoginPayloadType) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Card title="Forgot Password" bordered={false}>
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
            },
          ]}
        >
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>

        <Form.Item>
          <Link className="login-form-forgot" to="/">
            Login
          </Link>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Send
          </Button>
          Or <Link to="/register">register now!</Link>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ForgotPassword;
