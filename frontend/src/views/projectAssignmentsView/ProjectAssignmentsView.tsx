import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { injectIntl } from 'react-intl';
import { Form, Button, Table, Breadcrumb, Space } from 'antd';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import '../../css/ProjectAssignmentsView.css';
import {
  namedOperations,
  useAssignUserToProjectMutation,
  useDeleteUserFromProjectMutation,
  useGetAllUsersQuery,
  useGetProjectAssignmentsQuery,
  useUpdateProjectAssignmentMutation
} from '../../generated/graphql';
import Text from 'antd/lib/typography/Text';
import { AssignmentModal } from './AssignmentModal';
import { UserAssignmentModal } from './UserAssignmentModal';
import { formatDateForBackend } from '../../utils/utils';
import { DeleteModal } from './DeleteModal';

interface User {
  id: string;
  name: string;
}

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

const getColumns = (intl, assigned = false) => {
  const columns: any[] = [
    {
      dataIndex: 'name',
      title: intl.formatMessage({ id: 'user_name' })
    }
  ];

  if(assigned) {
    columns.push({
      dataIndex: 'hourlyRate',
      title:  intl.formatMessage({ id: 'hourly_rate' })
    });
  }

  columns.push({
    dataIndex: 'action',
    render: function ActionRenderer(value, row){
      return (
        <div
          style={{ textAlign: 'center' }}
        >
          <Button
            onClick={row.onClick}
            style={{ textAlign: 'center' }}
          >
            {value}
          </Button>
        </div>);
    },
    title: intl.formatMessage({ id: 'action' })
  });

  return columns;
};

export const ProjectAssignmentsView = injectIntl(({ intl }): JSX.Element => {
  const location = useLocation<AssignmentLocation>();
  const {
    client: { name: clientName },
    project: { id: projectId, name: projectName }
  } = location.state;

  const [hourlyRates, setHourlyRates] = useState<{[id: string]: string}>({});
  const [rawAssignmentsMap, setRawAssignmentsMap] = useState<{[id: string]: any[]}>({});

  const [assignmentModalVisible, setAssignmentModalVisible] = useState(false);
  const [userAssignmentModalVisible, setUserAssignmentModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>({ id: '0', name: '' });
  const [assignmentIdToDelete, setAssignmentIdToDelete] = useState('');

  const [isEditMode, setIsEditMode] = useState(false);
  const [deleteAssignmentModalVisible, setDeleteAssignmentModalVisible] = useState(false);
  const [form] = Form.useForm();

  const { loading, error, data } = useGetProjectAssignmentsQuery({
    fetchPolicy: 'no-cache',
    variables: { projectId }
  });

  const { loading: usersLoading, error: usersError, data: usersData } = useGetAllUsersQuery();
  const [deleteUserAssignment] = useDeleteUserFromProjectMutation();
  const [assignUser] = useAssignUserToProjectMutation({
    refetchQueries: [
      namedOperations.Query.GetProjectAssignments
    ]
  });

  const [updateAssignment] = useUpdateProjectAssignmentMutation({
    refetchQueries: [
      namedOperations.Query.GetProjectAssignments
    ]
  });

  useEffect(
    () => {
      if(!loading && !error) {
        const alreadyMappedUserMap = {};
        const hourlyRatesMap = {};

        data?.projectAssignments?.forEach((assignment) => {
          const { user } = assignment;

          if(!alreadyMappedUserMap[user.id]) {
            alreadyMappedUserMap[user.id] = [];
          }

          alreadyMappedUserMap[user.id].push(assignment);
          hourlyRatesMap[assignment.id] = assignment.hourlyRate;
        });

        setRawAssignmentsMap(alreadyMappedUserMap);
        setHourlyRates(hourlyRatesMap);
      }
    },
    [
      loading,
      error,
      data]
  );

  if (loading || usersLoading) { return <p>Loading...</p>; }
  if (error || usersError) { return <p>Error :(</p>; }

  const { assignedUsers, unassignedUsers } = usersData?.users?.reduce(
    (acc: any, user) => {
      if(rawAssignmentsMap[user.id]) {
        const currentDate = moment();
        const currentAssignment = rawAssignmentsMap[user.id].find((assignment) =>{
          const isBeginDate = !!assignment.beginDate;
          const isEndDate = !!assignment.EndDate;

          if(isBeginDate && isEndDate) {
            return currentDate.isBetween(assignment.beginDate, assignment.endDate, 'day', '[]');
          }

          if(!isBeginDate) {
            return currentDate.isSameOrBefore(assignment.endDate);
          }

          if(!isEndDate) {
            return currentDate.isSameOrAfter(assignment.beginDate);
          }

          return true;
        });

        const hourlyRate = currentAssignment && hourlyRates[currentAssignment.id] || '--';

        acc.assignedUsers.push({
          action: '✏',
          hourlyRate,
          key: user.id,
          name: user.name,
          onClick: () => {
            setUserAssignmentModalVisible(true);
            setCurrentUser(user);
          },
          projectAssignmentIds: rawAssignmentsMap[user.id]
        });
      } else {
        acc.unassignedUsers.push({
          action: '➕',
          key: user.id,
          name: user.name,
          onClick: () => {
            setIsEditMode(false);
            form.setFieldsValue({ userId: user.id });
            setAssignmentModalVisible(true);
            setCurrentUser(user);
          }
        });
      }

      return acc;
    },
    { assignedUsers:[], unassignedUsers:[] }
  );

  const columnsUnassigned = getColumns(intl);
  const columnsAssigned = getColumns(intl, true);

  const handleAssignmentCancel = () => {
    setAssignmentModalVisible(false);
    form.resetFields();
    form.setFieldsValue({ userId: currentUser.id });
  };

  const handleUserCancel = () => {
    setUserAssignmentModalVisible(false);
  };

  const handleDeleteCancel = () => {
    setDeleteAssignmentModalVisible(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onFinishAdd = async (variables) => {
    setAssignmentModalVisible(false);
    console.log(variables);

    const beginDate = formatDateForBackend(variables.dateRange[0]);
    const endDate = formatDateForBackend(variables.dateRange[1]);

    await assignUser({
      refetchQueries: [namedOperations.Query.GetProjectAssignments],
      variables: { beginDate,endDate, hourlyRate: Number(variables.hourlyRate), projectId, userId: variables.userId }
    });

    form.resetFields();
  };

  const onFinishEdit = async (variables) => {
    setAssignmentModalVisible(false);
    console.log(variables);

    const beginDate = formatDateForBackend(variables.dateRange[0]);
    const endDate = formatDateForBackend(variables.dateRange[1]);

    await updateAssignment({
      refetchQueries: [namedOperations.Query.GetProjectAssignments],
      variables: {
        beginDate,
        endDate,
        hourlyRate: Number(variables.hourlyRate),
        projectAssignmentId: variables.projectAssignmentId
      }
    });

    form.resetFields();
  };

  const onFinish = isEditMode ? onFinishEdit : onFinishAdd;

  const handleEdit = (user, assignment) => {
    setIsEditMode(true);
    setAssignmentModalVisible(true);
    form.setFieldsValue({
      dateRange: [moment(assignment.beginDate || undefined), moment(assignment.endDate || undefined)],
      hourlyRate: assignment.hourlyRate,
      projectAssignmentId: assignment.id,
      userId: user.id
    });
  };

  const handleAdd = (user) => {
    setIsEditMode(false);
    setAssignmentModalVisible(true);
    form.resetFields();
    form.setFieldsValue({ userId: user.id });
  };

  const handleDelete = (assignment) => {
    setAssignmentIdToDelete(assignment.id);
    setDeleteAssignmentModalVisible(true);
  };

  const handleOk = () => {
    deleteUserAssignment({
      refetchQueries: [namedOperations.Query.GetProjectAssignments],
      variables:  { projectAssignmentId: assignmentIdToDelete }
    });
    setDeleteAssignmentModalVisible(false);
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={{ pathname: '/clients' }}>
            { intl.formatMessage({ id: 'clients' }) }
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link
            to={{
              pathname: '/projects',
              state: location.state
            }}
          >
            { `${ intl.formatMessage({ id: 'client_projects' }) } "${ clientName }"` }
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          { `${ intl.formatMessage({ id: 'assign_employees_to_project' }) }: "${ projectName }"` }
        </Breadcrumb.Item>
      </Breadcrumb>
      <Space align='start' style={{ width: '100%' }} direction="horizontal" size="large">
        <Table
          style={{ width: 600 }}
          bordered
          columns={columnsUnassigned}
          dataSource={unassignedUsers}
          pagination={false}
          title={() => <Text strong>{intl.formatMessage({ id: 'unassigned' })}</Text>}
        />
        <Table
          style={{ width: 600 }}
          bordered
          dataSource={assignedUsers}
          pagination={false}
          columns={columnsAssigned}
          title={() => <Text strong>{intl.formatMessage({ id: 'assigned' })}</Text>}
        />
      </Space>

      <UserAssignmentModal
        intl={intl}
        assignments={data?.projectAssignments?.filter((assignment) => assignment.user.id === currentUser.id) || []}
        user={currentUser}
        isModalVisible={userAssignmentModalVisible}
        handleCancel={handleUserCancel}
        handleEdit={handleEdit}
        handleAdd={handleAdd}
        handleDelete={handleDelete}
      />

      <AssignmentModal
        form={form}
        intl={intl}
        isModalVisible={assignmentModalVisible}
        isEditMode={isEditMode}
        user={currentUser}
        onFinishFailed={onFinishFailed}
        handleCancel={handleAssignmentCancel}
        onFinish={onFinish}
      />

      <DeleteModal
        isModalVisible={deleteAssignmentModalVisible}
        handleCancel={handleDeleteCancel}
        handleOk={handleOk}
        intl={intl}
      />

    </>
  );
});
