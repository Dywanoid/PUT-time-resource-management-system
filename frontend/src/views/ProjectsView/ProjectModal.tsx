import { Modal, Form, Input, Button, FormInstance } from 'antd';

interface ProjectModalInput {
  isEditMode: boolean,
  isModalVisible: boolean,
  handleCancel: () => void,
  onFinish: (any) => Promise<void> | void,
  onFinishFailed: (any) => void,
  form: FormInstance
}

export const ProjectModal = ({
  handleCancel,
  isModalVisible,
  isEditMode,
  form,
  onFinish,
  onFinishFailed
}: ProjectModalInput) : JSX.Element => ( <Modal
  title="Dodaj projekt"
  onCancel={ handleCancel }
  visible={ isModalVisible }
  footer={ null }>
  <Form
    labelCol={{ span: 4 }}
    wrapperCol={{ span: 20 }}
    form={form}
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
      label={ localStorage.getItem('lang') === 'pl' ? 'Nazwa' : 'Name' }
      name="name"
      rules={ [{ message: 'Wpisz nazwę!', required: true }] }
    >
      <Input/>
    </Form.Item>
    <Form.Item
      wrapperCol= {{ offset: 4 }}
    >
      <Button type="primary" htmlType="submit">
        { isEditMode
          ? localStorage.getItem('lang') === 'pl' ? 'Edytuj' : 'Edit'
          : localStorage.getItem('lang') === 'pl' ? 'Dodaj' : 'Add' }
      </Button>
    </Form.Item>
  </Form>
</Modal>);
