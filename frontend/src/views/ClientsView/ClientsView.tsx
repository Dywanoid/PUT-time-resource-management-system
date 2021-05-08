import React, { useState } from 'react';
import {List, Form, Button, Typography, Space } from 'antd';
import { BarsOutlined, InboxOutlined, EditFilled } from '@ant-design/icons';
import {
  CreateClientMutationHookResult,
  CreateClientMutationVariables,
  namedOperations,
  UpdateClientMutationHookResult,
  UpdateClientMutationVariables,
  useCreateClientMutation,
  useGetAllClientsQuery,
  useUpdateClientMutation
} from '../../generated/graphql';
import { ClientModal } from './ClientModal';

import '../../css/ClientsView.css';
import { Redirect } from 'react-router-dom';

const {Text} = Typography;

const IconText = ({ icon, text }: any) : JSX.Element => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export const ClientsView = () : JSX.Element => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [clientState, setClientState] = useState(null);

  const {error, data, loading} = useGetAllClientsQuery({fetchPolicy: 'no-cache'});
  const [addClient] = useCreateClientMutation();
  const [updateClient] = useUpdateClientMutation();

  const [form] = Form.useForm();

  const showModal = (editMode = false) => {
    setIsModalVisible(true);
    setIsEditMode(editMode);
    if(!editMode) {
      form.resetFields();
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinishAdd = async (variables: CreateClientMutationVariables) => {
    setIsModalVisible(false);
    await addClient({
      refetchQueries:[namedOperations.Query.GetAllClients],
      variables
    });

    form.resetFields();
  };

  const onFinishEdit = async (variables: UpdateClientMutationVariables) => {
    setIsModalVisible(false);

    await updateClient({
      refetchQueries:[namedOperations.Query.GetAllClients],
      variables
    });

    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const clients = data?.clients || [];

  const newClientHandler = () => {
    showModal();
  };

  const editClientHandler = (client) => {
    form.setFieldsValue(client);
    showModal(true);
  };

  const onFinish = isEditMode ? onFinishEdit : onFinishAdd;

  const projectsHandler = (client) => {
    setClientState(client);
  };

  if (loading) {return <p>Loading...</p>;}
  if (error) {return <p>Error :(</p>;}

  if(clientState) {
    return (<Redirect
      push
      to={{
        pathname: '/projects',
        state: { client: clientState }
      }}
    />);
  }

  return (
    <>
      <Button onClick={ newClientHandler }><Text strong>Dodaj klienta ➕</Text></Button>

      <List
        header={<h1>Klienci</h1>}
        bordered
        itemLayout="vertical"
        dataSource={clients}
        renderItem={(client) => (
          <List.Item
            actions={[
              <Button key="1" size='small' onClick={() => editClientHandler(client)}>
                <IconText icon={ EditFilled } text="Edytuj" key="list-vertical-star-o"/>
              </Button>,
              <Button key="2" size='small'>
                <IconText icon={ InboxOutlined } text="Archiwizuj" key="list-vertical-like-o"/>
              </Button>,
              <Button key="2" size='small' onClick={() => projectsHandler(client)}>
                <IconText icon={ BarsOutlined } text="Zarządzaj projektami" key="list-vertical-message"/>
              </Button>
            ]}
          >
            {`${ client.name }`}
          </List.Item>
        )}
      />

      <ClientModal
        form={form}
        handleCancel={handleCancel}
        isEditMode={isEditMode}
        isModalVisible={isModalVisible}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      />
    </>
  );};
