import React, { useState } from 'react';
import { Transfer, Switch, Table, Tag, Breadcrumb } from 'antd';
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

        />
      );
    }}
  </Transfer>
);

const mockData: any[] = [];

for (let i = 0; i < 20; i++) {
  mockData.push({
    description: `description of content${ i + 1 }`,
    disabled: i % 4 === 0,
    key: i.toString(),
    title: `content${ i + 1 }`
  });
}

const originTargetKeys = mockData.filter((item) => +item.key % 3 > 1).map((item) => item.key);

const leftTableColumns = [
  {
    dataIndex: 'title',
    title: 'Name'
  },
  {
    dataIndex: 'description',
    title: 'Description'
  }
];
const rightTableColumns = [
  {
    dataIndex: 'title',
    title: 'Name'
  }
];

export const ProjectAssignmentsView = () : JSX.Element => {
  const [targetKeys, setTargetKeys] = useState(originTargetKeys);
  const [disabled, setDisabled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
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

  const triggerDisable = (nextDisabled) => {
    setDisabled(nextDisabled);
  };

  const triggerShowSearch = (nextShowSearch) => {
    setShowSearch(nextShowSearch);
  };

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
        dataSource={mockData}
        targetKeys={targetKeys}
        disabled={disabled}
        showSearch={showSearch}
        onChange={onChange}
        filterOption={(inputValue, item) =>
          item.title.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
        }
        leftColumns={leftTableColumns}
        rightColumns={rightTableColumns}
      />

      <Switch
        unCheckedChildren="disabled"
        checkedChildren="disabled"
        checked={disabled}
        onChange={triggerDisable}
        style={{ marginTop: 16 }}
      />

      <Switch
        unCheckedChildren="showSearch"
        checkedChildren="showSearch"
        checked={showSearch}
        onChange={triggerShowSearch}
        style={{ marginTop: 16 }}
      />
    </>
  );
};
