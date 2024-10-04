import { Card, Form, Row, Space, Typography } from "antd";
import { MainLayout } from "../components/layout/mainLayout";
import { StyledInput } from "../components/ui/StyledInput";
import { StyledInputPass } from "../components/ui/StyledInputPass";
import { StyledButton } from "../components/ui/StyledButton";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../paths";
// import { useSelector } from "react-redux";
// import { selectUser } from "../features/auth/authSlice";
import { useRegisterMutation } from "../app/services/auth";
import { isErrorWithMessage } from "../utils/isErrorWithMessage";
import { User } from "@prisma/client";
import { useState } from "react";
import { ErrorMessage } from "../components/ErrorMessage/ErrorMessage";

type RegisterData = Omit<User, "id"> & { confirmPassword: string };

export const RegisterPage = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // const user = useSelector(selectUser);
  const [registerUser] = useRegisterMutation();

  const handleRegister = async (data: RegisterData) => {
    try {
      await registerUser(data).unwrap();
      navigate("/");
    } catch (error) {
      const catchError = isErrorWithMessage(error);
      if (catchError) {
        setError(error.data.message);
      } else {
        setError("Undefined error");
      }
    }
  };

  return (
    <MainLayout>
      <Row align="middle" justify="center">
        <Card title="Sign Up" style={{ width: "30rem" }}>
          <Form onFinish={handleRegister}>
            <StyledInput name="name" placeholder="Name" />
            <StyledInput
              name="email"
              placeholder="your@email.com"
              type="email"
            />
            <StyledInputPass name="password" placeholder="Your password" />
            <StyledInputPass
              name="confirmPassword"
              placeholder="Confirm password"
            />
            <StyledButton type="primary" htmlType="submit">
              Sign Up
            </StyledButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Have account already? <Link to={Paths.login}>Sign In</Link>
            </Typography.Text>
          </Space>
          <ErrorMessage message={error} />
        </Card>
      </Row>
    </MainLayout>
  );
};
