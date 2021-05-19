import React, { useRef } from 'react';
import { Layout, Form, Input, Button, Select, FormInstance, DatePicker } from 'antd';
import 'antd/dist/antd.css';

const { Content } = Layout;
const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

export const ApplicationsView = (): JSX.Element => {
  const formRef = useRef<FormInstance>(null);

  const onGenderChange = (value: string) => {
    switch (value) {
      case 'male':
        formRef.current?.setFieldsValue({ note: 'Hi, man!' });

        return;
      case 'female':
        formRef.current?.setFieldsValue({ note: 'Hi, lady!' });

        return;
      case 'other':
        formRef.current?.setFieldsValue({ note: 'Hi there!' });
    }
  };

  const onFinish = () => {
    // values are passed here
    console.log('done!');
  };

  const onReset = () => {
    formRef.current?.resetFields();
  };

  const onFill = () => {
    formRef.current?.setFieldsValue({
      gender: 'male',
      note: 'Hello world!'
    });
  };

  return (
    <Layout>
      <Content>
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}
          ref={ formRef } name="control-ref" onFinish={ onFinish }>
          <Form.Item name="Wybierz przełożonego" label="Wybierz przełożonego" rules={[{ required: true }]}>
            <Select
              onChange={ onGenderChange }
              allowClear
            >
              <Option value="Jan Nowak">Jan Nowak</Option>
              <Option value="Piotr Krawczyk">Piotr Krawczyk</Option>
              <Option value="Tomasz Węgiel">Tomasz Węgiel</Option>
            </Select>
          </Form.Item>
          <Form.Item name="Typ wniosku" label="Typ wniosku" rules={[{ required: true }]}>
            <Select
              onChange={ onGenderChange }
              allowClear
            >
              <Option value="Urlop wypoczynkowy">Urlop wypoczynkowy</Option>
              <Option value="Chorobowe - L4">Chorobowe - L4</Option>
              <Option value="Chorobowe - opieka nad chorym dzieckiem">
                Chorobowe - opieka nad chorym dzieckiem
              </Option>
              <Option value="Chorobowe- opieka nad chorym członkiem rodziny">
                Chorobowe- opieka nad chorym członkiem rodziny
              </Option>
              <Option value="Urlop na żądanie">Urlop na żądanie</Option>
              <Option value="Urlop zaległy">Urlop zaległy</Option>
              <Option value="Wniosek o urlop bezpłatny">Wniosek o urlop bezpłatny</Option>
              <Option value="Urlop macierzyński">Urlop macierzyński</Option>
              <Option value="Urlop rodzicielski">Urlop rodzicielski</Option>
              <Option value="Urlop wychowawczy">Urlop wychowawczy</Option>
              <Option value="Urlop ojcowski">Urlop ojcowski</Option>
              <Option value="Urlop dodatkowy">Urlop dodatkowy</Option>
              <Option value="Urlop szkoleniowy">Urlop szkoleniowy</Option>
              <Option value="Wyjście prywatne">Wyjście prywatne</Option>
              <Option value="Nieobecność usprawiedliwiona płatna">Nieobecność usprawiedliwiona płatna</Option>
            </Select>
          </Form.Item>
          <Form.Item name="Dates" label="Dates" rules={[{ required: true }]}>
            <RangePicker/>
          </Form.Item>
          <Form.Item name="Opis" label="Opis" rules={[{ required: true }]}>
            <TextArea rows={ 4 }/>
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
          >
            {({ getFieldValue }) =>
              getFieldValue('gender') === 'other'
                ? (
                  <Form.Item
                    name="customizeGender"
                    label="Customize Gender"
                    rules={[{ required: true }]}
                  >
                    <Input/>
                  </Form.Item>
                )
                : null
            }
          </Form.Item>
          <Form.Item  wrapperCol={{ offset: 8, span: 16 }}>
            <Button htmlType="button" onClick={onReset}>
              Wyczyść
            </Button>
            <Button type="primary" htmlType="submit">
              Wyślij
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};