import React, { useEffect, useState } from 'react';
import { Transfer, Table, Breadcrumb } from 'antd';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import '../css/ProjectAssignmentsView.css';
import {
  namedOperations,
  useAssignUserToProjectMutation,
  useDeleteUserFromProjectMutation,
  useGetAllUsersQuery,
  useGetProjectAssignmentsQuery,
  useUpdateProjectAssignmentMutation
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
  <Transfer
    {...restProps}
    showSelectAll={false}
  >
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

const leftTableColumns = [
  {
    dataIndex: 'name',
    title: localStorage.getItem('lang') === 'pl' ? 'Imię i nazwisko' : 'Name and surname'
  }
];

const rightTableColumns = [
  {
    dataIndex: 'name',
    title: localStorage.getItem('lang') === 'pl' ? 'Imię i nazwisko' : 'Name and surname'
  },
  {
    dataIndex: 'hourlyRate',
    title: localStorage.getItem('lang') === 'pl' ? 'Stawka godzinowa (zł/h)' : 'Hourly rate (PLN/h)'
  }
];

export const ProjectAssignmentsView = () : JSX.Element => {
  const location = useLocation<AssignmentLocation>();
  const {
    client: { name: clientName },
    project: { id: projectId, name: projectName }
  } = location.state;

  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [hourlyRates, setHourlyRates] = useState<{[id: string]: string}>({});
  const [rawAssignmentsMap, setRawAssignmentsMap] = useState<{[id: string]: string[]}>({});

  const { loading, error, data } = useGetProjectAssignmentsQuery({
    fetchPolicy: 'no-cache',
    variables: { projectId }
  });

  const { loading: usersLoading, error: usersError, data: usersData } = useGetAllUsersQuery();
  const [deleteUserAssignment] = useDeleteUserFromProjectMutation();
  const [assignUser] = useAssignUserToProjectMutation();
  const [updateAssignment] = useUpdateProjectAssignmentMutation();

  useEffect(
    () => {
      if(!loading && !error) {
        const alreadyMappedUserMap = {};
        const hourlyRatesMap = {};

        const assignedUsers = data?.projectAssignments?.reduce((acc: string[], assignment) => {
          const { user } = assignment;

          if(!alreadyMappedUserMap[user.id]) {
            acc.push(user.id);
            alreadyMappedUserMap[user.id] = [];
          }

          alreadyMappedUserMap[user.id].push(assignment.id);
          hourlyRatesMap[assignment.id] = assignment.hourlyRate;

          return acc;
        }, []) || [];

        setRawAssignmentsMap(alreadyMappedUserMap);
        setHourlyRates(hourlyRatesMap);
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

  const attachRenderer = (columns) => {
    const onInputBlur = (event, record) => {
      const changedMap = {};

      record.projectAssignmentIds.forEach((projectAssignmentId) => {
        const newHourlyRate = parseFloat(event.target.value);

        changedMap[projectAssignmentId] = newHourlyRate;
        updateAssignment({
          variables: {
            hourlyRate: newHourlyRate,
            projectAssignmentId
          }
        });

      });
      setHourlyRates({ ...hourlyRates, ...changedMap });
    };

    return columns.map((column) => {
      if(column.dataIndex === 'hourlyRate') {
        return {
          ...column,
          render: function HourlyRateInput(currentRate, record){
            return (
              <input
                type="number"
                step="0.01"
                style={{ textAlign: 'right' }}
                onBlur={(event) => onInputBlur(event, record)}
                defaultValue={currentRate}
              />
            );
          }
        };
      }

      return column;
    });
  };

  const onChange = (nextTargetKeys: string[]) => {
    const diff =  difference(nextTargetKeys, targetKeys) as string[];

    if(nextTargetKeys.length > targetKeys.length) {
      diff.forEach((userId) => {
        assignUser({
          refetchQueries: [namedOperations.Query.GetProjectAssignments],
          variables: { projectId, userId }
        });
      });
    } else {
      diff.forEach((userId) => {
        rawAssignmentsMap[userId].forEach((projectAssignmentId) => {
          deleteUserAssignment({
            refetchQueries: [namedOperations.Query.GetProjectAssignments],
            variables:  { projectAssignmentId }
          });
        });
      });
    }

    setTargetKeys(nextTargetKeys);
  };

  const allUsers = usersData?.users?.map((user) => {
    return {
      hourlyRate: rawAssignmentsMap[user.id] && hourlyRates[rawAssignmentsMap[user.id][0]],
      key: user.id,
      name: user.name,
      projectAssignmentIds: rawAssignmentsMap[user.id]
    };
  });

  console.log(allUsers);

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
            { `${ localStorage.getItem('lang') === 'pl' ? 'Projekty klienta' : 'Client projects' } "${ clientName }"` }
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          { `${ localStorage.getItem('lang') === 'pl'
            ? 'Przypisz pracowników do projektu'
            : 'Assign employees to project' }: "${ projectName }"` }
        </Breadcrumb.Item>
      </Breadcrumb>

      <TableTransfer
        dataSource={allUsers}
        targetKeys={targetKeys}
        // disabled={disabled}
        // showSearch={showSearch}
        onChange={onChange}
        leftColumns={leftTableColumns}
        rightColumns={attachRenderer(rightTableColumns)}
      />
    </>
  );
};
