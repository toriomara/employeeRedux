import styles from "./header.module.css";
import { Layout, Space, Typography } from "antd";
import {
  LoginOutlined,
  LogoutOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import { StyledButton } from "../ui/StyledButton";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../features/auth/authSlice";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Layout.Header className={styles.header}>
      <Space>
        <TeamOutlined className={styles.teamIcon} />
        <Link to={Paths.home}>
          <Typography.Title level={1}>Employees</Typography.Title>
        </Link>
      </Space>
      {user ? (
        <StyledButton
          type="text"
          onClick={handleLogout}
          icon={<LogoutOutlined />}
        >
          Logout
        </StyledButton>
      ) : (
        <Space>
          <Link to={Paths.register}>
            <StyledButton type="text" icon={<UserOutlined />}>
              Sign Up
            </StyledButton>
          </Link>
          <Link to={Paths.login}>
            <StyledButton type="text" icon={<LoginOutlined />}>
              Sign In
            </StyledButton>
          </Link>
        </Space>
      )}
    </Layout.Header>
  );
};
