import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { Breadcrumb, List, Form, Button, Typography, Space } from 'antd';
import { InboxOutlined, EditFilled } from '@ant-design/icons';

import {
  AddTaskMutationVariables,
  namedOperations,
  Task,
  UpdateTaskMutationVariables,
  useAddTaskMutation,
  useArchiveTaskMutation,
  useGetTasksQuery,
  useUpdateTaskMutation
} from '../../generated/graphql';
import '../../css/TasksView.css';
import { TaskModal } from './TaskModal';
import { ArchiveModal } from '../../components';

const { Text } = Typography;

const IconText = ({ icon: Icon, text }: any) : JSX.Element => (
  <Space>
    <Icon/>
    {text}
  </Space>
);

interface TaskLocation {
  client: {
    id: string,
    name: string
  },
  project: {
    id: string,
    name: string
  }
}

export const TaskView = () : JSX.Element => {
  const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);
  const [isArchiveModalVisible, setIsArchiveModalVisible] = useState(false);
  const [taskToBeArchived, setTaskToBeArchived] = useState<Task | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const location = useLocation<TaskLocation>();
  const {
    client: { name: clientName },
    project: { id: projectId, name: projectName }
  } = location.state;

  const { error, data, loading } = useGetTasksQuery({
    fetchPolicy: 'no-cache',
    variables: { projectId }
  });
  const [addTask] = useAddTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [archiveTask] = useArchiveTaskMutation();

  const [form] = Form.useForm();

  const showModal = (editMode = false) => {
    setIsTaskModalVisible(true);
    setIsEditMode(editMode);
    if(!editMode) {
      form.resetFields();
    }
  };

  const showArchiveModal = (task) => {
    setTaskToBeArchived(task);
    setIsArchiveModalVisible(true);
  };

  const hideArchiveModal = () => {
    setTaskToBeArchived(null);
    setIsArchiveModalVisible(false);

  };

  const handleArchive = (task) => {
    archiveTask({
      refetchQueries:[namedOperations.Query.GetTasks],
      variables: { taskId: task.id }
    });

    hideArchiveModal();
  };

  const handleCancel = () => {
    setIsTaskModalVisible(false);
  };

  const onFinishAdd = async (variables: AddTaskMutationVariables) => {
    setIsTaskModalVisible(false);
    await addTask({
      refetchQueries:[namedOperations.Query.GetTasks],
      variables: { ...variables, projectId }
    });

    form.resetFields();
  };

  const onFinishEdit = (formVars) => {
    const vars = { ...formVars, taskId: formVars.id };
    const realFn = async (variables: UpdateTaskMutationVariables) => {
      setIsTaskModalVisible(false);

      await updateTask({
        refetchQueries:[namedOperations.Query.GetTasks],
        variables
      });

      form.resetFields();
    };

    realFn(vars);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const tasks = data?.project?.tasks || [];

  const newProjectHandler = () => {
    showModal();
  };

  const editTaskHandler = (task) => {
    form.setFieldsValue({ ...task, projectId, taskId: task.id });
    showModal(true);
  };

  const onFinish = isEditMode ? onFinishEdit : onFinishAdd;

  if (loading) { return <p>Loading...</p>; }
  if (error) { return <p>Error :(</p>; }

  return (
    <>
      <Space direction="vertical" size="middle">
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
          <Breadcrumb.Item>{ `Zadania projektu: "${ projectName }"` }</Breadcrumb.Item>
        </Breadcrumb>
        <Button onClick={ newProjectHandler }><Text strong>Dodaj zadanie ➕</Text></Button>
        <List
          header={ <h1>{ `Zadania projektu: "${ projectName }"` }</h1> }
          bordered
          itemLayout="vertical"
          dataSource={ tasks }
          renderItem={ (task) => (
            <List.Item
              actions={[
                <Button key="1" size='small' onClick={ () => editTaskHandler(task) }>
                  <IconText icon={ EditFilled } text="Edytuj" key="list-vertical-star-o"/>
                </Button>,
                <Button key="2" size='small' onClick={ () => showArchiveModal(task) }>
                  <IconText icon={ InboxOutlined } text="Archiwizuj" key="list-vertical-like-o"/>
                </Button>
              ]}
            >
              { `${ task.name }` }
            </List.Item>
          )}
        />

        <TaskModal
          form={ form }
          handleCancel={ handleCancel }
          isEditMode={ isEditMode }
          isModalVisible={ isTaskModalVisible }
          onFinish={ onFinish }
          onFinishFailed={ onFinishFailed }
        />

        <ArchiveModal
          isModalVisible={ isArchiveModalVisible }
          handleCancel={ hideArchiveModal }
          handleOk={ () => handleArchive(taskToBeArchived) }
          title={ `Archiwizuj ${  taskToBeArchived?.name }` }
          modalText={ `Czy na pewno chcesz archiwizować projekt ${ taskToBeArchived?.name }?` }
        />
      </Space>
    </>
  );};
