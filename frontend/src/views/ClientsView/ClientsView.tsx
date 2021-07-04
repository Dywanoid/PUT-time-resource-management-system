import { useState } from 'react';
import { injectIntl } from 'react-intl';
import { List, Form, Button, Typography, Space, Breadcrumb } from 'antd';
import { BarsOutlined, InboxOutlined, EditFilled } from '@ant-design/icons';
import {
  CreateClientMutationVariables,
  namedOperations,
  UpdateClientMutationVariables,
  useCreateClientMutation,
  useGetAllClientsQuery,
  useArchiveClientMutation,
  useUpdateClientMutation,
  Client,
  Currency
} from '../../generated/graphql';
import { ClientModal } from './ClientModal';

import '../../css/ClientsView.css';
import { Redirect } from 'react-router-dom';
import { ArchiveModal } from '../../components';

const { Text } = Typography;

const IconText = ({ icon: Icon, text }: any) : JSX.Element => (
  <Space>
    <Icon/>
    { text }
  </Space>
);

const currencies = Object.values(Currency);

const ClientsView = injectIntl(({ intl }) : JSX.Element => {
  const [isClientModalVisible, setIsClientModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [clientStateForRedirect, setClientStateForRedirect] = useState(null);
  const [isArchiveModalVisible, setIsArchiveModalVisible] = useState(false);
  const [clientToBeArchived, setClientToBeArchived] = useState<Client | null>(null);

  const { error, data, loading } = useGetAllClientsQuery({ fetchPolicy: 'no-cache' });
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
      variables: { clientId: client.id }
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
    const variables = { ...formVariables, clientId: formVariables.id };

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

  if (loading) { return <p>Loading...</p>; }
  if (error) { return <p>Error :(</p>; }

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
      <Space direction="vertical" size="middle">
        <Breadcrumb>
          <Breadcrumb.Item>{ intl.formatMessage({ id: 'all_clients' }) }</Breadcrumb.Item>
        </Breadcrumb>
        <Button onClick={ newClientHandler }>
          <Text strong>
            { intl.formatMessage({ id: 'add_client' }) }
            ➕
          </Text>
        </Button>
        <List
          header={ <h1>{ intl.formatMessage({ id: 'clients' }) }</h1> }
          bordered
          itemLayout="vertical"
          dataSource={ clients }
          renderItem={ (client) => (
            <List.Item
              actions={[
                <Button
                  key="1"
                  size='small'
                  onClick={ () => editClientHandler(client) }
                >
                  <IconText
                    icon={ EditFilled }
                    text={ intl.formatMessage({ id: 'edit' }) }
                    key="list-vertical-star-o"
                  />
                </Button>,
                <Button
                  key="2"
                  size='small'
                  onClick={ () => showArchiveModal(client) }
                >
                  <IconText
                    icon={ InboxOutlined }
                    text={ intl.formatMessage({ id: 'archive' }) }
                    key="list-vertical-like-o"
                  />
                </Button>,
                <Button
                  key="2"
                  size='small'
                  onClick={ () => projectsHandler(client) }
                >
                  <IconText
                    icon={ BarsOutlined }
                    text={ intl.formatMessage({ id: 'manage_projects' }) }
                    key="list-vertical-message"
                  />
                </Button>
              ]}
            >
              <List.Item.Meta
                title={ <div>{ client.name }</div> }
                description={ <div>
                  <ul className="adressList">
                    <li>
                      { client.streetWithNumber || '' }
                    </li>
                    <li>
                      { `${ client.city || '' } ${ client.zipCode || '' }` }
                    </li>
                    <li>
                      {client.taxId ? `NIP: ${ client.taxId }` : ''}
                    </li>
                    <li>
                      {`Waluta: ${ client.currency }`}
                    </li>
                  </ul>
                </div> }
              />
            </List.Item>
          )}
        />

        <ClientModal
          form={ form }
          initialValues={{ currency: currencies[2] }}
          handleCancel={ handleClientModalCancel }
          isEditMode={ isEditMode }
          isModalVisible={ isClientModalVisible }
          onFinish={ onFinish }
          onFinishFailed={ onFinishFailed }
        />

        <ArchiveModal
          isModalVisible={ isArchiveModalVisible }
          handleCancel={ hideArchiveModal }
          handleOk={ () => handleArchive(clientToBeArchived) }
          title={ `${ intl.formatMessage({ id: 'archive' }) } ${ clientToBeArchived?.name }` }
          modalText={ `${ intl.formatMessage({ id: 'archive_decison' }) } ${ clientToBeArchived?.name }?` }
        />
      </Space>
    </>
  );
});

export {
  ClientsView,
  currencies
};