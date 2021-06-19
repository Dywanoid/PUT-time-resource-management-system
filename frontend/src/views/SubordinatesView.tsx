import { useState, useContext } from 'react';
import { Layout, Menu, Avatar, Modal, Transfer, notification, List } from 'antd';
import { useGetAllUsersQuery } from '../generated/graphql';
import { UserContext } from '../utils/auth';

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
  const { data: userData } = useGetAllUsersQuery();
  const [teamIdentify, setTeamId] = useState('');
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [targetKeysInitial, setTargetKeysInitial] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const user = userInfo?.name || '';
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
      <h1>Przydziel podwładnych</h1>
      <Transfer
        dataSource={ mockData }
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
    </>
  );};
