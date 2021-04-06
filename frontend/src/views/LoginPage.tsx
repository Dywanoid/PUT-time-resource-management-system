import React, {useContext, useState} from 'react';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { AuthenticationContext } from '../utils/auth';
import { useMount } from '../utils/hooks';
import 'antd/dist/antd.css';
import '../css/LoginPage.css';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const LoginPage = () => {
  const auth = useContext(AuthenticationContext)
        , handleSubmit = ({username, password}) => {
          if(username === 'test' && password === 'test123') {
            auth.signin(() => {
              history.replace(from);
              if(isMounted) {
                setShouldRedirect(true);
              }
            });
          }
        }
        , history = useHistory()
        , isMounted = useMount()
        , [shouldRedirect, setShouldRedirect] = useState<boolean>(false)
        , location = useLocation()
        , { from } = location.state || { from: { pathname: '/' } };


  if(shouldRedirect || auth.user) {
    return <Redirect to="/home"/>;
  }

  return (
    <Row justify="center" align="middle" className="login-background">
      <Col span={4} >
        <Form
          name="basic"
          initialValues={{ remember: true }}
          // eslint-disable-next-line react/jsx-no-bind
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
