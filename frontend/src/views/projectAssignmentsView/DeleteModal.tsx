import React from 'react';
import { Modal } from 'antd';
import { IntlShape } from 'react-intl';

interface DeleteModalInput {
  isModalVisible: boolean,
  handleCancel: () => void,
  handleOk: () => void,
  intl: IntlShape;
}

export const DeleteModal = ({
  handleCancel,
  isModalVisible,
  handleOk,
  intl
}: DeleteModalInput) : JSX.Element => (
  <Modal
    destroyOnClose
    className="deleteModal"
    cancelText={intl.formatMessage({ id:'cancel' })}
    okText={intl.formatMessage({ id:'delete' })}
    okButtonProps={{ danger: true }}
    onCancel={ handleCancel }
    onOk={ handleOk }
    title={intl.formatMessage({ id:'delete_modal_title' })}
    visible={ isModalVisible }
  >
    { intl.formatMessage({ id:'delete_modal_message' }) }
  </Modal>);
