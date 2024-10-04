import { Card, Form, Row, Space, Typography } from "antd";
import { MainLayout } from "../components/layout/mainLayout";
import { StyledInput } from "../components/ui/StyledInput";
import { StyledInputPass } from "../components/ui/StyledInputPass";
import { StyledButton } from "../components/ui/StyledButton";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../paths";
import { useLoginMutation, UserData } from "../app/services/auth";
import { isErrorWithMessage } from "../utils/isErrorWithMessage";
import { useEffect, useState } from "react";
import { ErrorMessage } from "../components/ErrorMessage/ErrorMessage";
import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";

export const LoginPage = () => {
  const [loginUser, loginUserResult] = useLoginMutation();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  const handleLogin = async (data: UserData) => {
    try {
      await loginUser(data).unwrap();
      navigate("/");
    } catch (error) {
      // console.log(error);
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
        <Card title="Sign In" style={{ width: "30rem" }}>
          <Form onFinish={handleLogin}>
            <StyledInput
              name="email"
              placeholder="your@email.com"
              type="email"
            />
            <StyledInputPass name="password" placeholder="Password" />
            <StyledButton
              type="primary"
              htmlType="submit"
              loading={loginUserResult.isLoading}
            >
              Log In
            </StyledButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              No account? <Link to={Paths.register}>Sign Up</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </MainLayout>
  );
};
