import 'antd/dist/antd.css';
import '../css/ReportsView.css';
import locale from 'antd/es/date-picker/locale/pl_PL';
import moment, { Moment } from 'moment';

import { Button, Select, Typography, DatePicker, Space } from 'antd';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';

import { useEffect, useState } from 'react';
import { useGetAllClientsAndProjectsQuery, useGetAllTeamsQuery } from '../generated/graphql';
import { Loader } from '../components';
const { Text } = Typography;

interface PickerOption {
  label: string;
  value: string;
}

interface PickerProps {
  defaultValue: PickerOption[];
  label: string;
  selected: PickerOption[];
  onChange: (newValue: string[]) => void;
  options: PickerOption[];
}

const Picker = (props: PickerProps): JSX.Element => {
  const {
    defaultValue,
    label,
    selected,
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
        mode='multiple'
        style= {{ width: '300px' }}
        maxTagCount='responsive'
        value={selected.map((value) => value.value)}
        defaultValue={defaultValue.map((value) => value.value)}
        onChange={onChange}
        options={options}
      />
    </>
  );
};

const getHandlerForCollection = (
  collection: PickerOption[],
  setter: React.Dispatch<React.SetStateAction<PickerOption[]>>
) => (newSelectedValues: string[]): void => {
  if(newSelectedValues.length) {
    setter(newSelectedValues.map((value) => collection.find((option) => option.value === value)) as PickerOption[]);
  }
};

const currentMomentGetter = () => moment();

const customDateFormat = (value) => value.format('MMMM YYYY');

export const ReportsView = () : JSX.Element => {
  const [clientOptions, setClientOptions] = useState<PickerOption[]>([]);
  const [projectOptions, setProjectOptions] = useState<PickerOption[]>([]);
  const [teamOptions, setTeamOptions] = useState<PickerOption[]>([]);

  const [selectedClients, setSelectedClients] = useState<PickerOption[]>([]);
  const [selectedProjects, setSelectedProjects] = useState<PickerOption[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<PickerOption[]>([]);

  const [date, setDate] = useState<Moment>(currentMomentGetter);

  const teamsQuery = useGetAllTeamsQuery();
  const clientsProjectsQuery = useGetAllClientsAndProjectsQuery();

  useEffect(
    () => {
      if(teamsQuery.error || clientsProjectsQuery.error || teamsQuery.loading || clientsProjectsQuery.loading) {
        return;
      }
      const newClients = clientsProjectsQuery?.data?.clients || [];
      const newClientOptions = newClients.map(
        (client) => {
          return { label: client.name, value: client.id };
        }
      ) || [];

      setClientOptions(newClientOptions);
      setSelectedClients(newClientOptions);
      handleProjects(newClients, newClientOptions);

      const newTeams = teamsQuery.data?.teams || [];
      const newTeamOptions = newTeams.map(
        (team) => {
          return { label: team.name, value: team.id };
        }
      );

      setTeamOptions(newTeamOptions);
      setSelectedTeams(newTeamOptions);
    },
    [
      teamsQuery,
      clientsProjectsQuery
    ]
  );

  const handleProjects = (clients, selected) => {
    const selectedClientsMap: {[id: string]: boolean} = selected.reduce((acc, client) => {
      acc[client.value] = true;

      return acc;
    }, {});

    const newProjectOptions = clients.reduce((acc: PickerOption[], client) => {
      if(selectedClientsMap[client.id]) {
        acc.push(
          ...(client.projects?.map((project) => {return { label: project.name, value: project.id };}) || [])
        );
      }

      return acc;
    }, []) || [];

    setProjectOptions(newProjectOptions);
    setSelectedProjects(newProjectOptions);
  };

  useEffect(
    () => {
      if(!teamsQuery.loading && !clientsProjectsQuery.loading) {
        handleProjects(clientsProjectsQuery?.data?.clients, selectedClients);
      }
    },
    [
      selectedClients
    ]
  );

  const handleClientChange = getHandlerForCollection(clientOptions, setSelectedClients);
  const handleProjectChange = getHandlerForCollection(projectOptions, setSelectedProjects);
  const handleTeamChange = getHandlerForCollection(teamOptions, setSelectedTeams);

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

  if(teamsQuery.error || clientsProjectsQuery.error) {return (<p>Error!</p>);}
  if(teamsQuery.loading || clientsProjectsQuery.loading) {return (<Loader/>);}
  if(!selectedClients.length
    || !selectedProjects.length
    || !selectedTeams.length) {
    return (<p>Selektory sie zepsuly</p>);
  }

  return (
    <>
      <Space
        direction="horizontal"
        size="large"
      >
        <Picker
          defaultValue={selectedClients}
          selected={selectedClients}
          label="Klient"
          onChange={handleClientChange}
          options={clientOptions}
        />

        <Picker
          defaultValue={selectedProjects}
          selected={selectedProjects}
          label="Projekt"
          onChange={handleProjectChange}
          options={projectOptions}
        />

        <Picker
          defaultValue={selectedTeams}
          selected={selectedTeams}
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