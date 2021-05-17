import React, { useRef } from 'react';
import { Layout, Form, Input, Button, Select, FormInstance } from 'antd';
import 'antd/dist/antd.css';

const { Content } = Layout;
const { Option } = Select;

export const ApplicationsView = (): JSX.Element => {
  const formRef = useRef<FormInstance>(null);

  const onGenderChange = (value: string) => {
    switch (value) {
      case 'male':
        formRef.current?.setFieldsValue({ note: 'Hi, man!' });

        return;
      case 'female':
        formRef.current?.setFieldsValue({ note: 'Hi, lady!' });

        return;
      case 'other':
        formRef.current?.setFieldsValue({ note: 'Hi there!' });
    }
  };

  const onFinish = () => {
    // values are passed here
    console.log('done!');
  };

  const onReset = () => {
    formRef.current?.resetFields();
  };

  const onFill = () => {
    formRef.current?.setFieldsValue({
      gender: 'male',
      note: 'Hello world!'
    });
  };

  return (
    <Layout>
      <Content>
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}
          ref={formRef} name="control-ref" onFinish={onFinish}>
          <Form.Item name="note" label="Note" rules={[{ required: true }]}>
            <Input/>
          </Form.Item>
          <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
            <Select
              placeholder="Select a option and change input text above"
              onChange={onGenderChange}
              allowClear
            >
              <Option value="male">male</Option>
              <Option value="female">female</Option>
              <Option value="other">other</Option>
            </Select>
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
          >
            {({ getFieldValue }) =>
              getFieldValue('gender') === 'other'
                ? (
                  <Form.Item
                    name="customizeGender"
                    label="Customize Gender"
                    rules={[{ required: true }]}
                  >
                    <Input/>
                  </Form.Item>
                )
                : null
            }
          </Form.Item>
          <Form.Item  wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
            Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
            Reset
            </Button>
            <Button type="link" htmlType="button" onClick={onFill}>
            Fill form
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};