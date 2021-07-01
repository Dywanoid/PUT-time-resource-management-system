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
  title={ localStorage.getItem('lang') === 'pl' ? 'Dodaj klienta' : 'Add client' }
  onCancel={ handleCancel }
  visible={ isModalVisible }
  footer={ null }>
  <Form
    labelCol= {{ span: 4 }}
    wrapperCol= {{ span: 20 }}
    form={ form }
    initialValues={ initialValues }
    name={ localStorage.getItem('lang') === 'pl' ? 'podstawowe' : 'basic' }
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
      label={ localStorage.getItem('lang') === 'pl' ? 'Nazwa' : 'Name' }
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
      label={ localStorage.getItem('lang') === 'pl' ? 'Ulica i numer' : 'Street and number' }
      name="streetWithNumber"
    >
      <Input/>
    </Form.Item>
    <Form.Item
      label={ localStorage.getItem('lang') === 'pl' ? 'Kod pocztowy' : 'Zip code' }
      name="zipCode"
    >
      <Input/>
    </Form.Item>
    <Form.Item
      label={ localStorage.getItem('lang') === 'pl' ? 'Miasto' : 'City' }
      name="city"
    >
      <Input/>
    </Form.Item>
    <Form.Item
      label={ localStorage.getItem('lang') === 'pl' ? 'Waluta' : 'Currency' }
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
        { isEditMode
          ? localStorage.getItem('lang') === 'pl' ? 'Edytuj' : 'Edit'
          : localStorage.getItem('lang') === 'pl' ? 'Dodaj' : 'Add' }
      </Button>
    </Form.Item>
  </Form>
</Modal>);