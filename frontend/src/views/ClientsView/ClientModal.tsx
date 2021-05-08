import React from 'react';
import {Modal, Form, Input, Button } from 'antd';
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};
const tailLayout = {wrapperCol: { offset: 4 }};

export const ClientModal = ({
  handleCancel,
  isModalVisible,
  isEditMode,
  form,
  onFinish,
  onFinishFailed
}: any) : JSX.Element => ( <Modal
  title="Dodaj klienta"
  onCancel={handleCancel}
  visible={isModalVisible}
  footer={null}>
  <Form
    {...layout}
    form={form}
    name="basic"
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
  >
    <Form.Item
      label="ID"
      name="id"
      hidden
    >
      <Input/>
    </Form.Item>
    <Form.Item
      label="Nazwa"
      name="name"
      rules={[{ message: 'Wpisz nazwę!', required: true }]}
    >
      <Input/>
    </Form.Item>
    <Form.Item
      label="NIP"
      name="taxId"
    >
      <Input/>
    </Form.Item>

    <Form.Item
      label="Ulica i numer"
      name="streetWithNumber"
    >
      <Input/>
    </Form.Item>
    <Form.Item
      label="Kod pocztowy"
      name="zipCode"
    >
      <Input/>
    </Form.Item>
    <Form.Item
      label="Miasto"
      name="city"
    >
      <Input/>
    </Form.Item>

    <Form.Item {...tailLayout}>
      <Button type="primary" htmlType="submit">
        {isEditMode ? 'Edytuj' : 'Dodaj'}
      </Button>
    </Form.Item>
  </Form>
</Modal>);
