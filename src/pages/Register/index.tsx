import { Link, useNavigate } from "react-router-dom";
import { Layout, Button, Row, Col, Typography, Form, Input, Checkbox } from "antd";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { TRegisterSchema, registerSchema } from "@/common/formValidations";
import { apiRegisterAsync } from "@/store/auth/api";

const { Title } = Typography;
const { Content } = Layout;

const Register = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<TRegisterSchema>({
    defaultValues: { name: "", surname: "", email: "", password: "", password_confirmation: "", terms: true },
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: TRegisterSchema) => {
    try {
      const response = await apiRegisterAsync(data);
      if (!response.error) {
        navigate("/");
        reset();
      }
    } catch (error) {
      return;
    }
  };

  return (
    <Content className="signin">
      <Row gutter={[24, 0]} justify="space-around">
        <Col xs={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 2 }} md={{ span: 12 }}>
          <Title className="mb-15">Register</Title>
          <Title className="font-regular text-muted" level={5}>
            Create a new account to sign in
          </Title>
          <Form onFinish={handleSubmit(onSubmit)} layout="vertical" className="row-col" autoComplete="off">
            {/* <pre>{JSON.stringify(errors, null, 2)}</pre> */}

            <Form.Item
              className="name"
              label="Name"
              help={errors.name ? errors.name.message : ""}
              validateStatus={errors.name ? "error" : "success"}
            >
              <Controller
                name="name"
                render={({ field }) => <Input {...field} placeholder="Name" type="text" />}
                control={control}
              />
            </Form.Item>

            <Form.Item
              className="surname"
              label="Surname"
              help={errors.surname ? errors.surname.message : ""}
              validateStatus={errors.surname ? "error" : "success"}
            >
              <Controller
                name="surname"
                render={({ field }) => <Input {...field} placeholder="Surname" type="text" />}
                control={control}
              />
            </Form.Item>

            <Form.Item
              className="email"
              label="Email"
              help={errors.email ? errors.email.message : ""}
              validateStatus={errors.email ? "error" : "success"}
            >
              <Controller
                name="email"
                render={({ field }) => <Input {...field} placeholder="Email" type="email" />}
                control={control}
              />
            </Form.Item>

            <Form.Item
              className="password"
              label="Password"
              help={errors.password ? errors.password.message : ""}
              validateStatus={errors.password ? "error" : "success"}
            >
              <Controller
                name="password"
                render={({ field }) => <Input {...field} placeholder="Password" type="password" />}
                control={control}
              />
            </Form.Item>

            <Form.Item
              className="password_confirmation"
              label="Confirm Password"
              help={errors.password_confirmation ? errors.password_confirmation.message : ""}
              validateStatus={errors.password_confirmation ? "error" : "success"}
            >
              <Controller
                name="password_confirmation"
                render={({ field }) => <Input {...field} placeholder="Confirm Password" type="password" />}
                control={control}
              />
            </Form.Item>

            <Form.Item
              className="terms"
              valuePropName="checked"
              help={errors.terms ? errors.terms.message : ""}
              validateStatus={errors.terms ? "error" : "success"}
            >
              <Controller
                name="terms"
                render={({ field: { onChange, value } }) => (
                  <Checkbox checked={value} onChange={onChange}>
                    I agree the{" "}
                    <a href="#" className="font-bold text-dark">
                      Terms and Conditions
                    </a>
                  </Checkbox>
                )}
                control={control}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
                loading={isSubmitting}
                disabled={isSubmitting}
              >
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
