import React, { useState } from 'react';
import {gql, useMutation, useQuery} from '@apollo/client';
import {List, Modal, Form, Input, Button, Typography} from 'antd';

import '../css/ClientsView.css';

const {Text} = Typography;

const ALL_CLIENTS = gql`
    query GetAllClients {
        listClients {
            id,
            name
        }
    }
`;

const CREATE_CLIENT_MUT = gql`
    mutation CreateClient($name: String!) {
        createClient(clientInput: {
                name: $name
            }) {
                id, 
                name
        }
    }
`;
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};
const tailLayout = {wrapperCol: { offset: 4 }};

export const ClientsView = () : JSX.Element => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {error, data, loading} =  useQuery(ALL_CLIENTS, {fetchPolicy: 'no-cache'});
  const [addClient, {data: mutationData}] = useMutation(CREATE_CLIENT_MUT);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
    setIsModalVisible(false);
    addClient({refetchQueries:['GetAllClients'],variables:{name: values.name}});
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  if (loading) {return <p>Loading...</p>;}
  if (error) {return <p>Error :(</p>;}

  const newClientHandler = () => {
    showModal();
  };

  return (
    <>
      <List
        header={<h1>Klienci</h1>}
        bordered
        itemLayout="vertical"
        dataSource={[...data.listClients, {name: 'Dodaj nowego ➕', special: true}]}
        renderItem={(item: any) => {

          if(item.special) {
            return (
              <List.Item onClick={newClientHandler}>
                <Text strong>{`${ item.name }`}</Text>
              </List.Item>);
          }

          return (
            <List.Item>
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
          {...layout}
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
            label="Adres"
            name="address"
            rules={[{ message: 'Wpisz adres!' }]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="NIP"
            name="vatId"
            rules={[{ message: 'Wpisz NIP!' }]}
          >
            <Input/>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
                Dodaj
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );};
