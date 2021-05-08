import React, { FunctionComponent, ReactNode, useState } from 'react';
import {Breadcrumb, List, Form, Button, Typography, Space } from 'antd';
import {InboxOutlined, EditFilled } from '@ant-design/icons';
import {
  AddTaskMutationVariables,
  namedOperations,
  UpdateTaskMutationVariables,
  useAddTaskMutation,
  useGetTasksQuery,
  useUpdateTaskMutation
} from '../../generated/graphql';

import '../../css/ProjectsView.css';
import { useLocation } from 'react-router';
import { TaskModal } from './TaskModal';
import { Link } from 'react-router-dom';

const {Text} = Typography;

type IconTextProps = {
  text: string,
  icon: any
}

const IconText = ({ icon: Icon, text }: IconTextProps) : JSX.Element => (
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const location = useLocation<TaskLocation>();
  const {
    client: { name: clientName},
    project: {id: projectId, name: projectName}
  } = location.state;

  const {error, data, loading} = useGetTasksQuery({
    fetchPolicy: 'no-cache',
    variables: {projectId}
  });
  const [addTask] = useAddTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const [form] = Form.useForm();

  const showModal = (editMode = false) => {
    setIsModalVisible(true);
    setIsEditMode(editMode);
    if(!editMode) {
      form.resetFields();
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinishAdd = async (variables: AddTaskMutationVariables) => {
    setIsModalVisible(false);
    await addTask({
      refetchQueries:[namedOperations.Query.GetTasks],
      variables: {...variables, projectId}
    });

    form.resetFields();
  };

  const onFinishEdit = (formVars) => {
    const vars = {...formVars, taskId: formVars.id};
    const realFn = async (variables: UpdateTaskMutationVariables) => {
      setIsModalVisible(false);

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
    form.setFieldsValue({...task, projectId, taskId: task.id});
    showModal(true);
  };

  const onFinish = isEditMode ? onFinishEdit : onFinishAdd;

  if (loading) {return <p>Loading...</p>;}
  if (error) {return <p>Error :(</p>;}

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>Klienci</Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={{pathname: '/clients'}}>
            {`Klient: ${ clientName }`}
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{`Projekt: ${ projectName }`}</Breadcrumb.Item>
        <Breadcrumb.Item>Wszystkie zadania</Breadcrumb.Item>
      </Breadcrumb>
      <Button onClick={ newProjectHandler }><Text strong>Dodaj zadanie ➕</Text></Button>
      <List
        header={<h1>{`Zadania projektu: "${ projectName }"`}</h1>}
        bordered
        itemLayout="vertical"
        dataSource={tasks}
        renderItem={(task) => (
          <List.Item
            actions={[
              <Button key="1" size='small' onClick={() => editTaskHandler(task)}>
                <IconText icon={ EditFilled } text="Edytuj" key="list-vertical-star-o"/>
              </Button>,
              <Button key="2" size='small'>
                <IconText icon={ InboxOutlined } text="Archiwizuj" key="list-vertical-like-o"/>
              </Button>
            ]}
          >
            {`${ task.name }`}
          </List.Item>
        )}
      />
      <TaskModal
        form={form}
        handleCancel={handleCancel}
        isEditMode={isEditMode}
        isModalVisible={isModalVisible}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      />
    </>
  );};
