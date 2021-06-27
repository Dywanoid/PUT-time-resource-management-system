import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { Breadcrumb, List, Form, Button, Typography, Space } from 'antd';
import { BarsOutlined, InboxOutlined, EditFilled } from '@ant-design/icons';
import {
  AddProjectMutationVariables,
  namedOperations,
  useArchiveProjectMutation,
  UpdateProjectMutationVariables,
  useAddProjectMutation,
  useUpdateProjectMutation,
  useGetProjectsQuery,
  Project
} from '../../generated/graphql';

import '../../css/ProjectsView.css';
import { Redirect, useLocation } from 'react-router';
import { ProjectModal } from './ProjectModal';
import { ArchiveModal } from '../../components';
import { Link } from 'react-router-dom';

const { Text } = Typography;

const IconText = ({ icon, text }: any) : JSX.Element => (
  <Space>
    { React.createElement(icon) }
    { text }
  </Space>
);

interface ProjectLocation {
  client: {
    id: string,
    name: string
  }
}

interface ProjectState {
  client: {
    id: string,
    name: string
  },
  pathname: string,
  project: {
    id,
    name
  }
}

export const ProjectsView = injectIntl(({ intl }) : JSX.Element => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isArchiveModalVisible, setIsArchiveModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [projectState, setProjectState] = useState<ProjectState | null>(null);
  const [projectToBeArchived, setProjectToBeArchived] = useState<Project | null>(null);
  const [archiveProject] = useArchiveProjectMutation();
  const location = useLocation<ProjectLocation>();
  const { client } = location.state;
  const { id: clientId, name: clientName } = client;

  const { error, data, loading } = useGetProjectsQuery({
    fetchPolicy: 'no-cache',
    variables: { clientId }
  });

  const [addProject] = useAddProjectMutation();
  const [updateProject] = useUpdateProjectMutation();

  const [form] = Form.useForm();

  const showArchiveModal = (project) => {
    setProjectToBeArchived(project);
    setIsArchiveModalVisible(true);
  };

  const hideArchiveModal = () => {
    setProjectToBeArchived(null);
    setIsArchiveModalVisible(false);

  };

  const handleArchive = (project) => {
    archiveProject({
      refetchQueries:[namedOperations.Query.GetProjects],
      variables: { projectId: project.id }
    });

    hideArchiveModal();
  };

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

  const onFinishAdd = async (variables: AddProjectMutationVariables) => {
    setIsModalVisible(false);
    await addProject({
      refetchQueries:[namedOperations.Query.GetProjects],
      variables: { ...variables, clientId }
    });

    form.resetFields();
  };

  const onFinishEditHandler = (formVars) => {
    const vars = { ...formVars, projectId: formVars.id };
    const onFinishEdit = async (variables: UpdateProjectMutationVariables) => {
      setIsModalVisible(false);

      await updateProject({
        refetchQueries:[namedOperations.Query.GetProjects],
        variables
      });

      form.resetFields();
    };

    onFinishEdit(vars);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const projects = data?.client?.projects || [];

  const newProjectHandler = () => {
    showModal();
  };

  const editProjectHandler = (project) => {
    form.setFieldsValue({ ...project, clientId });
    showModal(true);
  };

  const onFinish = isEditMode ? onFinishEditHandler : onFinishAdd;

  const tasksHandler = (project) => {
    setProjectState({
      client,
      pathname:'/tasks',
      project
    });
  };

  const projectAssignmentsHandler = (project) => {
    setProjectState({
      client,
      pathname:'/projectAssignments',
      project
    });
  };

  if (loading) { return <p>Loading...</p>; }
  if (error) { return <p>Error :(</p>; }

  if(projectState) {
    return (<Redirect
      push
      to={{
        pathname: projectState.pathname,
        state: projectState
      }}
    />);
  }

  return (
    <>
      <Space direction="vertical" size="middle">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to={{ pathname: '/clients' }}>
              { intl.formatMessage({ id: 'clients' }) }
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{`${ intl.formatMessage({ id: 'client_projects' }) } "${ clientName }"`}</Breadcrumb.Item>
        </Breadcrumb>
        <Button onClick={ newProjectHandler }>
          <Text strong>
            { intl.formatMessage({ id: 'add_project' }) }
            ➕
          </Text>
        </Button>
        <List
          header={ <h1>{`${ intl.formatMessage({ id: 'client_projects' }) }: "${ location.state.client.name }"`}</h1> }
          bordered
          itemLayout="vertical"
          dataSource={ projects }
          renderItem={ (project) => (
            <List.Item
              actions={[
                <Button
                  key="1"
                  size='small'
                  onClick={ () => editProjectHandler(project) }
                >
                  <IconText
                    icon={ EditFilled }
                    text={ intl.formatMessage({ id: 'edit' }) }
                    key="list-vertical-star-o"
                  />
                </Button>,
                <Button
                  key="2"
                  size='small'
                  onClick={ () => showArchiveModal(project) }
                >
                  <IconText
                    icon={ InboxOutlined }
                    text={ intl.formatMessage({ id: 'archive' }) }
                    key="list-vertical-like-o"
                  />
                </Button>,
                <Button
                  key="3"
                  size='small'
                  onClick={() => projectAssignmentsHandler(project)}
                >
                  <IconText
                    icon={ BarsOutlined }
                    text={ intl.formatMessage({ id: 'assign_employees' }) }
                    key="list-vertical-message-2"
                  />
                </Button>,
                <Button
                  key="4"
                  size='small'
                  onClick={ () => tasksHandler(project) }
                >
                  <IconText
                    icon={ BarsOutlined }
                    text={ intl.formatMessage({ id: 'manage_tasks' }) }
                    key="list-vertical-message"
                  />
                </Button>
              ]}
            >
              { `${ project.name }` }
            </List.Item>
          )}
        />
        <ProjectModal
          form={form}
          handleCancel={ handleCancel }
          isEditMode={ isEditMode }
          isModalVisible={ isModalVisible }
          onFinish={ onFinish }
          onFinishFailed={ onFinishFailed }
        />

        <ArchiveModal
          isModalVisible={ isArchiveModalVisible }
          handleCancel={ hideArchiveModal }
          handleOk={ () => handleArchive(projectToBeArchived) }
          title={ `Archiwizuj ${ projectToBeArchived?.name }` }
          modalText={ `Czy na pewno chcesz archiwizować projekt ${ projectToBeArchived?.name }?` }
        />
      </Space>
    </>
  );
});
