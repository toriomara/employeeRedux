import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Paths } from "../paths";
import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import { MainLayout } from "../components/layout/mainLayout";
import {
  useGetEmployeeQuery,
  useRemoveEmployeeMutation,
} from "../app/services/employees";
import { Loader } from "../components/Loader/Loader";
import { Descriptions, Divider, Space, Modal } from "antd";
import { StyledButton } from "../components/ui/StyledButton";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ErrorMessage } from "../components/ErrorMessage/ErrorMessage";
import { isErrorWithMessage } from "../utils/isErrorWithMessage";

export const EmployeePage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const params = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading } = useGetEmployeeQuery(params.id || "");
  const [removeEmployee] = useRemoveEmployeeMutation();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user) {
      return;
    } else navigate("/login");
  }, [user, navigate]);

  // if (data) {
  //   return navigate("/");
  // }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  const handleRemoveEmployee = async () => {
    hideModal();
    try {
      const id = data?.id as string;
      await removeEmployee(id).unwrap();
      navigate(`${Paths.status}/deleted`);
    } catch (error) {
      const catchError = isErrorWithMessage(error);
      if (catchError) {
        setError(error.data.message);
      } else {
        setError("Undefined error");
      }
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    navigate("/");
  }

  return (
    <MainLayout>
      <Descriptions title="About Employee" bordered>
        <Descriptions.Item
          label="Name"
          span={3}
        >{`${data?.firstName} ${data?.lastName}`}</Descriptions.Item>
        <Descriptions.Item label="Age" span={3}>
          {data?.age}
        </Descriptions.Item>
        <Descriptions.Item label="Address" span={3}>
          {data?.address}
        </Descriptions.Item>
      </Descriptions>
      {user?.id === data?.userId && (
        <>
          <Divider orientation="left">Actions</Divider>
          <Space>
            <Link to={`/employee/edit/${data?.id}`}>
              <StyledButton
                shape="round"
                type="default"
                icon={<EditOutlined />}
              >
                Edit
              </StyledButton>
            </Link>
            <StyledButton
              shape="round"
              danger
              onClick={showModal}
              icon={<DeleteOutlined />}
            >
              Delete
            </StyledButton>
          </Space>
        </>
      )}
      <ErrorMessage message={error} />
      <Modal
        title="Confirm delete"
        open={isModalOpen}
        onOk={handleRemoveEmployee}
        onCancel={hideModal}
        okText="Confirm"
        cancelText="Cancel"
      >
        Do you want to delete the employee?
      </Modal>
    </MainLayout>
  );
};
