import { Form, Input } from "antd";
import { NamePath } from "antd/es/form/interface";

type Props = {
  name: string;
  placeholder: string;
  dependencies?: NamePath[];
};

export const StyledInputPass = ({ name, placeholder, dependencies }: Props) => {
  return (
    <Form.Item
      name={name}
      dependencies={dependencies}
      hasFeedback
      rules={[
        { required: true, message: "Required field" },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value) {
              return Promise.resolve();
            }

            if (name === "confirmPassword") {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Passwords must be equal"));
            } else {
              if (value.length >= 6) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("Password must have 6 symbols at least")
              );
            }
          },
        }),
      ]}
    >
      <Input.Password placeholder={placeholder} type="password" size="large" />
    </Form.Item>
  );
};
