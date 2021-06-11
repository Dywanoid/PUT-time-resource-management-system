import React, { useState } from 'react';
import { Layout, Menu, Avatar, Modal, Transfer, notification, List } from 'antd';
import { Link } from 'react-router-dom';
import { useGetAllUsersQuery, useGetUserInfoQuery } from '../generated/graphql';
import pracujta from '../resources/pracujta.png';
import '../css/Navigation.css';

const { Header } = Layout;
const { SubMenu } = Menu;

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

export const Navigation = (): JSX.Element => {
  // const [createTeamMembers] = useCreateTeamMembersMutation({
  //   onCompleted(){
  //     openNotificationWithIcon('success', 'przydzielania użytkowników do zespołu');
  //   },
  //   onError() { openNotificationWithIcon('error', 'przydzielania użytkowników do zespołu'); }
  // });
  // const [deleteTeamMembers] = useDeleteTeamMembersMutation({
  //   onCompleted(){ openNotificationWithIcon('success', 'usuwania użytkowników z zespołu'); },
  //   onError() { openNotificationWithIcon('error', 'usuwania użytkowników z zespołu'); }
  // });
  const { data: userInfo } = useGetUserInfoQuery();
  const { data: userData } = useGetAllUsersQuery();
  const [isSubordinateModalVisible, setIsSubordinateVisible] = useState(false);
  const [teamIdentify, setTeamId] = useState('');
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [targetKeysInitial, setTargetKeysInitial] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const user = userInfo?.user.name || '';

  const users = userData?.users || [] as any;
  const mockData: Array<{ key: string, username: string }> = [];

  for (let i = 0; i < users.length; i++) {
    if (!users[i].roles.includes('manager')) {
      mockData.push({
        key: users[i].id,
        username: users[i].name
      });
    }
  }

  const addTeamMembers = (teamId, teamList) => {
    // createTeamMembers({
    // refetchQueries: [{ query: GetAllUsersInTeamDocument, variables: { teamId: teamIdentify } }],
    //   variables: { teamId: teamId, userIdList: teamList }
    // });
  };

  const removeTeamMembers = (teamId, teamList) => {
    // deleteTeamMembers({
    // refetchQueries: [{ query: GetAllUsersInTeamDocument, variables: { teamId: teamIdentify } }],
    // variables: { teamId: teamId, userIdList: teamList }
    // });
  };

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

  const handleSubordinateModalCancel = () => {
    setTargetKeys([]);
    setTeamId('');
    setIsSubordinateVisible(false);
  };

  const handleSubordinateModalConfirm = () => {
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
    setIsSubordinateVisible(false);
  };

  const showSubordinateModal = async (teamId) => {
    setTeamId(teamId);
    // const { data:usersInTeamData } = await client.query({
    //   query: GetAllUsersInTeamDocument,
    //   variables: { teamId }
    // });

    // const usersInTeam = await usersInTeamData?.teamMembers || [];
    const rightColumn: string[] = [];

    // for (let i = 0; i < usersInTeam.length; i++) {
    //   rightColumn.push(usersInTeam[i].userId);
    // }
    setTargetKeysInitial(rightColumn);
    setTargetKeys(rightColumn);
    setIsSubordinateVisible(true);
  };

  return(
    <Header className="header">
      <img className="logo" src={ pracujta } alt="pracujta"/>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={ ['1'] } className="buttons">
        <Menu.Item key="1">
          <Link to="/" className="nav-text">Logowanie czasu</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/clients" className="nav-text">Klienci</Link>
        </Menu.Item>
        <SubMenu key="SubMenu1" title="Kalendarz i wnioski">
          <Menu.Item key="3">
            <Link to="/calendar" className="nav-text">Kalendarz</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/applications" className="nav-text">Wnioski</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="SubMenu2" title="Użytkownicy">
          <Menu.Item key="5">
            <Link to="/teams" className="nav-text">Zespoły</Link>
          </Menu.Item>
          <Menu.Item key="6" onClick={ () => showSubordinateModal('item.id') }>Pracownicy</Menu.Item>
        </SubMenu>
      </Menu>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={ ['1'] } className="logoutMenu">
        <SubMenu
          key="SubMenu3" title={ <Avatar>{ user.match(/\b(\w)/g) }</Avatar> }>
          <Menu.Item key="7" onClick={ () => window.location.href='http://localhost/logout'}>Wyloguj</Menu.Item>
        </SubMenu>
      </Menu>
      <Modal
        title="Przydziel pracowników"
        className="teamManagementModal"
        onCancel={ handleSubordinateModalCancel }
        onOk={ handleSubordinateModalConfirm }
        okText="Zatwierdź"
        cancelText="Wróć"
        visible={ isSubordinateModalVisible }
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
          render={ (item) => (<List.Item.Meta
            key={ item.key }
            title={ <div>{ item.username }</div> }
          />)
          }
        />
      </Modal>
    </Header>
  );
};
