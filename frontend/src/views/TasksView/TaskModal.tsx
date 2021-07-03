import React from 'react';
import { Modal, Form, Input, Button, FormInstance } from 'antd';

interface TaskModalInput {
  isEditMode: boolean,
  isModalVisible: boolean,
  handleCancel: () => void,
  onFinish: (any) => Promise<void> | void,
  onFinishFailed: (any) => void,
  form: FormInstance
}

export const TaskModal = ({
  handleCancel,
  isModalVisible,
  isEditMode,
  form,
  onFinish,
  onFinishFailed
}: TaskModalInput) : JSX.Element => ( <Modal
  title={ localStorage.getItem('lang') === 'pl' ? 'Dodaj projekt' : 'Add project' }
  onCancel={ handleCancel }
  visible={ isModalVisible }
  footer={ null }>
  <Form
    labelCol={{ span: 4 }}
    wrapperCol={{ span: 20 }}
    form={ form }
    name="basic"
    onFinish={ onFinish }
    onFinishFailed={ onFinishFailed }
  >
    <Form.Item
      label="ID"
      name="id"
      hidden
    >
      <Input/>
    </Form.Item>
    <Form.Item
      label="ID"
      name="clientId"
      hidden
    >
      <Input/>
    </Form.Item>
    <Form.Item
      label="ID"
      name="projectId"
      hidden
    >
      <Input/>
    </Form.Item>
    <Form.Item
      label={ localStorage.getItem('lang') === 'pl' ? 'Nazwa' : 'Name' }
      name="name"
      rules={ [{ message: localStorage.getItem('lang') === 'pl' ? 'Wpisz nazwę!' : 'Enter name!', required: true }] }
    >
      <Input/>
    </Form.Item>
    <Form.Item
      wrapperCol={{ offset: 4 }}
    >
      <Button
        type="primary"
        htmlType="submit"
      >
        { isEditMode
          ? localStorage.getItem('lang') === 'pl' ? 'Edytuj' : 'Edit'
          : localStorage.getItem('lang') === 'pl' ? 'Dodaj' : 'Add' }
      </Button>
    </Form.Item>
  </Form>
</Modal>);
