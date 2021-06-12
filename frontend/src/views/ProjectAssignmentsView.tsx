import React, { useEffect, useState } from 'react';
import { Transfer, Table, Breadcrumb } from 'antd';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import '../css/ProjectAssignmentsView.css';
import {
  useAssignUserToProjectMutation,
  useDeleteUserFromProjectMutation,
  useGetAllUsersQuery,
  useGetProjectAssignmentsQuery
} from '../generated/graphql';
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
  const location = useLocation<AssignmentLocation>();
  const {
    client: { name: clientName },
    project: { id: projectId, name: projectName }
  } = location.state;

  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [rawAssignmentsMap, setRawAssignmentsMap] = useState<{[id: string]: string}>({});

  const { loading, error, data } = useGetProjectAssignmentsQuery({ variables: { projectId } });
  const { loading: usersLoading, error: usersError, data: usersData } = useGetAllUsersQuery();
  const [deleteUserAssignment] = useDeleteUserFromProjectMutation();
  const [assignUser] = useAssignUserToProjectMutation();

  useEffect(
    () => {
      if(!loading && !error) {
        const alreadyMappedUserMap = {};
        const assignedUsers = data?.projectAssignments?.reduce((acc: string[], assignment) => {
          const { user } = assignment;

          if(!alreadyMappedUserMap[user.id]) {
            acc.push(user.id);
            alreadyMappedUserMap[user.id] = assignment.id;
          }

          return acc;
        }, []) || [];

        setRawAssignmentsMap(alreadyMappedUserMap);
        setTargetKeys(assignedUsers);
      }
    },
    [
      loading,
      error,
      data]
  );

  if (loading || usersLoading) { return <p>Loading...</p>; }
  if (error || usersError) { return <p>Error :(</p>; }

  const onChange = (nextTargetKeys: string[]) => {
    const diff =  difference(nextTargetKeys, targetKeys) as string[];

    if(nextTargetKeys.length > targetKeys.length) {
      diff.forEach((userId) => {
        assignUser({ variables: { projectId, userId } });
      });
    } else {
      diff.forEach((userId) => {
        deleteUserAssignment({ variables: { projectAssignmentId: rawAssignmentsMap[userId] } });
      });
    }

    setTargetKeys(nextTargetKeys);
  };

  const allUsers = usersData?.users?.map((user) => {
    return {
      key: user.id,
      name: user.name
    };
  });

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
        dataSource={allUsers}
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
