import React, { useState } from 'react';
import { List, Modal, Form, Input, Button, Space, Transfer, notification } from 'antd';
import { useApolloClient } from '@apollo/client';
import {
  useGetAllTeamsQuery,
  useGetAllUsersQuery,
  useCreateTeamMutation,
  useCreateTeamMembersMutation,
  useDeleteTeamMembersMutation,
  useUpdateTeamMutation,
  useArchiveTeamMutation,
  namedOperations,
  GetAllUsersInTeamDocument
} from '../generated/graphql';
import PropTypes from 'prop-types';
import { FormOutlined, EditFilled, InboxOutlined  } from '@ant-design/icons';
import '../css/TeamsView.css';

const { Search } = Input;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};

const IconText = ({ icon, text } ) : JSX.Element => (
  <Space>
    { React.createElement(icon) }
    { text }
  </Space>
);

IconText.propTypes = {
  icon: PropTypes.object,
  text: PropTypes.string
};

const openNotificationWithIcon = (type, action) => {
  notification[type]({
    description: type === 'success'
      ? `Pomyślnie wykonano akcję ${ action }.`
      : `Akcja ${ action } nie została wykonana.`,
    message: 'Powiadomienie'
  });
};

const elementCompare = (a, b) =>
  a.length === b.length
  && a.every((v, i) => v === b[i]);

export const TeamsView = () : JSX.Element => {
  const { data } = useGetAllTeamsQuery();
  const { data: userData } = useGetAllUsersQuery();
  const [createTeam] = useCreateTeamMutation({
    onCompleted(){ openNotificationWithIcon('success', 'tworzenia zespołu'); },
    onError() { openNotificationWithIcon('error', 'tworzenia zespołu'); }
  });
  const [updateTeam] = useUpdateTeamMutation({
    onCompleted(){ openNotificationWithIcon('success', 'edycji zespołu'); },
    onError() { openNotificationWithIcon('error', 'edycji zespołu'); }
  });
  const [archiveTeam] = useArchiveTeamMutation({
    onCompleted(){ openNotificationWithIcon('success', 'archiwizacji zespołu'); },
    onError() { openNotificationWithIcon('error', 'archiwizacji zespołu'); }
  });
  const [createTeamMembers] = useCreateTeamMembersMutation({
    onCompleted(){
      openNotificationWithIcon('success', 'przydzielania użytkowników do zespołu');
    },
    onError() { openNotificationWithIcon('error', 'przydzielania użytkowników do zespołu'); }
  });
  const [deleteTeamMembers] = useDeleteTeamMembersMutation({
    onCompleted(){ openNotificationWithIcon('success', 'usuwania użytkowników z zespołu'); },
    onError() { openNotificationWithIcon('error', 'usuwania użytkowników z zespołu'); }
  });
  const [name, setName] = useState('');
  const [initialName, setInitialName] = useState('');
  const [initialDescription, setInitialDescription] = useState('');
  const [description, setDescription] = useState('');
  const [teamIdentify, setTeamId] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [showArchived, setShowArchived] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTeamManagementModalVisible, setIsTeamManagementVisible] = useState(false);
  const [isArchiveModalVisible, setIsArchiveModalVisible] = useState(false);
  const [isCreateTeamModal, setCreateTeamModal] = useState(false);
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [targetKeysInitial, setTargetKeysInitial] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [form] = Form.useForm();
  const client = useApolloClient();

  const addTeam = () => {
    createTeam({
      refetchQueries:[namedOperations.Query.GetAllTeams],
      variables: {
        description: description,
        name: name
      }
    });
    setCreateTeamModal(false);
    setIsModalVisible(false);
  };

  const editTeam = () => {
    updateTeam({
      refetchQueries:[namedOperations.Query.GetAllTeams],
      variables: {
        description: description,
        name: name,
        teamId: teamIdentify
      }
    });
    setIsModalVisible(false);
  };

  const hideTeam = (archiveId) => {
    archiveTeam({
      refetchQueries:[namedOperations.Query.GetAllTeams],
      variables: { teamId: archiveId }
    });
  };

  const addTeamMembers = (teamId, teamList) => {
    createTeamMembers({
      refetchQueries: [{ query: GetAllUsersInTeamDocument, variables: { teamId: teamIdentify } }],
      variables: { teamId: teamId, userIdList: teamList }
    });
  };

  const removeTeamMembers = (teamId, teamList) => {
    deleteTeamMembers({
      refetchQueries: [{ query: GetAllUsersInTeamDocument, variables: { teamId: teamIdentify } }],
      variables: { teamId: teamId, userIdList: teamList }
    });
  };

  const showTeamManagementModal = async (teamId) => {
    setTeamId(teamId);
    const { data:usersInTeamData } = await client.query({
      query: GetAllUsersInTeamDocument,
      variables: { teamId }
    });

    const usersInTeam = await usersInTeamData?.teamMembers || [];
    const rightColumn: string[] = [];

    for (let i = 0; i < usersInTeam.length; i++) {
      rightColumn.push(usersInTeam[i].userId);
    }
    setTargetKeysInitial(rightColumn);
    setTargetKeys(rightColumn);
    setIsTeamManagementVisible(true);
  };

  const showArchiveModal = async (teamId) => {
    setTeamId(teamId);
    setIsArchiveModalVisible(true);
  };

  const handleArchiveModalConfirm = () => {
    hideTeam(teamIdentify);
    setIsArchiveModalVisible(false);
  };

  const handleArchiveModalCancel = () => {
    setIsArchiveModalVisible(false);
  };

  const handleCancel = () => {
    setCreateTeamModal(false);
    setIsModalVisible(false);
  };

  const handleTeamManagementModalCancel = () => {
    setTargetKeys([]);
    setTeamId('');
    setIsTeamManagementVisible(false);
  };

  const handleTeamManagementModalConfirm = () => {
    const arrayOfUsersToRemove: Array<string> = [];

    if (!(elementCompare(targetKeys, targetKeysInitial))) {
      for (const i in targetKeysInitial) {
        const index = targetKeys.indexOf(targetKeysInitial[i]);

        if (index === -1) {
          arrayOfUsersToRemove.push(targetKeysInitial[i]);
        } else {
          targetKeys.splice(index, 1);
        }
      }
      if (targetKeys.length !== 0) {
        addTeamMembers(teamIdentify, targetKeys);
      }
      if (arrayOfUsersToRemove.length !== 0) {
        removeTeamMembers(teamIdentify, arrayOfUsersToRemove);
      }
    }

    setTargetKeys([]);
    setTeamId('');
    setIsTeamManagementVisible(false);
  };

  const newTeamHandler = () => {
    form.resetFields();
    setName('');
    setDescription('');
    setTeamId('');
    setCreateTeamModal(true);
    setIsModalVisible(true);
  };

  const editTeamButton = (teamId, teamName, teamDescription) => {
    form.setFieldsValue({ description: teamDescription, name: teamName });
    setInitialName(teamName);
    setName(teamName);
    setInitialDescription(teamDescription);
    setDescription(teamDescription);
    setTeamId(teamId);
    setIsModalVisible(true);
  };

  const teams = data?.teams || [];
  const users = userData?.users || [];

  const mockData: Array<{ key: string, username: string }> = [];

  for (let i = 0; i < users.length; i++) {
    mockData.push({
      key: users[i].id,
      username: users[i].name
    });
  }

  const onElementChange = (nextTargetKeys) => {
    // console.log('targetKeys:', nextTargetKeys);
    // console.log('direction:', direction);
    // console.log('moveKeys:', moveKeys);

    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    // console.log(sourceSelectedKeys, targetSelectedKeys);
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  return (
    <>
      <Button onClick={ newTeamHandler } className="addTeam">Dodaj zespół ➕</Button>
      <Search
        className="searchInput"
        placeholder="Szukaj zespołu"
        onSearch={(value) => setSearchValue(value.toLowerCase())}
        enterButton
      />
      <List
        header={ <div>
          <h1>Zespoły</h1>
          <a onClick={ () => setShowArchived(!showArchived) } className="showArchivedLink">
            { showArchived ? 'Ukryj zarchiwizowane zespoły' : 'Pokaż zarchiwizowane zespoły' }
          </a>
        </div> }
        bordered
        className="teamsList"
        itemLayout="vertical"
        dataSource={ [...teams] }
        renderItem={ (item: any) => {
          if ((!item.archived || showArchived) && item.name.toLowerCase().startsWith(searchValue)) {
            return (
              <List.Item
                className={ item.archived ? 'archivedItem' : 'notArchived' }
                actions={
                  (!item.archived)
                    ? ([
                      <Button key="1" size='small' onClick={
                        () => editTeamButton(item.id, item.name, item.description) }
                      >
                        <IconText icon={ EditFilled } text="Edytuj" key="list-vertical-star-o"/>
                      </Button>,
                      <Button key="2" size='small' onClick={ () => showArchiveModal(item.id) }>
                        <IconText icon={ InboxOutlined } text="Zarchiwizuj" key="list-vertical-like-o"/>
                      </Button>,
                      <Button size='small' key="3" onClick={ () => showTeamManagementModal(item.id) }>
                        <IconText icon={ FormOutlined } text="Zarządzaj zespołem" key="list-vertical-like-o"/>
                      </Button>
                    ])
                    : undefined
                }
              >
                <List.Item.Meta
                  title={ <div>{ item.name }</div> }
                  description={ <div>{ item.description }</div> }
                />
              </List.Item>
            );
          }

          return (null);
        }}
      />
      <Modal
        destroyOnClose={ true }
        title={ isCreateTeamModal ? 'Dodaj Zespół' : 'Edytuj Zespół' }
        onCancel={ handleCancel }
        visible={ isModalVisible }
        okText={ isCreateTeamModal ? 'Dodaj' : 'Edytuj' }
        onOk={ isCreateTeamModal ? addTeam : editTeam }
        cancelText="Wróć"
        okButtonProps={{
          disabled: isCreateTeamModal
            ? !(name.length > 0
              && initialName !== name)
            : !(initialName !== name
              || initialDescription !== description)
        }}
      >
        <Form
          { ...layout }
          form={ form }
          name="basic"
        >
          <Form.Item
            label="Nazwa"
            name="name"
            initialValue={ name }
            rules={ [{ message: 'Wpisz nazwę zespołu!', required: true }] }
          >
            <Input onChange={ (e) => { setName(e.target.value); } }/>
          </Form.Item>
          <Form.Item
            label="Opis"
            name="description"
            initialValue={ description }
          >
            <Input onChange={ (e) => { setDescription(e.target.value); } }/>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Zarządzanie zespołem"
        className="teamManagementModal"
        onCancel={ handleTeamManagementModalCancel }
        onOk={ handleTeamManagementModalConfirm }
        okText="Zatwierdź"
        cancelText="Wróć"
        visible={ isTeamManagementModalVisible }
        destroyOnClose
      >
        <Transfer
          dataSource={ mockData }
          listStyle={{
            height: 400,
            width: 600
          }}
          titles={['Do przydzielenia', 'Przydzieleni']}
          targetKeys={ targetKeys }
          selectedKeys={ selectedKeys }
          onChange={ onElementChange }
          onSelectChange={ onSelectChange }
          locale={{
            itemsUnit: 'użytkownicy',
            itemUnit: 'użytkownik',
            notFoundContent: 'lista jest pusta',
            searchPlaceholder: 'Szukaj tutaj'
          }}
          render={ (item) => (<List.Item.Meta
            key={ item.key }
            title={ <div>{ item.username }</div> }
          />)
          }
        />
      </Modal>
      <Modal
        title="Archiwizacja"
        onCancel={ handleArchiveModalCancel }
        onOk={ handleArchiveModalConfirm }
        okText="Archiwizuj"
        cancelText="Wróć"
        visible={ isArchiveModalVisible }
      >
         Czy na pewno chcesz zarchiwizować zespół ?
      </Modal>
    </>
  );};
