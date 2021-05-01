import React, { useState } from 'react';
import { List, Modal, Form, Input, Button, Space } from 'antd';
import { useQuery, useMutation } from '@apollo/client';
import { GetAllTeams, CreateTeamMutation } from '../graphql/queries/teams';
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

const showDeleteConfirm = () => {
  confirm({
    cancelText: 'Wróć',
    content: 'Czy napewno chcesz usunąć ten zespół ?',
    icon: <ExclamationCircleOutlined/>,
    okText: 'Usuń',
    okType: 'danger',
    onCancel() {
      console.log('Cancel');
    },
    onOk() {
      console.log('OK');
    },
    title: 'Usuń Zespół'
  });
};

export const TeamsView = () : JSX.Element => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { error, data, loading } = useQuery(GetAllTeams);
  const [createTeam] = useMutation(CreateTeamMutation);
  const [form] = Form.useForm();

  const addTeam = () => {
    console.log(name, description);
    createTeam({
      refetchQueries: [{ query: GetAllTeams }],
      variables: {
        description: description,
        name: name
      }
    });
  };

  const onFinish = async () => {
    setIsModalVisible(false);

    form.resetFields();
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (loading) {return <p>Loading...</p>;}
  if (error) {return <p>Error :(</p>;}

  const newTeamHandler = () => {
    showModal();
  };

  const teams = data?.teams || [];

  return (
    <>
      <Button onClick={ newTeamHandler } className="addTeam">Dodaj zespół ➕</Button>
      <List
        header={<h1>Zespoły</h1>}
        bordered
        itemLayout="vertical"
        dataSource={[...teams]}
        renderItem={(item: any) => (<List.Item
          actions={[
            <Button key="1"size='small'>
              <IconText icon={ EditFilled } text="Edytuj" key="list-vertical-star-o"/>
            </Button>,
            <Button key="2"size='small'>
              <IconText icon={ InboxOutlined } text="Archiwizuj" key="list-vertical-like-o"/>
            </Button>,
            <Button size='small' onClick={ showDeleteConfirm } key="3" danger>
              <IconText icon={ DeleteOutlined } text="Usuń" key="list-vertical-like-o"/>
            </Button>
          ]}
        >
          {
            <>
              <div className='hover-button'>
                <span className='hover-button--off'>{ `${ item.name }` }</span>
                <span className='hover-button--on'>{ `${ item.name }` }</span>
              </div>
            </>

          }
          <List.Item.Meta
            title={<div>{item.title}</div>}
            description={<div>{item.description}</div>}
          />
        </List.Item>
        )}
      />
      <Modal
        title="Dodaj Zespół"
        onCancel={ handleCancel }
        visible={ isModalVisible }
        footer={ null }>
        <Form
          { ...layout }
          form={ form }
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Nazwa"
            name="name"
            rules={ [{ message: 'Wpisz nazwę!', required: true }] }
          >
            <Input onChange={(e) => { setName(e.target.value); }}/>
          </Form.Item>
          <Form.Item
            label="Opis"
            name="description"
            rules={ [{ message: 'Wpisz nazwę!', required: true }] }
          >
            <Input onChange={(e) => { setDescription(e.target.value); }}/>
          </Form.Item>

          <Form.Item { ...tailLayout }>
            <Button type="primary" htmlType="submit" onClick={ addTeam }>
                Dodaj
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );};
