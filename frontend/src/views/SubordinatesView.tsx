import { useState, useContext, useEffect } from 'react';
import { Transfer, notification, List } from 'antd';
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
  const { data: userData , loading, error } = useGetAllUsersQuery();
  const [teamIdentify, setTeamId] = useState('');
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [targetKeysInitial, setTargetKeysInitial] = useState<string[]>([]);
  const [mockData, setMockData] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const user = userInfo || { id: '' };
  const users = userData?.users || [] as any;
  const rightColumn: string[] = [];
  const useMountEffect = (fun) => useEffect(fun, []);

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

  useEffect(
    () => {
      const data: Array<{ key: string, username: string }> = [];

      if(!loading && !error && userInfo !== undefined) {
        for (let i = 0; i < users.length; i++) {
          if (users[i].supervisor !== null
            && users[i].supervisor.id === user.id) {
            rightColumn.push(users[i].id);
          }
        }

        for (let i = 0; i < users.length; i++) {
          if (users[i].id !== userInfo?.id && (users[i].supervisor === null
            || users[i].supervisor.id === userInfo?.id)) {
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
    </>
  );};
