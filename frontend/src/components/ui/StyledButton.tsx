import { Button, Form } from "antd";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  htmlType?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  type?: "link" | "text" | "default" | "primary" | "dashed" | undefined;
  danger?: boolean;
  loading?: boolean;
  shape?: "default" | "circle" | "round" | undefined;
  icon?: ReactNode
};

export const StyledButton = ({
  children,
  htmlType = "button",
  onClick,
  type,
  danger,
  loading,
  shape,
  icon
}: Props) => {
  return (
    <Form.Item>
      <Button
        htmlType={htmlType}
        onClick={onClick}
        type={type}
        danger={danger}
        loading={loading}
        shape={shape}
        icon={icon}
      >
        {children}
      </Button>
    </Form.Item>
  );
};
