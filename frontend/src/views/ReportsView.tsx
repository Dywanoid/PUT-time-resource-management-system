import 'antd/dist/antd.css';
import '../css/ReportsView.css';
import locale from 'antd/es/date-picker/locale/pl_PL';
import moment, { Moment } from 'moment';

import { Button, Select, Typography, DatePicker, Space } from 'antd';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';

import { useState } from 'react';
const { Option } = Select;
const { Text } = Typography;

interface PickerOption {
  id: string;
  value: string;
}

interface PickerProps {
  defaultValue: PickerOption;
  label: string;
  onChange: (newValue: string) => void;
  options: PickerOption[];
}

const Picker = (props: PickerProps): JSX.Element => {
  const {
    defaultValue,
    label,
    onChange,
    options
  } = props;

  return (
    <>
      <Text
        className="pickerLabel"
      >
        {`${ label }:`}
      </Text>

      <Select
        defaultValue={defaultValue.id}
        onChange={onChange}
      >
        {
          options.map((option) => (
            <Option
              key={option.id}
              value={option.id}
            >
              {option.value}
            </Option>
          ))
        }
      </Select>
    </>
  );
};

const getHandlerForCollection = (
  collection: PickerOption[],
  setter: React.Dispatch<React.SetStateAction<PickerOption>>
) => (newSelectedValue: string): void =>
  setter(collection.find((option) => option.id === newSelectedValue) as PickerOption);

const clientOptions: PickerOption[] = [
  { id: 'vw', value: 'Volkswagen' },
  { id: 'biedra', value: 'Biedronka' }
];

const projectOptions: PickerOption[] = [
  { id: 'proj1', value: 'Projekt 1' },
  { id: 'proj2', value: 'Projekt 2' }
];

const teamOptions: PickerOption[] = [
  { id: 'team1', value: 'Zespół A' },
  { id: 'team2', value: 'Zespół B' }
];

const currentMomentGetter = () => moment();

// const getMonthEnds = (month: Moment) => {
//   return {
//     end: month.clone().endOf('month'),
//     start: month.clone().startOf('month')
//   };
// };

const customDateFormat = (value) => value.format('MMMM YYYY');

export const ReportsView = () : JSX.Element => {
  const [selectedClient, setSelectedClient] = useState(clientOptions[0]);
  const [selectedProject, setSelectedProject] = useState(projectOptions[0]);
  const [selectedTeam, setSelectedTeam] = useState(teamOptions[0]);
  const [date, setDate] = useState<Moment>(currentMomentGetter);

  const handleClientChange = getHandlerForCollection(clientOptions, setSelectedClient);
  const handleProjectChange = getHandlerForCollection(projectOptions, setSelectedProject);
  const handleTeamChange = getHandlerForCollection(teamOptions, setSelectedTeam);

  console.log(selectedClient, selectedProject, selectedTeam);

  const changeMonth = (forwardDirection: boolean): void => {
    const months = forwardDirection ? 1 : -1;

    const newDate = date.clone().add(months, 'month');

    onChangeForDataPicker(newDate);
  };

  const onChangeForDataPicker = (newDate): void => {
    if(newDate) {
      setDate(newDate);
    }
  };

  return (
    <>
      <Space
        direction="horizontal"
        size="large"
      >
        <Picker
          defaultValue={selectedClient}
          label="Klient"
          onChange={handleClientChange}
          options={clientOptions}
        />

        <Picker
          defaultValue={selectedProject}
          label="Projekt"
          onChange={handleProjectChange}
          options={projectOptions}
        />

        <Picker
          defaultValue={selectedTeam}
          label="Zespół"
          onChange={handleTeamChange}
          options={teamOptions}
        />
      </Space>
      <div className="datePicker">
        <Button
          type="ghost"
          shape="round"
          icon={<CaretLeftOutlined/>}
          size='small'
          onClick={() => changeMonth(false)}
        />
        <DatePicker
          className="reports-date-picker"
          locale={locale}
          onChange={onChangeForDataPicker}
          picker="month"
          format={customDateFormat}
          value={date}
        />
        <Button
          type="ghost"
          shape="round"
          icon={<CaretRightOutlined/>}
          size='small'
          onClick={() => changeMonth(true)}
        />
      </div>
    </>
  );
};