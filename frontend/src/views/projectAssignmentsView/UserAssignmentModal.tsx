import React from 'react';
import { Modal, List, Button, Space } from 'antd';
import { IntlShape } from 'react-intl';
import { EditFilled, DeleteFilled } from '@ant-design/icons';

const IconText = ({ icon: Icon, text }: any) : JSX.Element => (
  <Space>
    <Icon/>
    {text}
  </Space>
);

interface UserAssignmentModalInput {
  isModalVisible: boolean,
  handleCancel: () => void;
  handleEdit: (user: any, assignment: any) => void;
  handleAdd: (user: any) => void;
  handleDelete: (assignment: any) => void;
  intl: IntlShape;
  assignments: any[];
  user: any;
}

export const UserAssignmentModal = ({
  handleCancel,
  isModalVisible,
  intl,
  user,
  handleAdd,
  handleEdit,
  handleDelete,
  assignments
}: UserAssignmentModalInput) : JSX.Element =>
  (
    <Modal
      destroyOnClose
      className="userModal"
      cancelText={intl.formatMessage({ id:'cancel' })}
      okText={intl.formatMessage({ id:'add' })}
      onCancel={ handleCancel }
      title={`${ intl.formatMessage({ id:'user' }) } ${ user.name }`}
      footer={ null }
      visible={ isModalVisible }
    >
      <Space direction="vertical" size="middle">
        <List
          bordered
          itemLayout="vertical"
          dataSource={ assignments }
          renderItem={ (assignment) => (
            <List.Item
              actions={[
                <Button key="1" size='small' onClick={ () => handleEdit(user, assignment)}>
                  <IconText
                    icon={ EditFilled }
                    text={ intl.formatMessage({ id: 'edit' }) }
                    key="list-vertical-star-o"
                  />
                </Button>,
                <Button key="2" size='small' onClick={ () => handleDelete(assignment)}>
                  <IconText
                    icon={ DeleteFilled }
                    text={ intl.formatMessage({ id: 'delete' }) }
                    key="list-vertical-star-o2"
                  />
                </Button>
              ]}
            >
              <div>
                <span>
                  {`${ intl.formatMessage({ id:'hourly_rate' }) }: ${ assignment.hourlyRate }`}
                </span>
              </div>
              {
                assignment.beginDate || assignment.endDate
                  ? (<div>
                    <span>
                      {`${
                        intl.formatMessage({ id:'date_range' })
                      }: ${ intl.formatMessage({ id:'from' }) } ${
                        assignment.beginDate || '--'
                      } ${ intl.formatMessage({ id:'to' }) } ${
                        assignment.endDate || '--'
                      }`}
                    </span>
                  </div>)
                  : null
              }

            </List.Item>
          )}
        />
        <Button
          onClick={() => handleAdd(user)}
        >
          {intl.formatMessage({ id: 'add' })}
        </Button>
      </Space>
    </Modal>
  );
