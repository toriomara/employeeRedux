import { Button, Result, Row } from "antd";
import { Link, useParams } from "react-router-dom";

const Statuses: Record<string, string> = {
  created: "Success! User created",
  updated: "Success! User updated",
  deleted: "Success! User deleted",
};

export const StatusPage = () => {
  const { status } = useParams();
  return (
    <Row align="middle" justify="center" style={{ width: "100%" }}>
      <Result
        status={status ? "success" : 404}
        title={status ? Statuses[status] : "Not found"}
        extra={
          <Button key="dashboard">
            <Link to="/">Home</Link>
          </Button>
        }
      />
    </Row>
  );
};
