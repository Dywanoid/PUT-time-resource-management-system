import React, { useState } from 'react';
import { List, Modal, Form, Input, Button, Typography, Space } from 'antd';
import { BarsOutlined, InboxOutlined, EditFilled } from '@ant-design/icons';

import '../css/ClientsView.css';
import { CreateClientMutationVariables, useCreateClientMutation, useGetAllClientsQuery } from '../generated/graphql';

const { Text } = Typography;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};
const tailLayout = { wrapperCol: { offset: 4 } };

const IconText = ({ icon, text }: any) : JSX.Element => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export const ClientsView = () : JSX.Element => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { error, data, loading } = useGetAllClientsQuery({ fetchPolicy: 'no-cache' });
  const [addClient] = useCreateClientMutation();
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (variables: CreateClientMutationVariables) => {
    setIsModalVisible(false);
    await addClient({
      refetchQueries:['GetAllClients'],
      variables
    });

    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  if (loading) {return <p>Loading...</p>;}
  if (error) {return <p>Error :(</p>;}

  const newClientHandler = () => {
    showModal();
  };
  const clients = data?.clients || [];

  return (
    <>
      <List
        header={<h1>Klienci</h1>}
        bordered
        itemLayout="vertical"
        dataSource={[...clients, { name: 'Dodaj nowego ➕', special: true }]}
        renderItem={(item: any) => {

          if(item.special) {
            return (
              <List.Item
                onClick={newClientHandler}
              >
                <Text strong>{`${ item.name }`}</Text>
              </List.Item>);
          }

          return (
            <List.Item
              actions={[
                <IconText icon={EditFilled} text="Edytuj" key="list-vertical-star-o"/>,
                <IconText icon={InboxOutlined} text="Archiwizuj" key="list-vertical-like-o"/>,
                <IconText icon={BarsOutlined} text="Zarządzaj projektami" key="list-vertical-message"/>
              ]}
            >
              {
                <>
                  <div className='hover-button'>
                    <span className='hover-button--off'>{`${ item.name }`}</span>
                    <span className='hover-button--on'>{`${ item.name }✏`}</span>
                  </div>
                </>

              }
            </List.Item>
          );}}
      />
      <Modal
        title="Dodaj klienta"
        onCancel={handleCancel}
        visible={isModalVisible}
        footer={null}>
        <Form
          { ...layout }
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
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

          <Form.Item { ...tailLayout }>
            <Button type="primary" htmlType="submit">
                Dodaj
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );};
