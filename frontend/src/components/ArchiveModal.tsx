import React from 'react';
import {Modal} from 'antd';

interface ArchiveModalInput {
  isModalVisible: boolean,
  handleCancel: () => void,
  handleOk: () => void,
  title: string,
  modalText: string
}

export const ArchiveModal = ({
  handleCancel,
  isModalVisible,
  handleOk,
  title,
  modalText
}: ArchiveModalInput) : JSX.Element => (
  <Modal
    cancelText="Anuluj"
    okText="Archiwizuj"
    okButtonProps={{danger: true}}
    onCancel={handleCancel}
    onOk={handleOk}
    title={title}
    visible={isModalVisible}
  >
    {modalText}
  </Modal>);
