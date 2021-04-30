import React, { useState } from 'react';
import { List, Modal, Form, Input, Button, Space } from 'antd';
import { DeleteOutlined, EditFilled, ExclamationCircleOutlined, InboxOutlined  } from '@ant-design/icons';
import { CreateClientMutationVariables, useCreateClientMutation, useGetAllClientsQuery } from '../generated/graphql';
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
  const { error, data, loading } = useGetAllClientsQuery({ fetchPolicy: 'no-cache' });
  const [addClient] = useCreateClientMutation();
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // const onFinish = async (variables: CreateClientMutationVariables) => {
  //   setIsModalVisible(false);
  //   await addClient({
  //     refetchQueries:['GetAllClients'],
  //     variables
  //   });

  //   form.resetFields();
  // };

  // const onFinishFailed = (errorInfo: any) => {
  //   console.log('Failed:', errorInfo);
  // };

  // if (loading) {return <p>Loading...</p>;}
  // if (error) {return <p>Error :(</p>;}

  const newTeamHandler = () => {
    showModal();
  };

  const clients = data?.clients || [];

  return (
    <>
      <List
        header={<h1>Zespoły</h1>}
        bordered
        itemLayout="vertical"
        dataSource={[...clients, { name: 'Dodaj zespół ➕', special: true }]}
        renderItem={(item: any) => {

          if(item.special) {
            return (
              <List.Item
                onClick={ newTeamHandler }
              >
                <Button>{ `${ item.name }` }</Button>
              </List.Item>);
          }

          return (
            <List.Item
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
            </List.Item>
          );}}
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
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Nazwa"
            name="name"
            rules={ [{ message: 'Wpisz nazwę!', required: true }] }
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="Opis"
            name="description"
            rules={ [{ message: 'Wpisz nazwę!', required: true }] }
          >
            <Input/>
          </Form.Item>

          <Form.Item { ...tailLayout }>
            <Button type="primary" htmlType="submit">
                Dodaj
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );};
