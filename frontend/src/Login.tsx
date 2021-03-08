import React from 'react';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import {Link} from 'react-router-dom';
import 'antd/dist/antd.css';
import './Login.css';

export default class Login extends React.Component{

render() {
  return (
    <Row justify="center" align="middle" style={{minHeight: '100vh'}} className="login-background">
      <Col span={4} >
        <Form
          name="basic"
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
          <Link to="/home">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Link>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
}
