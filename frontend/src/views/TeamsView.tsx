import React, { useState, useContext } from 'react';
import { injectIntl } from 'react-intl';
import { List, Modal, Form, Input, Button, Space, Transfer, notification, Avatar } from 'antd';
import {
  useGetAllTeamsQuery,
  useGetAllUsersQuery,
  useCreateTeamMutation,
  useCreateTeamMembersMutation,
  useDeleteTeamMembersMutation,
  useUnarchiveTeamMutation,
  useUpdateTeamMutation,
  useArchiveTeamMutation,
  namedOperations
} from '../generated/graphql';
import PropTypes from 'prop-types';
import { FormOutlined, EditFilled, InboxOutlined  } from '@ant-design/icons';
import { UserContext } from '../utils/auth';
import { colorHash } from '../utils/colorHash';
import { rolesCheck } from '../utils/rolesCheck';
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

const openNotificationWithIcon = (type, action, intl) => {
  notification[type]({
    description: type === 'success'
      ? `${ intl.formatMessage({ id: 'action_success' }) } ${ action }.`
      : `${ intl.formatMessage({ id: 'action' }) } ${ action } ${ intl.formatMessage({ id: 'not_completed' }) }.`,
    message: intl.formatMessage({ id: 'notification' })
  });
};

const elementCompare = (a, b) =>
  a.length === b.length
  && a.every((v, i) => v === b[i]);

export const TeamsView = injectIntl(({ intl }): JSX.Element => {
  const userInfo = useContext(UserContext);
  const userRole = userInfo?.roles || ['user'];
  const { data } = useGetAllTeamsQuery();
  const { data: usersData } = useGetAllUsersQuery();
  const [createTeam] = useCreateTeamMutation({
    onCompleted(){ openNotificationWithIcon('success', intl.formatMessage({ id: 'creating_team' }), intl); },
    onError() { openNotificationWithIcon('error',  intl.formatMessage({ id: 'creating_team' }), intl); }
  });
  const [updateTeam] = useUpdateTeamMutation({
    onCompleted(){ openNotificationWithIcon('success', intl.formatMessage({ id: 'editing_team' }), intl); },
    onError() { openNotificationWithIcon('error', intl.formatMessage({ id: 'editing_team' }), intl); }
  });
  const [archiveTeam] = useArchiveTeamMutation({
    onCompleted(){ openNotificationWithIcon('success', intl.formatMessage({ id: 'archiving_team' }), intl); },
    onError() { openNotificationWithIcon('error', intl.formatMessage({ id: 'archiving_team' }), intl); }
  });
  const [unarchiveTeam] = useUnarchiveTeamMutation({
    onCompleted(){ openNotificationWithIcon('success', intl.formatMessage({ id: 'unarchiving_team' }), intl); },
    onError() { openNotificationWithIcon('error', intl.formatMessage({ id: 'unarchiving_team' }), intl); }
  });
  const [createTeamMembers] = useCreateTeamMembersMutation({
    onCompleted(){
      openNotificationWithIcon('success', intl.formatMessage({ id: 'assigning_users_to_a_team' }), intl);
    },
    onError() { openNotificationWithIcon('error', intl.formatMessage({ id: 'assigning_users_to_a_team' }), intl); }
  });
  const [deleteTeamMembers] = useDeleteTeamMembersMutation({
    onCompleted(){ openNotificationWithIcon(
      'success',
      intl.formatMessage({ id: 'deleting_users_from_a_team' }),
      intl
    ); },
    onError() { openNotificationWithIcon('error', intl.formatMessage({ id: 'deleting_users_from_a_team' }), intl); }
  });
  const [name, setName] = useState('');
  const [initialName, setInitialName] = useState('');
  const [initialDescription, setInitialDescription] = useState('');
  const [description, setDescription] = useState('');
  const [teamIdentify, setTeamId] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [showArchived, setShowArchived] = useState(false);
  const [isArchivedModal, setIsArchivedModal] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTeamManagementModalVisible, setIsTeamManagementVisible] = useState(false);
  const [isTeamViewModalVisible, setIsTeamViewVisible] = useState(false);
  const [isArchiveModalVisible, setIsArchiveModalVisible] = useState(false);
  const [isCreateTeamModal, setCreateTeamModal] = useState(false);
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [targetKeysInitial, setTargetKeysInitial] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [usersInTeamArr, setUseresInTeamArr] = useState([{ key: '0',name: 'lol' }]);
  const [form] = Form.useForm();

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

  const unhideTeam = (archiveId) => {
    unarchiveTeam({
      refetchQueries:[namedOperations.Query.GetAllTeams],
      variables: { teamId: archiveId }
    });
  };

  const addTeamMembers = (teamId, teamList) => {
    createTeamMembers({
      refetchQueries: [namedOperations.Query.GetAllTeams],
      variables: { teamId: teamId, userIdList: teamList }
    });
  };

  const removeTeamMembers = (teamId, teamList) => {
    deleteTeamMembers({
      refetchQueries: [namedOperations.Query.GetAllTeams],
      variables: { teamId: teamId, userIdList: teamList }
    });
  };

  const showTeamManagementModal = async (teamId) => {
    setTeamId(teamId);

    const usersInTeam = data?.teams || [] as any;

    const rightColumn: string[] = [];

    for (let i = 0; i < usersInTeam.length; i++) {
      if (usersInTeam[i].id !== undefined && usersInTeam[i].id === teamId) {
        for (let j = 0; j < usersInTeam[i].members.length; j++) {
          rightColumn.push(usersInTeam[i].members[j].id);
        }
      }
    }
    setTargetKeysInitial(rightColumn);
    setTargetKeys(rightColumn);
    setIsTeamManagementVisible(true);
  };

  const showTeamViewModal = async (teamId) => {
    setTeamId(teamId);

    const usersInTeam = await data?.teams || [] as any;
    const usersList: Array<{ key: string, name: string }> = [];

    for (let i = 0; i < usersInTeam.length; i++) {
      if (usersInTeam[i].id === teamId) {
        for (let j = 0; j < usersInTeam[i].members.length; j++) {
          usersList.push({ key: usersInTeam[i].members[j].id, name: usersInTeam[i].members[j].name });
        }
      }
    }
    setUseresInTeamArr(usersList);
    setIsTeamViewVisible(true);
  };

  const showArchiveModal = async (teamId, type) => {
    setIsArchivedModal(type);
    setTeamId(teamId);
    setIsArchiveModalVisible(true);
  };

  const handleArchiveModalConfirm = () => {
    hideTeam(teamIdentify);
    setIsArchiveModalVisible(false);
  };

  const handleUnarchiveModalConfirm = () => {
    unhideTeam(teamIdentify);
    setIsArchiveModalVisible(false);
  };

  const handleArchiveModalCancel = () => {
    setIsArchiveModalVisible(false);
  };

  const handleTeamViewModalCancel = () => {
    setIsTeamViewVisible(false);
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

  let teams = data?.teams || [];
  const userTeams = userInfo?.teams as any || [];
  const users = usersData?.users || [];

  if (!rolesCheck(userRole, ['manager', 'team_editor'])) {
    const teamsArr: Array<{ id: string, name: string, description: any, archived: boolean }> = [];

    for (let i = 0; i < userTeams.length; i++) {
      teamsArr.push({
        archived: userTeams[i].archived,
        description: userTeams[i].description,
        id: userTeams[i].id,
        name: userTeams[i].name
      });
    }
    teams = teamsArr;
  }

  const mockData: Array<{ key: string, username: string }> = [];

  for (let i = 0; i < users.length; i++) {
    mockData.push({
      key: users[i].id,
      username: users[i].name
    });
  }

  const onElementChange = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  return (
    <>
      {rolesCheck(userRole, ['manager', 'team_editor'])
      && <Button onClick={ newTeamHandler } className="addTeam">
        {intl.formatMessage({ id: 'add_team' })}
        ➕
      </Button>
      }
      <Search
        className="searchInput"
        placeholder={ intl.formatMessage({ id: 'search_team' }) }
        onSearch={(value) => setSearchValue(value.toLowerCase())}
        enterButton
      />
      <List
        header={ <div>
          <h1>{ intl.formatMessage({ id: 'teams' }) }</h1>
          <a onClick={ () => setShowArchived(!showArchived) } className="showArchivedLink">
            { showArchived
              ? intl.formatMessage({ id: 'hide_archived_teams' })
              : intl.formatMessage({ id: 'show_archived_teams' }) }
          </a>
        </div> }
        bordered
        className="teamsList"
        itemLayout="vertical"
        dataSource={ [...teams.filter((el) => (showArchived ? el : !el.archived) )] }
        pagination={{ pageSize: 10 }}
        renderItem={ (item: any) => {
          if ((!item.archived || showArchived) && item.name.toLowerCase().startsWith(searchValue)) {
            return (
              <List.Item
                className={ item.archived ? 'archivedItem' : 'notArchived' }
                actions={
                  (!item.archived && rolesCheck(userRole, ['manager', 'team_editor']))
                    ? ([
                      <Button key="1" size='small' onClick={
                        () => editTeamButton(item.id, item.name, item.description) }
                      >
                        <IconText icon={ EditFilled } text={ intl.formatMessage({ id: 'edit' }) }
                          key="list-vertical-star-o"/>
                      </Button>,
                      <Button key="2" size='small' onClick={ () => showArchiveModal(item.id, true) }>
                        <IconText icon={ InboxOutlined }
                          text={ intl.formatMessage({ id: 'archive' }) } key="list-vertical-like-o"/>
                      </Button>,
                      <Button size='small' key="4" onClick={ () => showTeamManagementModal(item.id) }>
                        <IconText icon={ FormOutlined }
                          text={ intl.formatMessage({ id: 'manage_team' }) } key="list-vertical-like-o"/>
                      </Button>,
                      <Button size='small' key="5" onClick={ () => showTeamViewModal(item.id) }>
                        <IconText icon={ FormOutlined } text={ intl.formatMessage({ id: 'show_team' }) }
                          key="list-vertical-like-o"/>
                      </Button>
                    ])
                    : (item.archived && rolesCheck(userRole, ['manager', 'team_editor']))
                      ? ([<Button key="3" size='small' onClick={ () => showArchiveModal(item.id, false) }>
                        <IconText icon={ InboxOutlined }
                          text={ intl.formatMessage({ id: 'unarchive' }) } key="list-vertical-like-o"/>
                      </Button>,
                      <Button size='small' key="4" onClick={ () => showTeamViewModal(item.id) }>
                        <IconText icon={ FormOutlined } text={ intl.formatMessage({ id: 'show_team' }) }
                          key="list-vertical-like-o"/>
                      </Button>])
                      : ([<Button size='small' key="4" onClick={ () => showTeamViewModal(item.id) }>
                        <IconText icon={ FormOutlined } text={ intl.formatMessage({ id: 'show_team' }) }
                          key="list-vertical-like-o"/>
                      </Button>])
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
        title={ isCreateTeamModal
          ? `${ intl.formatMessage({ id: 'add_team' }) }`
          : `${ intl.formatMessage({ id: 'edit_team' }) }` }
        onCancel={ handleCancel }
        visible={ isModalVisible }
        okText={ isCreateTeamModal
          ? `${ intl.formatMessage({ id: 'add' }) }`
          : `${ intl.formatMessage({ id: 'edit' }) }` }
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
            label={ intl.formatMessage({ id: 'name' }) }
            name="name"
            initialValue={ name }
            rules={ [{ message: intl.formatMessage({ id: 'enter_team_name' }), required: true }] }
          >
            <Input onChange={ (e) => { setName(e.target.value); } }/>
          </Form.Item>
          <Form.Item
            label={ intl.formatMessage({ id: 'description' }) }
            name="description"
            initialValue={ description }
          >
            <Input onChange={ (e) => { setDescription(e.target.value); } }/>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title={ intl.formatMessage({ id: 'team_management' }) }
        className="teamManagementModal"
        onCancel={ handleTeamManagementModalCancel }
        onOk={ handleTeamManagementModalConfirm }
        okText={ intl.formatMessage({ id: 'confirm' }) }
        cancelText={ intl.formatMessage({ id: 'return' }) }
        visible={ isTeamManagementModalVisible }
        destroyOnClose
      >
        <Transfer
          dataSource={ mockData }
          listStyle={{
            height: 400,
            width: 600
          }}
          titles={[intl.formatMessage({ id: 'to_assign' }), intl.formatMessage({ id: 'assigned' })]}
          targetKeys={ targetKeys }
          selectedKeys={ selectedKeys }
          onChange={ onElementChange }
          onSelectChange={ onSelectChange }
          render={ (item) => (<List.Item.Meta
            key={ item.key }
            title={ <div>{ item.username }</div> }
          />)
          }
        />
      </Modal>
      <Modal
        title={ isArchivedModal
          ? intl.formatMessage({ id: 'archive' })
          : intl.formatMessage({ id: 'unarchive' })}
        onCancel={ handleArchiveModalCancel }
        onOk={ isArchivedModal
          ? handleArchiveModalConfirm
          : handleUnarchiveModalConfirm }
        okText={ isArchivedModal
          ? intl.formatMessage({ id: 'archive' })
          : intl.formatMessage({ id: 'unarchive' }) }
        cancelText={ intl.formatMessage({ id: 'return' }) }
        visible={ isArchiveModalVisible }
      >
        { isArchivedModal
          ? intl.formatMessage({ id: 'archive_team' })
          : intl.formatMessage({ id: 'unarchive_team' }) }
      </Modal>
      <Modal
        title={ intl.formatMessage({ id: 'team' }) }
        onCancel={ handleTeamViewModalCancel }
        cancelText={ intl.formatMessage({ id: 'return' }) }
        visible={ isTeamViewModalVisible }
        okButtonProps={{ style: { display: 'none' } }}
      >
        <List
          itemLayout="horizontal"
          dataSource={ usersInTeamArr }
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar style={{ backgroundColor: colorHash(item.name), marginTop: '-3px', verticalAlign: 'middle' }}
                    size={ 21 } gap={ 4 } shape="square">
                    { item.name.match(/\b(\w)/g) }
                  </Avatar> }
                title={ item.name }
              />
            </List.Item>
          )}
        />
      </Modal>
    </>
  );
});
