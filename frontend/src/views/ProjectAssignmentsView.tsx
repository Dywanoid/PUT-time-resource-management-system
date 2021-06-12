import React, { useState } from 'react';
import { Transfer, Table, Breadcrumb } from 'antd';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import '../css/ProjectAssignmentsView.css';
import { useGetAllUsersQuery } from '../generated/graphql';
interface AssignmentLocation {
  client: {
    id: string,
    name: string
  },
  project: {
    id: string,
    name: string
  }
}

const difference = (a, b) => {
  const setA = new Set(a);
  const setB = new Set(b);
  const differences = new Set();

  const checkSetsInOrder = (setX, setY) => {
    setX.forEach((value) => {
      if(!setY.has(value)) {
        differences.add(value);
      }
    });
  };

  checkSetsInOrder(setA, setB);
  checkSetsInOrder(setB, setA);

  return [...differences];
};

const TableTransfer = ({ leftColumns, rightColumns, ...restProps }: any) => (
  <Transfer {...restProps} showSelectAll={false}>
    {({
      direction,
      filteredItems,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys,
      disabled: listDisabled
    }: any) => {
      const columns = direction === 'left' ? leftColumns : rightColumns;

      const rowSelection = {
        getCheckboxProps: (item) => {return { disabled: listDisabled || item.disabled };},
        onSelect({ key }, selected) {
          onItemSelect(key, selected);
        },
        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows
            .filter((item) => !item.disabled)
            .map(({ key }) => key);
          const diffKeys: any[] = selected
            ? difference(treeSelectedKeys, listSelectedKeys)
            : difference(listSelectedKeys, treeSelectedKeys);

          onItemSelectAll(diffKeys, selected);
        },

        selectedRowKeys: listSelectedKeys
      };

      return (
        <Table
          columns={columns}
          dataSource={filteredItems}
          onRow={({ key, disabled: itemDisabled }: any) => {return {
            onClick: () => {
              if (itemDisabled || listDisabled) {return;}
              onItemSelect(key, !listSelectedKeys.includes(key));
            }
          };}}
          rowSelection={rowSelection}
          size="small"
          style={{ pointerEvents: listDisabled ? 'none' : 'auto' }}
          pagination={false}
        />
      );
    }}
  </Transfer>
);

const mockData: any[] = [];

for (let i = 0; i < 25; i++) {
  mockData.push({
    // disabled: i % 4 === 0,
    key: i.toString(),
    name: `Pracownik ${ i + 1 }`
  });
}

const originTargetKeys = mockData.filter((item) => +item.key % 3 > 1).map((item) => item.key);

const leftTableColumns = [
  {
    dataIndex: 'name',
    title: 'Imie i nazwisko'
  }
];
const rightTableColumns = [
  {
    dataIndex: 'name',
    title: 'Imie i nazwisko'
  }
];

export const ProjectAssignmentsView = () : JSX.Element => {
  const [targetKeys, setTargetKeys] = useState(originTargetKeys);
  const { loading, error, data }  = useGetAllUsersQuery();
  const location = useLocation<AssignmentLocation>();
  const {
    client: { name: clientName },
    project: { id: projectId, name: projectName }
  } = location.state;

  if (loading) { return <p>Loading...</p>; }
  if (error) { return <p>Error :(</p>; }

  console.log(data);

  const onChange = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  const allData = data?.users?.map((user) => {
    return {
      key: user.id,
      name: user.name
    };
  }) || [];

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={{ pathname: '/clients' }}>
            Klienci
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link
            to={{
              pathname: '/projects',
              state: location.state
            }}
          >
            { `Projekty klienta "${ clientName }"` }
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          { `Przypisz pracowników do projektu: "${ projectName }"` }
        </Breadcrumb.Item>
      </Breadcrumb>

      <TableTransfer
        dataSource={allData}
        targetKeys={targetKeys}
        // disabled={disabled}
        // showSearch={showSearch}
        onChange={onChange}
        leftColumns={leftTableColumns}
        rightColumns={rightTableColumns}
      />
    </>
  );
};
