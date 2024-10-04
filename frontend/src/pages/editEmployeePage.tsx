import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditEmployeeMutation,
  useGetEmployeeQuery,
} from "../app/services/employees";
import { Loader } from "../components/Loader/Loader";
import { MainLayout } from "../components/layout/mainLayout";
import { Row } from "antd";
import { Employee } from "@prisma/client";
import { Paths } from "../paths";
import { isErrorWithMessage } from "../utils/isErrorWithMessage";
import { EmployeeForm } from "../components/EmployeeForm/EmployeeForm";

export const EditEmployeePage = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const { data, isLoading } = useGetEmployeeQuery(params.id || "");
  const [editEmployee] = useEditEmployeeMutation();

  if (isLoading) {
    return <Loader />;
  }

  const handleEditEmployee = async (employee: Employee) => {
    try {
      const editingEmployee = {
        ...data,
        ...employee,
      };

      await editEmployee(editingEmployee).unwrap();
      navigate(`${Paths.status}/updated`);
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
        <EmployeeForm
          title="Edit employee"
          btnText="Edit"
          error={error}
          employee={data}
          onFinish={handleEditEmployee}
        />
      </Row>
    </MainLayout>
  );
};
