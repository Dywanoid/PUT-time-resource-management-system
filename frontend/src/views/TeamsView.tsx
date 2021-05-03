import React, { useState } from 'react';
import { List, Modal, Form, Input, Button, Space } from 'antd';
import { useQuery, useMutation } from '@apollo/client';
import {
  GetAllTeams,
  CreateTeamMutation,
  UpdateTeamMutation,
  ArchiveTeamMutation
} from '../graphql/queries/teams';
import { DeleteOutlined, EditFilled, ExclamationCircleOutlined, InboxOutlined  } from '@ant-design/icons';
import '../css/TeamsView.css';

const { confirm } = Modal;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};
const tailLayout = { wrapperCol: { offset: 4 } };

const IconText = ({ icon, text }: any) : JSX.Element => (
  <Space>
    { React.createElement(icon) }
    { text }
  </Space>
);

// const showDeleteConfirm = () => {
//   confirm({
//     cancelText: 'Wróć',
//     content: 'Czy napewno chcesz usunąć ten zespół ?',
//     icon: <ExclamationCircleOutlined/>,
//     okText: 'Usuń',
//     okType: 'danger',
//     onCancel() {
//       console.log('Cancel');
//     },
//     onOk() {
//       console.log('OK');
//     },
//     title: 'Usuń Zespół'
//   });
// };

export const TeamsView = () : JSX.Element => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [description, setDescription] = useState('');
  const [isCreateTeamModal, setCreateTeamModal] = useState(false);
  const { error, data, loading } = useQuery(GetAllTeams);
  const [createTeam] = useMutation(CreateTeamMutation);
  const [updateTeam] = useMutation(UpdateTeamMutation);
  const [archiveTeam] = useMutation(ArchiveTeamMutation);
  const [form] = Form.useForm();

  const addTeam = () => {
    createTeam({
      refetchQueries: [{ query: GetAllTeams }],
      variables: {
        description: description,
        name: name
      }
    });
  };

  const editTeam = () => {
    updateTeam({
      refetchQueries: [{ query: GetAllTeams }],
      variables: {
        description: description,
        name: name,
        teamId: id
      }
    });
  };

  const hideTeam = (archiveId) => {
    archiveTeam({
      refetchQueries: [{ query: GetAllTeams }],
      variables: { teamId: archiveId }
    });
  };

  const onFinish = async () => {
    setCreateTeamModal(false);
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setCreateTeamModal(false);
    setIsModalVisible(false);
  };

  if (loading) {return <p>Loading...</p>;}
  if (error) {return <p>Error :(</p>;}

  const newTeamHandler = () => {
    form.resetFields();
    setName('');
    setDescription('');
    setId('');
    setCreateTeamModal(true);
    showModal();
  };

  const editTeamButton = (teamId, teamName, teamDescription) => {
    form.setFieldsValue({ description: teamDescription, name: teamName });
    setName(teamName);
    setDescription(teamDescription);
    setId(teamId);
    setIsModalVisible(true);
  };

  const teams = data?.teams || [];

  return (
    <>
      <Button onClick={ newTeamHandler } className="addTeam">Dodaj zespół ➕</Button>
      <List
        header={ <h1>Zespoły</h1> }
        bordered
        itemLayout="vertical"
        dataSource={ [...teams] }
        renderItem={ (item: any) => {
          if (!item.archived) {
            return (
              <List.Item
                actions={ [
                  <Button key="1" size='small' onClick={ () => editTeamButton(item.id, item.name, item.description) }>
                    <IconText icon={ EditFilled } text="Edytuj" key="list-vertical-star-o"/>
                  </Button>,
                  <Button key="2" size='small' onClick={ () => hideTeam(item.id) }>
                    <IconText icon={ InboxOutlined } text="Archiwizuj" key="list-vertical-like-o"/>
                  </Button>
                  // ,
                  // <Button size='small' onClick={ showDeleteConfirm } key="3" danger>
                  //   <IconText icon={ DeleteOutlined } text="Usuń" key="list-vertical-like-o"/>
                  // </Button>
                ] }
              >
                <List.Item.Meta
                  title={ <div>{ item.name }</div> }
                  description={ <div>{ item.description }</div> }
                />
              </List.Item>
            );
          }

          return (null);
        }}
      />
      <Modal
        destroyOnClose={ true }
        title={ isCreateTeamModal ? 'Dodaj Zespół' : 'Edytuj Zespół' }
        onCancel={ handleCancel }
        visible={ isModalVisible }
        footer={ null }
      >
        <Form
          { ...layout }
          form={ form }
          name="basic"
          onFinish={ onFinish }
        >
          <Form.Item
            label="Nazwa"
            name="name"
            initialValue={ name }
            rules={ [{ message: 'Wpisz nazwę zespołu!', required: true }] }
          >
            <Input onChange={ (e) => { setName(e.target.value); } }/>
          </Form.Item>
          <Form.Item
            label="Opis"
            name="description"
            initialValue={ description }
            rules={ [{ message: 'Wypełnij pole dotyczące opisu!', required: true }] }
          >
            <Input onChange={ (e) => { setDescription(e.target.value); } }/>
          </Form.Item>
          <Form.Item { ...tailLayout } shouldUpdate>
            { () => (
              <Button
                type="primary"
                htmlType="submit"
                onClick={ isCreateTeamModal ? addTeam : editTeam }
                disabled={
                  isCreateTeamModal
                  && (!form.isFieldsTouched(true)
                  || !!form.getFieldsError().filter(({ errors }) => errors.length).length)
                }
              >
                { isCreateTeamModal ? 'Dodaj' : 'Edytuj' }
              </Button>
            ) }
          </Form.Item>
        </Form>
      </Modal>
    </>
  );};
