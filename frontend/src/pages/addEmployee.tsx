import React, { useEffect, useState } from "react";
import { MainLayout } from "../components/layout/mainLayout";
import { Row } from "antd";
import { EmployeeForm } from "../components/EmployeeForm/EmployeeForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import { useAddEmployeeMutation } from "../app/services/employees";
import { Employee } from "@prisma/client";
import { Paths } from "../paths";
import { isErrorWithMessage } from "../utils/isErrorWithMessage";

export const AddEmployeePage = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [addEmployee] = useAddEmployeeMutation();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  const handleAddEmployee = async (data: Employee) => {
    try {
      await addEmployee(data).unwrap();
      navigate(`${Paths.status}/created`);
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
          title="Add Employee"
          btnText="Add"
          onFinish={handleAddEmployee}
          error={error}
        />
      </Row>
    </MainLayout>
  );
};
