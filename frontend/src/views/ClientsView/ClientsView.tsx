import React, { useState } from 'react';
import {List, Form, Button, Typography, Space } from 'antd';
import { BarsOutlined, InboxOutlined, EditFilled } from '@ant-design/icons';
import {
  CreateClientMutationVariables,
  namedOperations,
  UpdateClientMutationVariables,
  useCreateClientMutation,
  useGetAllClientsQuery,
  useArchiveClientMutation,
  useUpdateClientMutation,
  Client
} from '../../generated/graphql';
import { ClientModal } from './ClientModal';

import '../../css/ClientsView.css';
import { Redirect } from 'react-router-dom';
import { ArchiveModal } from '../../components';

const {Text} = Typography;

const IconText = ({ icon: Icon, text }: any) : JSX.Element => (
  <Space>
    <Icon/>
    {text}
  </Space>
);

export const ClientsView = () : JSX.Element => {
  const [isClientModalVisible, setIsClientModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [clientStateForRedirect, setClientStateForRedirect] = useState(null);
  const [isArchiveModalVisible, setIsArchiveModalVisible] = useState(false);
  const [clientToBeArchived, setClientToBeArchived] = useState<Client | null>(null);

  const {error, data, loading} = useGetAllClientsQuery({fetchPolicy: 'no-cache'});
  const [addClient] = useCreateClientMutation();
  const [updateClient] = useUpdateClientMutation();
  const [archiveClient] = useArchiveClientMutation();

  const [form] = Form.useForm();

  const clients = data?.clients || [];

  const showClientModal = (editMode = false) => {
    setIsEditMode(editMode);
    setIsClientModalVisible(true);
  };

  const showArchiveModal = (client) => {
    setClientToBeArchived(client);
    setIsArchiveModalVisible(true);
  };

  const hideArchiveModal = () => {
    setClientToBeArchived(null);
    setIsArchiveModalVisible(false);

  };

  const handleArchive = (client) => {
    archiveClient({
      refetchQueries:[namedOperations.Query.GetAllClients],
      variables: {clientId: client.id}
    });

    hideArchiveModal();
  };

  const handleClientModalCancel = () => {
    setIsClientModalVisible(false);
    form.resetFields();
  };

  const onFinishAdd = async (variables: CreateClientMutationVariables) => {
    setIsClientModalVisible(false);

    await addClient({
      refetchQueries:[namedOperations.Query.GetAllClients],
      variables
    });

    form.resetFields();
  };

  const onFinishEdit = async (variables: UpdateClientMutationVariables) => {
    setIsClientModalVisible(false);

    await updateClient({
      refetchQueries:[namedOperations.Query.GetAllClients],
      variables
    });

    form.resetFields();
  };

  const onFinishEditHandler = (formVariables) => {
    const variables = {...formVariables, clientId: formVariables.id};

    onFinishEdit(variables);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed: ', errorInfo);
  };

  const newClientHandler = () => {
    showClientModal();
  };

  const editClientHandler = (client) => {
    form.setFieldsValue(client);
    showClientModal(true);
  };

  const onFinish = isEditMode ? onFinishEditHandler : onFinishAdd;

  const projectsHandler = (client) => {
    setClientStateForRedirect(client);
  };

  if (loading) {return <p>Loading...</p>;}
  if (error) {return <p>Error :(</p>;}

  if(clientStateForRedirect) {
    return (
      <Redirect
        push
        to={{
          pathname: '/projects',
          state: { client: clientStateForRedirect }
        }}
      />
    );
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
              <Button
                key="1"
                size='small'
                onClick={() => editClientHandler(client)}
              >
                <IconText
                  icon={ EditFilled }
                  text="Edytuj"
                  key="list-vertical-star-o"
                />
              </Button>,
              <Button
                key="2"
                size='small'
                onClick={() => showArchiveModal(client)}
              >
                <IconText
                  icon={ InboxOutlined }
                  text="Archiwizuj"
                  key="list-vertical-like-o"
                />
              </Button>,
              <Button
                key="2"
                size='small'
                onClick={() => projectsHandler(client)}
              >
                <IconText
                  icon={ BarsOutlined }
                  text="Zarządzaj projektami"
                  key="list-vertical-message"
                />
              </Button>
            ]}
          >
            {`${ client.name }`}
          </List.Item>
        )}
      />

      <ClientModal
        form={form}
        handleCancel={handleClientModalCancel}
        isEditMode={isEditMode}
        isModalVisible={isClientModalVisible}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      />

      <ArchiveModal
        isModalVisible={isArchiveModalVisible}
        handleCancel={hideArchiveModal}
        handleOk={() => handleArchive(clientToBeArchived)}
        title={`Archiwizuj ${ clientToBeArchived?.name }`}
        modalText={`Czy na pewno chcesz archiwizować klienta ${ clientToBeArchived?.name }?`}
      />
    </>
  );};
