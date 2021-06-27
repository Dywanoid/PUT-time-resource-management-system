import { useState, useContext, useEffect } from 'react';
import { Transfer, notification, List, Button } from 'antd';
import {
  useGetAllUsersQuery,
  useUpdateSupervisorBatchMutation,
  useUnassignSupervisorBatchMutation
} from '../generated/graphql';
import { UserContext } from '../utils/auth';
import '../css/SubordinatesView.css';

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

export const SubordinatesView = () : JSX.Element => {
  const userInfo = useContext(UserContext);
  const { data: userData , loading, error } = useGetAllUsersQuery();
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [targetKeysInitial, setTargetKeysInitial] = useState<string[]>([]);
  const [mockData, setMockData] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const user = userInfo || [] as any;
  const users = userData?.users || [] as any;
  const [createSubordinates] = useUpdateSupervisorBatchMutation({
    onCompleted(){
      openNotificationWithIcon('success', 'przydzielania podwładnych');
    },
    onError() { openNotificationWithIcon('error', 'przydzielania podwładnych'); }
  });
  const [deleteSubordinates] = useUnassignSupervisorBatchMutation({
    onCompleted(){ openNotificationWithIcon('success', 'usuwania podwładnych'); },
    onError() { openNotificationWithIcon('error', 'usuwania podwładnych'); }
  });

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

  const addSupervisorMembers = (supervisorId, userList) => {
    createSubordinates({ variables: { supervisorId: supervisorId, userList: userList } });
  };

  const removeSupervisorMembers = (userList) => {
    deleteSubordinates({ variables: { userList: userList } });
  };

  const confirmSubordinates = async () => {
    const arrayOfUsersToRemove: Array<string> = [];

    if (!(elementCompare(targetKeys, targetKeysInitial))) {
      for (const i in targetKeysInitial) {
        const index = targetKeys.indexOf(targetKeysInitial[i]);

        if (index === -1) {
          arrayOfUsersToRemove.push(targetKeysInitial[i]);
        }
      }
      if (targetKeys.length !== 0) {
        addSupervisorMembers(user?.id, targetKeys);
      }
      if (arrayOfUsersToRemove.length !== 0) {
        removeSupervisorMembers(arrayOfUsersToRemove);
      }
    }

    setTargetKeys(targetKeys);
    setTargetKeysInitial(targetKeys);
  };

  useEffect(
    () => {
      const data: Array<{ key: string, username: string }> = [];
      const rightColumn: string[] = [];

      if(!loading && !error && userInfo !== undefined) {
        for (let i = 0; i < users.length; i++) {
          if (users[i].supervisor !== null
            && users[i].supervisor.id === user?.id) {
            rightColumn.push(users[i].id);
          }
        }

        for (let i = 0; i < users.length; i++) {
          if (users[i].id !== user?.id && (users[i].supervisor === null
            || users[i].supervisor.id === user?.id)) {
            data.push({
              key: users[i].id,
              username: users[i].name
            });
          }
        }
        setMockData(data as any);
        setTargetKeys(rightColumn);
        setTargetKeysInitial(rightColumn);
      }
    },
    [
      loading,
      error]
  );

  return (
    <>
      <h1>Przydziel podwładnych</h1>
      <Transfer
        dataSource={ mockData as any}
        listStyle={{
          height: 400,
          width: 700
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
      <Button className="confirmButtton" onClick={ confirmSubordinates }>Zatwierdź</Button>
    </>
  );};
