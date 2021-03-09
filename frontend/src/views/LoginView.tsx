import React, {useContext, useState} from 'react';
import {Form, Input, Button, Checkbox, Row, Col} from 'antd';
import {Redirect, useHistory, useLocation} from 'react-router-dom';
import 'antd/dist/antd.css';
import './LoginView.css';
import {AuthenticationContext} from '../utils/auth';


export const LoginView = () => {
  const [shouldRedirect, setShouldRedirect] = useState<Boolean>(false);
  let auth = useContext(AuthenticationContext);
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };
  const handleSubmit = ({username, password}) => {
    if(username === 'test' && password === 'test123') {
      auth.signin(() => {
        history.replace(from);
        setShouldRedirect(true);
      });

    }
  };

  if(shouldRedirect || auth.user) {
    return <Redirect to="/home"/>;
  }

  return (
    <Row justify="center" align="middle" style={{minHeight: '100vh'}} className="login-background">
      <Col span={4} >
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
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
            <Button type="primary" htmlType="submit" >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
