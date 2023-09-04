import React from "react";
import { Card, Button, Form, Input, Row, Col } from "antd";
import ConnectToBroker from "./ConnectToBroker";

const Connection = ({ connect, disconnect, connectBtn }) => {
  const [form] = Form.useForm();
  const record = {
    host: "68.183.188.135",
    // "broker.emqx.io",
    clientId: `Robot_ + ${Math.random().toString(16).substr(2, 8)}`,
    // swarm_client
    port: 9001,
    username: "swarm_user",
    password: "swarm_usere15",
  };

  const handleConnect = () => {
    form.submit();
  };

  const handleDisconnect = () => {
    disconnect();
  };

  const ConnectionForm = (
    <Form
      layout="vertical"
      name="basic"
      form={form}
      initialValues={record}
      onFinish={(values) => ConnectToBroker(connect, values)}
    >
      <Row gutter={20}>
        <Col span={8}>
          <Form.Item label="Host" name="host">
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Port" name="port">
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Client ID" name="clientId">
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Username" name="username">
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Password" name="password">
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );

  return (
    <Card
      title="Connection"
      actions={[
        <Button type="primary" onClick={handleConnect}>
          {connectBtn}
        </Button>,
        <Button danger onClick={handleDisconnect}>
          Disconnect
        </Button>,
      ]}
    >
      {ConnectionForm}
    </Card>
  );
};

export default Connection;
