import React from 'react';
import { Modal, Form, Input, Button, Select, FormInstance } from 'antd';
import { Currency } from '../../generated/graphql';
import { currencies } from './ClientsView';
const { Option } = Select;

interface ClientModalInput {
  isEditMode: boolean,
  isModalVisible: boolean,
  initialValues: {
    currency: Currency
  },
  handleCancel: () => void,
  onFinish: (any) => Promise<void> | void,
  onFinishFailed: (any) => void,
  form: FormInstance
}

export const ClientModal = ({
  handleCancel,
  isModalVisible,
  isEditMode,
  form,
  initialValues,
  onFinish,
  onFinishFailed
}: ClientModalInput) : JSX.Element => ( <Modal
  title="Dodaj klienta"
  onCancel={ handleCancel }
  visible={ isModalVisible }
  footer={ null }>
  <Form
    labelCol= {{ span: 4 }}
    wrapperCol= {{ span: 20 }}
    form={ form }
    initialValues={initialValues}
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
    <Form.Item
      label="Waluta"
      name="currency"
    >
      <Select style={{ width: 120 }}>
        {
          currencies.map((key) => (
            <Option key={key} value={key}>{key}</Option>
          ))
        }
      </Select>
    </Form.Item>
    <Form.Item
      wrapperCol={{ offset: 4 }}>
      <Button
        type="primary"
        htmlType="submit"
      >
        { isEditMode ? 'Edytuj' : 'Dodaj' }
      </Button>
    </Form.Item>
  </Form>
</Modal>);