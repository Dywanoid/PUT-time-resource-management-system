import React from 'react';
import { Modal,DatePicker, Form, Input, Button, FormInstance } from 'antd';
import { IntlShape } from 'react-intl';
const { RangePicker } = DatePicker;

interface AssignmentModalInput {
  isEditMode: boolean,
  isModalVisible: boolean,
  handleCancel: () => void,
  onFinish: (any) => Promise<void> | void,
  onFinishFailed: (any) => void,
  intl: IntlShape;
  user: any;
  form: FormInstance
}

export const AssignmentModal = ({
  handleCancel,
  isModalVisible,
  isEditMode,
  form,
  user,
  intl,
  onFinish,
  onFinishFailed
}: AssignmentModalInput) : JSX.Element =>
  (
    <Modal
      destroyOnClose
      className="assignmentModal"
      cancelText={intl.formatMessage({ id:'cancel' })}
      okText={intl.formatMessage({ id:'add' })}
      onCancel={ handleCancel }
      title={`${  isEditMode
        ? intl.formatMessage({ id:'edit' })
        : intl.formatMessage({ id:'add' })  } ${ user.name }`}
      footer={ null }
      visible={ isModalVisible }
    >
      <Form
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 22 }}
        form={ form }
        name="basic"
        onFinish={ onFinish }
        onFinishFailed={ onFinishFailed }
      >
        <Form.Item
          label="ID"
          name="userId"
          hidden
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="ID2"
          name="projectAssignmentId"
          hidden
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label={ intl.formatMessage({ id: 'hourly_rate' }) }
          name="hourlyRate"
          rules={ [{ required: true }] }
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label={ intl.formatMessage({ id: 'date_range' }) }
          name="dateRange"
          rules={ [{ required: true }] }
        >
          <RangePicker onChange={ () => 'xd' }/>

        </Form.Item>
        <Form.Item
          wrapperCol={{ offset: 7 }}
        >
          <Button
            type="primary"
            htmlType="submit"
          >
            { isEditMode
              ? intl.formatMessage({ id:'edit' })
              : intl.formatMessage({ id:'add' }) }
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
