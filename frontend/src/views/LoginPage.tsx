import React, { useContext, useState } from 'react';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { Auth, AuthenticationContext } from '../utils/auth';
import { useMount } from '../utils/hooks';
import 'antd/dist/antd.css';
import '../css/LoginPage.css';
interface LocationState {
  from: {
    pathname: string;
  };
}

const defaultLocation: LocationState = { from: { pathname: '/' } };

export const LoginPage: React.FC = ()  => {
  const auth = useContext<Auth>(AuthenticationContext);
  const handleSubmit = ({ username, password }) => {
    if(username === 'test' && password === 'test123') {
      auth?.signin(() => {
        history.replace(from);
        if(isMounted) {
          setShouldRedirect(true);
        }
      });
    }
  };

  const history = useHistory();
  const isMounted = useMount();
  const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);
  const location = useLocation<LocationState>();
  const { from } = location.state || defaultLocation;

  if(shouldRedirect || auth?.user) {
    return <Redirect to="/"/>;
  }

  return (
    <Row justify="center" align="middle" className="login-background">
      <Col span={4} >
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{  message: 'Please input your username!', required: true }]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ message: 'Please input your password!', required: true }]}
          >
            <Input.Password/>
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
};