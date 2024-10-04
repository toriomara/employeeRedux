import { Table } from "antd";
import { MainLayout } from "../components/layout/mainLayout";
import { StyledButton } from "../components/ui/StyledButton";
import { ColumnsType } from "antd/es/table";
import { Employee } from "@prisma/client";
import { useGetAllEmployeesQuery } from "../app/services/employees";
import { useNavigate } from "react-router-dom";
import { Paths } from "../paths";
import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import { useEffect } from "react";

const cols: ColumnsType<Employee> = [
  {
    title: "Name",
    dataIndex: "firstName",
    key: "Name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

export const EmployeesPage = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllEmployeesQuery();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const addUserPage = () => {
    navigate(Paths.addEmployee);
  };

  return (
    <MainLayout>
      <StyledButton type="primary" onClick={addUserPage}>
        Add Employee
      </StyledButton>
      <Table
        columns={cols}
        loading={isLoading}
        dataSource={data}
        pagination={false}
        rowKey={(record) => record.id}
        onRow={(record) => {
          return {
            onClick: () => navigate(`${Paths.employee}/${record.id}`),
          };
        }}
      />
    </MainLayout>
  );
};
