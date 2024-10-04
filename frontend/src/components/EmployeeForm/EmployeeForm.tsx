import { Employee } from "@prisma/client";
import { Card, Form, Space } from "antd";
import { StyledInput } from "../ui/StyledInput";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { StyledButton } from "../ui/StyledButton";

type Props<T> = {
  onFinish: (values: T) => void;
  btnText: string;
  title: string;
  error?: string;
  employee?: T;
};

export const EmployeeForm = ({
  onFinish,
  btnText,
  title,
  error,
  employee,
}: Props<Employee>) => {
  return (
    <Card title={title} style={{ width: "32rem" }}>
      <Form name="employee-name" onFinish={onFinish} initialValues={employee}>
        <StyledInput type="text" name="firstName" placeholder="Add Name" />
        <StyledInput type="text" name="lastName" placeholder="Last Name" />
        <StyledInput type="number" name="age" placeholder="Age" />
        <StyledInput type="text" name="address" placeholder="Address" />
        <Space>
          <ErrorMessage message={error} />
          <StyledButton htmlType="submit">{btnText}</StyledButton>
        </Space>
      </Form>
    </Card>
  );
};
